import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';

export interface IKeytipProps extends IBaseProps, React.AllHTMLAttributes<HTMLSpanElement | HTMLAnchorElement> {
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
   * DOM ID of the parent layer that will hold this keytip
   *
   * @type {string}
   * @memberof IKeytipProps
   */
  hostId?: string;

  /**
   * ICalloutProps to pass to the callout element
   *
   * @type {string}
   * @memberof IKeytipProps
   */
  calloutProps?: ICalloutProps;
}