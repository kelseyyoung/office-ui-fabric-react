import * as React from 'react';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { Keytip, IKeytipProps } from '../Keytip';
import {
  autobind,
  BaseComponent
} from '../../Utilities';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { KeyCodes } from '../../Utilities';
import { convertSequencesToKeytipID, fullKeySequencesAreEqual } from '../../utilities/keysequence/IKeySequence';
import { IKeytipTransitionKey } from '../../utilities/keysequence/IKeytipTransitionKey';
import { KeytipManager } from '../../utilities/keytip/KeytipManager';
import { ktpFullPrefix, ktpSeparator } from '../../utilities/keytip/KeytipUtils';
import { ModifierKeyCodes } from '../../utilities/keytip/ModifierKeyCodes';

export interface IKeytipLayerState {
  inKeytipMode: boolean;
  keytips: IKeytipProps[];
}

const defaultStartSequence: IKeytipTransitionKey = {
  key: 'Meta', modifierKeys: [ModifierKeyCodes.alt]
};

const defaultExitSequence: IKeytipTransitionKey = {
  key: 'Meta', modifierKeys: [ModifierKeyCodes.alt]
};

const defaultReturnSequence: IKeytipTransitionKey = {
  key: 'Escape'
};

/**
 * A layer that holds all keytip items
 *
 * @export
 * @class KeytipLayer
 * @extends {BaseComponent<IKeytipLayerProps>}
 */
export class KeytipLayer extends BaseComponent<IKeytipLayerProps, IKeytipLayerState> {
  public static defaultProps: IKeytipLayerProps = {
    keytipStartSequences: [defaultStartSequence],
    keytipExitSequences: [defaultExitSequence],
    keytipReturnSequences: [defaultReturnSequence],
    id: ktpFullPrefix + 'Alt' + ktpSeparator + 'Meta'
  };

  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipLayerProps, context: any) {
    super(props, context);

    this.state = {
      inKeytipMode: false,
      keytips: []
    };

    this._keytipManager.init(this);
  }

  /**
   *
   * @param keytipProps
   */
  public registerKeytip(keytipProps: IKeytipProps): void {
    this.setState(this.addKeytip(keytipProps));
  }

  /**
   *
   * @param keytipProps
   */
  public unregisterKeytip(keytipProps: IKeytipProps): void {
    this.setState(this.removeKeytip(keytipProps));
  }

  /**
   *
   */
  public addKeytip(keytipProps: IKeytipProps): {} {
    return (previousState: IKeytipLayerState) => {
      let previousKeytips: IKeytipProps[] = previousState.keytips;
      // Try to find keytipProps in previousKeytips to update
      let keytipToUpdateIndex = -1;
      for (let i = 0; i < previousKeytips.length; i++) {
        if (fullKeySequencesAreEqual(keytipProps.keySequences, previousKeytips[i].keySequences)) {
          keytipToUpdateIndex = i;
          break;
        }
      }
      let currentKeytips = [...previousState.keytips];
      if (keytipToUpdateIndex >= 0) {
        // Replace the keytip props
        currentKeytips.splice(keytipToUpdateIndex, 1, keytipProps);
      } else {
        // Add the new keytip props
        currentKeytips.push(keytipProps);
      }
      return { ...previousState, keytips: currentKeytips };
    };
  }

  /**
   * Removes a keytip from the layer's state
   * TODO: do we just need to pass in the keytip sequence?
   * @param keytipToRemove - IKeytipProps of the keytip to remove
   */
  public removeKeytip(keytipToRemove: IKeytipProps): {} {
    return (previousState: IKeytipLayerState) => {
      let currentKeytips = previousState.keytips;
      // Filter out keytips that don't equal the one to remove
      let filteredKeytips: IKeytipProps[] = currentKeytips.filter((currentKeytip: IKeytipProps) => {
        return !fullKeySequencesAreEqual(currentKeytip.keySequences, keytipToRemove.keySequences);
      });
      return { ...previousState, keytips: filteredKeytips };
    };
  }

  public setKeytipVisibility(ids: string[], visible: boolean): void {
    this.setState((previousState: IKeytipLayerState, currentProps: IKeytipLayerState) => {
      let currentKeytips: IKeytipProps[] = [...previousState.keytips];
      for (let keytip of currentKeytips) {
        let keytipId = convertSequencesToKeytipID(keytip.keySequences);
        if (ids.indexOf(keytipId) >= 0) {
          keytip.visible = visible;
        }
      }
      return { ...previousState, keytips: currentKeytips };
    });
  }

  public render(): JSX.Element {
    const {
      id
    } = this.props;

    const {
      keytips
    } = this.state;

    return (
      <Layer id={ id }>
        { keytips && keytips.map((keytipProps: IKeytipProps, index: number) => {
          return <Keytip key={ index } { ...keytipProps } />;
        }) }
      </Layer>
    );
  }

  public componentDidMount(): void {
    this._events.on(window, 'mousedown', this._onDismiss);
    this._events.on(window, 'resize', this._onDismiss);
    this._events.on(window, 'keydown', this._onKeyDown, true /* useCapture */);
    this._events.on(window, 'keypress', this._onKeyPress, true /* useCapture */);
    // TODO: SHOULD WE DO THIS ??: -> To remove callout when scrolled
    window.addEventListener('scroll', (): void => {
      if (this.state.inKeytipMode) {
        this._keytipManager.exitKeytipMode();
      }
    }, { capture: true });
  }

  public exitKeytipMode(): void {
    if (this.props.onExitKeytipMode) {
      this.props.onExitKeytipMode();
    }
    this.setState({ inKeytipMode: false });
  }

  public enterKeytipMode(): void {
    if (this.props.onEnterKeytipMode) {
      this.props.onEnterKeytipMode();
    }
    this.setState({ inKeytipMode: true });
  }

  @autobind
  private _onDismiss(ev?: React.MouseEvent<HTMLElement>): void {
    // if we are in keytip mode.. then exit keytip mode
    if (this.state.inKeytipMode) {
      this._keytipManager.exitKeytipMode();
    }
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    switch (ev.which) {
      case KeyCodes.alt:
        // ALT puts focus in the browser bar, so it should not be used as a key for keytips.
        // It can be used as a modifier
        break;
      case KeyCodes.tab:
      case KeyCodes.enter:
      case KeyCodes.space:
        this._keytipManager.exitKeytipMode();
        break;
      default:
        let transitionKey: IKeytipTransitionKey = { key: ev.key };
        transitionKey.modifierKeys = this._getModifierKey(ev);
        this._keytipManager.processTransitionInput(transitionKey);
        break;
    }
  }

  private _getModifierKey(ev: React.KeyboardEvent<HTMLElement>): ModifierKeyCodes[] | undefined {
    let modifierKeys = [];
    if (ev.altKey) {
      modifierKeys.push(ModifierKeyCodes.alt);
    }
    if (ev.ctrlKey) {
      modifierKeys.push(ModifierKeyCodes.ctrl);
    }
    if (ev.shiftKey) {
      modifierKeys.push(ModifierKeyCodes.shift);
    }
    // TODO include windows key or option for MAC
    return modifierKeys.length ? modifierKeys : undefined;
  }

  @autobind
  private _onKeyPress(ev: React.KeyboardEvent<HTMLElement>): void {
    // call processInput
    this._keytipManager.processInput(ev.key);
  }
}