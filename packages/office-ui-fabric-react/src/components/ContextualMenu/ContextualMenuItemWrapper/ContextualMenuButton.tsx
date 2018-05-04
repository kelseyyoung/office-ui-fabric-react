import * as React from 'react';
import {
  BaseComponent,
  buttonProperties,
  getNativeProps,
  createRef
} from '../../../Utilities';
import { IContextualMenuButtonProps } from './ContextualMenuButton.types';
import { KeytipData } from '../../KeytipData';
import { getIsChecked, isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { IContextualMenuItem, ContextualMenuItem } from '../../ContextualMenu';

export class ContextualMenuButton extends BaseComponent<IContextualMenuButtonProps, {}> {
  private _btn = createRef<HTMLButtonElement>();

  public render() {
    const {
      item,
      classNames,
      index,
      focusableElementIndex,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
      contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem,
      expandedMenuItemKey,
      onItemMouseDown,
      onItemClick,
      openSubMenu,
      dismissSubMenu,
      dismissMenu
    } = this.props;

    const subMenuId = this._getSubMenuId(item);
    let ariaLabel = '';

    if (item.ariaLabel) {
      ariaLabel = item.ariaLabel;
    } else if (item.name) {
      ariaLabel = item.name;
    }

    const isChecked: boolean | null | undefined = getIsChecked(item);
    const canCheck: boolean = isChecked !== null;
    const defaultRole = canCheck ? 'menuitemcheckbox' : 'menuitem';
    const itemHasSubmenu = hasSubmenu(item);

    const buttonNativeProperties = getNativeProps(item, buttonProperties);
    // Do not add the disabled attribute to the button so that it is focusable
    delete (buttonNativeProperties as any).disabled;

    const itemButtonProperties = {
      className: classNames.root,
      onClick: this._onItemClick,
      onKeyDown: itemHasSubmenu ? this._onItemKeyDown : null,
      onMouseEnter: this._onItemMouseEnter,
      onMouseLeave: this._onItemMouseLeave,
      onMouseDown: (ev: any) => onItemMouseDown ? onItemMouseDown(item, ev) : undefined,
      onMouseMove: this._onItemMouseMove,
      href: item.href,
      title: item.title,
      'aria-label': ariaLabel,
      'aria-haspopup': itemHasSubmenu || undefined,
      'aria-owns': item.key === expandedMenuItemKey ? subMenuId : undefined,
      'aria-expanded': itemHasSubmenu ? item.key === expandedMenuItemKey : undefined,
      'aria-checked': !!isChecked,
      'aria-posinset': focusableElementIndex + 1,
      'aria-setsize': totalItemCount,
      'aria-disabled': isItemDisabled(item),
      role: item.role || defaultRole,
      style: item.style
    };

    let { keytipProps } = item;
    if (keytipProps && itemHasSubmenu) {
      keytipProps = {
        ...keytipProps,
        hasMenu: true
      };
    }

    return (
      <KeytipData
        keytipProps={ keytipProps }
        ariaDescribedBy={ (buttonNativeProperties as any)['aria-describedby'] }
        disabled={ isItemDisabled(item) }
      >
        { (keytipAttributes: any): JSX.Element => (
          <button
            ref={ this._btn }
            { ...buttonNativeProperties as React.ButtonHTMLAttributes<HTMLButtonElement> }
            { ...itemButtonProperties as React.ButtonHTMLAttributes<HTMLButtonElement> }
            { ...keytipAttributes }
          >
            <ChildrenRenderer
              componentRef={ item.componentRef }
              item={ item }
              classNames={ classNames }
              index={ index }
              onCheckmarkClick={ hasCheckmarks && onItemClick ? onItemClick.bind(this, item) : undefined }
              hasIcons={ hasIcons }
              openSubMenu={ openSubMenu }
              dismissSubMenu={ dismissSubMenu }
              dismissMenu={ dismissMenu }
              getContainerElement={ this._getContainerElement }
            />
          </button>
        ) }
      </KeytipData>
    );
  }

  private _onItemMouseEnter = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter(item, ev, ev.currentTarget as HTMLElement);
    }
  }

  private _onItemMouseMove = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseMove } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove(item, ev, ev.currentTarget as HTMLElement);
    }
  }

  private _onItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClickBase } = this.props;
    if (onItemClickBase) {
      onItemClickBase(item, ev, ev.currentTarget as HTMLElement);
    }
  }

  private _onItemMouseLeave = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseLeave } = this.props;
    if (onItemMouseLeave) {
      onItemMouseLeave(item, ev);
    }
  }

  private _onItemKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { item, onItemKeyDown } = this.props;
    if (onItemKeyDown) {
      onItemKeyDown(item, ev);
    }
  }

  private _getSubMenuId = (item: IContextualMenuItem): string | undefined => {
    const { getSubMenuId } = this.props;
    if (getSubMenuId) {
      return getSubMenuId(item);
    }
  }

  private _getContainerElement = (): HTMLElement | undefined => {
    return this._btn.current ? this._btn.current : undefined;
  }
}