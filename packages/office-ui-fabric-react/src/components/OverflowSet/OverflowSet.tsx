import * as React from 'react';
import {
  css,
  BaseComponent,
  createRef,
  getNativeProps,
  divProperties,
  focusFirstChild,
  elementContains
} from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { IOverflowSet, IOverflowSetProps, IOverflowSetItemProps } from './OverflowSet.types';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { IKeytipProps } from '../../Keytip';
import * as stylesImport from './OverflowSet.scss';

const styles: any = stylesImport;

export class OverflowSet extends BaseComponent<IOverflowSetProps, {}> implements IOverflowSet {

  private _focusZone = createRef<IFocusZone>();
  private _persistedKeytips: { [uniqueID: string]: IKeytipProps } = {};
  private _keytipManager: KeytipManager = KeytipManager.getInstance();
  private _divContainer = createRef<HTMLDivElement>();

  constructor(props: IOverflowSetProps) {
    super(props);

    if (props.doNotContainWithinFocusZone) {
      this._warnMutuallyExclusive({
        'doNotContainWithinFocusZone': 'focusZoneProps'
      });
    }
  }

  public render(): JSX.Element {
    const {
      items,
      overflowItems,
      className,
      focusZoneProps,
      vertical = false,
      role = 'menubar',
      doNotContainWithinFocusZone
    } = this.props;

    let Tag;
    let uniqueComponentProps;

    if (doNotContainWithinFocusZone) {
      Tag = 'div';
      uniqueComponentProps = {
        ...getNativeProps(this.props, divProperties),
        ref: this._divContainer
      };
    } else {
      Tag = FocusZone;
      uniqueComponentProps = {
        ...getNativeProps(this.props, divProperties),
        ...focusZoneProps,
        componentRef: this._focusZone,
        direction: vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal
      };
    }

    return (
      <Tag
        { ...uniqueComponentProps }
        className={ mergeStyles(
          'ms-OverflowSet',
          styles.root,
          vertical && styles.rootVertical,
          className
        ) }
        role={ role }
      >
        { items && this._onRenderItems(items) }
        { overflowItems && overflowItems.length > 0 && this._onRenderOverflowButtonWrapper(overflowItems) }
      </Tag>
    );
  }

  /**
   * Sets focus to the first tabbable item in the OverflowSet.
   * @param {boolean} forceIntoFirstElement If true, focus will be forced into the first element,
   * even if focus is already in theOverflowSet
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focus(forceIntoFirstElement?: boolean): boolean {
    let focusSucceeded = false;

    if (this.props.doNotContainWithinFocusZone) {
      if (this._divContainer.current) {
        focusSucceeded = focusFirstChild(this._divContainer.current);
      }
    } else if (this._focusZone.current) {
      focusSucceeded = this._focusZone.current.focus(forceIntoFirstElement);
    }

    return focusSucceeded;
  }

  /**
   * Sets focus to a specific child element within the OverflowSet.
   * @param {HTMLElement} childElement The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusElement(childElement?: HTMLElement): boolean {
    let focusSucceeded = false;

    if (!childElement) {
      return false;
    }

    if (this.props.doNotContainWithinFocusZone) {
      if (this._divContainer.current && elementContains(this._divContainer.current, childElement)) {
        childElement.focus();
        focusSucceeded = document.activeElement === childElement;
      }
    } else if (this._focusZone.current) {
      focusSucceeded = this._focusZone.current.focusElement(childElement);
    }

    return focusSucceeded;
  }

  // Add keytip register/unregister handlers to lifecycle functions to correctly manage persisted keytips
  public componentDidMount() {
    this._registerPersistedKeytips();
  }

  public componentWillUnmount() {
    this._unregisterPersistedKeytips();
  }

  public componentWillUpdate() {
    this._unregisterPersistedKeytips();
  }

  public componentDidUpdate() {
    this._registerPersistedKeytips();
  }

  private _registerPersistedKeytips() {
    Object.keys(this._persistedKeytips).forEach((key: string) => {
      const keytip = this._persistedKeytips[key];
      const uniqueID = this._keytipManager.registerPersistedKeytip(keytip);
      // Update map
      this._persistedKeytips[uniqueID] = keytip;
      delete this._persistedKeytips[key];
    });
  }

  private _unregisterPersistedKeytips() {
    // Delete all persisted keytips saved
    Object.keys(this._persistedKeytips).forEach((uniqueID: string) => {
      this._keytipManager.unregisterPersistedKeytip(this._persistedKeytips[uniqueID], uniqueID);
    });
    this._persistedKeytips = {};
  }

  private _onRenderItems = (items: IOverflowSetItemProps[]): JSX.Element[] => {
    return items.map((item, i) => {
      const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-item', styles.item) };
      return (
        <div key={ item.key } { ...wrapperDivProps }>
          { this.props.onRenderItem(item) }
        </div>
      );
    });
  }

  private _onRenderOverflowButtonWrapper = (items: any[]): JSX.Element => {
    const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-overflowButton', styles.item) };
    const overflowKeytipSequences = this.props.keytipSequences;
    let newOverflowItems: any[] = [];

    if (overflowKeytipSequences) {
      items.forEach((overflowItem) => {
        const keytip = (overflowItem as IOverflowSetItemProps).keytipProps;
        if (keytip) {
          // Create persisted keytip
          const persistedKeytip: IKeytipProps = {
            content: keytip.content,
            keySequences: keytip.keySequences,
            disabled: keytip.disabled || !!(overflowItem.disabled || overflowItem.isDisabled)
          };

          if (keytip.hasDynamicChildren || this._getSubMenuForItem(overflowItem)) {
            // If the keytip has a submenu or children nodes, change onExecute to persistedKeytipExecute
            persistedKeytip.onExecute = this._keytipManager.persistedKeytipExecute.bind(this._keytipManager, overflowKeytipSequences, overflowItem.keytipProps.keySequences);
          } else {
            // If the keytip doesn't have a submenu, just execute the original function
            persistedKeytip.onExecute = keytip.onExecute;
          }

          // Add this persisted keytip to our internal list, use a temporary uniqueID (its content)
          // uniqueID will get updated on register
          this._persistedKeytips[persistedKeytip.content] = persistedKeytip;

          // Add the overflow sequence to this item
          const newOverflowItem = {
            ...overflowItem,
            keytipProps: {
              ...keytip,
              overflowSetSequence: overflowKeytipSequences
            }
          };
          newOverflowItems.push(newOverflowItem);
        } else {
          // Nothing to change, add overflowItem to list
          newOverflowItems.push(overflowItem);
        }
      });
    } else {
      newOverflowItems = items;
    }
    return (
      <div { ...wrapperDivProps }>
        { this.props.onRenderOverflowButton(newOverflowItems) }
      </div>
    );
  }

  /**
   * Gets the subMenu for an overflow item
   * Checks if itemSubMenuProvider has been defined, if not defaults to subMenuProps
   */
  private _getSubMenuForItem(item: any): any[] | undefined {
    if (this.props.itemSubMenuProvider) {
      return this.props.itemSubMenuProvider(item);
    }
    if (item.subMenuProps) {
      return item.subMenuProps.items;
    }
    return undefined;
  }

}