import * as React from 'react';
import { hasSubmenu, getIsChecked } from '../../utilities/contextualMenu/index';
import { BaseComponent, getRTL, createRef } from '../../Utilities';
import { Icon } from '../../Icon';
import { IContextualMenuItemProps } from './ContextualMenuItem.types';

export class ContextualMenuItem extends BaseComponent<IContextualMenuItemProps, {}> {
  private _itemRef = createRef<HTMLElement>();

  public render() {
    const { item, classNames } = this.props;

    return (
      <div
        ref={ this._itemRef }
        className={
          item.split ? classNames.linkContentMenu : classNames.linkContent
        }
      >
        { this.renderCheckMarkIcon(this.props) }
        { this.renderItemIcon(this.props) }
        { this.renderItemName(this.props) }
        { this.renderSubMenuIcon(this.props) }
      </div>
    );
  }

  public openSubMenu = (): void => {
    if (hasSubmenu(this.props.item) && this.props.openSubMenu && this._itemRef && this._itemRef.current) {
      this.props.openSubMenu(this.props.item, this._itemRef.current);
    }
  }

  public dismissSubMenu = (): void => {
    if (hasSubmenu(this.props.item) && this.props.dismissSubMenu) {
      this.props.dismissSubMenu();
    }
  }

  public dismissMenu = (dismissAll?: boolean): void => {
    if (this.props.dismissMenu) {
      this.props.dismissMenu(dismissAll);
    }
  }

  private renderItemIcon = (props: IContextualMenuItemProps) => {
    const {
      item,
      hasIcons,
      classNames
    } = props;

    // Only present to allow continued use of item.icon which is deprecated.
    const { iconProps, icon } = item;

    if (!hasIcons) {
      return null;
    }

    if (item.onRenderIcon) {
      return (
        item.onRenderIcon(props)
      );
    }

    if (iconProps) {
      return <Icon { ...iconProps } className={ classNames.icon } />;
    }

    return <Icon iconName={ icon } className={ classNames.icon } />;
  }

  private renderCheckMarkIcon = ({ onCheckmarkClick, item, classNames }: IContextualMenuItemProps) => {
    const isItemChecked = getIsChecked(item);
    if (onCheckmarkClick) {
      const onClick = (e: React.MouseEvent<HTMLElement>) => onCheckmarkClick(item, e);

      return (
        <Icon
          iconName={ isItemChecked ? 'CheckMark' : '' }
          className={ classNames.checkmarkIcon }
          onClick={ onClick }
        />
      );
    }
    return null;
  }

  private renderItemName = ({ item, classNames }: IContextualMenuItemProps) => {
    if (item.name) {
      return <span className={ classNames.label }>{ item.name }</span>;
    }
    return null;
  }

  private renderSubMenuIcon = ({ item, classNames }: IContextualMenuItemProps) => {
    if (hasSubmenu(item)) {
      return (
        <Icon
          iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
          { ...item.submenuIconProps }
          className={ classNames.subMenuIcon }
        />
      );
    }
    return null;
  }
}
