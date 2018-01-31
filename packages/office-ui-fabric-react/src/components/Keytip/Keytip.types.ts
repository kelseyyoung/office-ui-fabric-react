import * as React from 'react';
import { Keytip } from '../../Keytip';
import { ICalloutProps } from '../../Callout';
import { IStyle, ITheme } from '../../Styling';
import { IPoint, IKeySequence, IStyleFunction } from '../../Utilities';

export interface IKeytip {

}

export interface IKeytipProps {
  /**
   * Optional callback to access the Keytip component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IKeytip) => void;

  /**
   * The DOM ID to use for the keytip HTML element
   *
   * @type {string}
   * @memberof IKeytipProps
   */
  id?: string;

  /**
   * Content to put inside the keytip
   *
   * @type {string}
   * @memberof IKeytipProps
   */
  content?: string;

  /**
  * Optional theme for component
  */
  theme?: ITheme;

  /**
   * T/F if the corresponding control is disabled
   *
   * @type {boolean}
   * @memberof IKeytipProps
   */
  disabled?: boolean;

  /**
   * T/F if the keytip is visible
   *
   * @type {boolean}
   * @memberof IKeytipProps
   */
  visible?: boolean;

  /**
   * Array of KeySequences which is the full key sequence to trigger this keytip
   * Should not include initial 'start' key sequence
   */
  keySequences?: IKeySequence[];

  /**
   * ICalloutProps to pass to the callout element
   *
   * @type {string}
   * @memberof IKeytipProps
   */
  calloutProps?: ICalloutProps;

  /**
  * Optional styles for the component.
  */
  getStyles?: IStyleFunction<IKeytipStyleProps, IKeytipStyles>;

  /**
   * The target that the Keytip should try to position itself based on.
   * It can be either an HTMLElement a querySelector string of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  keytipTarget?: HTMLElement | string | MouseEvent | IPoint | null;
}

export interface IKeytipStyleProps {
  theme: ITheme;
  disabled?: boolean;
}

export interface IKeytipStyles {
  container: IStyle;
  root: IStyle;
}