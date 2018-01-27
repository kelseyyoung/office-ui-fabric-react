import * as React from 'react';
import { Keytip } from '../../Keytip';
import { ICalloutProps } from '../../Callout';
import { IPoint, IKeySequence } from '../../Utilities';

export interface IKeytipProps extends React.Props<Keytip> {
  /**
   * Optional callback to access the Keytip component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: Keytip) => void;

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
   * The target that the Keytip should try to position itself based on.
   * It can be either an HTMLElement a querySelector string of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  keytipTarget?: HTMLElement | string | MouseEvent | IPoint | null;
}