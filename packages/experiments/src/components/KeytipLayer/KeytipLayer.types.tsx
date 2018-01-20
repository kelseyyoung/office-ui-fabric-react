import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IKeytipProps } from '../Keytip/Keytip.types';

export interface IKeytipLayerProps extends IBaseProps, React.AllHTMLAttributes<HTMLSpanElement | HTMLAnchorElement> {
  /**
   * The DOM ID to use as the hostId for the child keytips
   *
   * @type {string}
   * @memberof IKeytipLayerProps
   */
  id: string;

  /**
  * List of key sequences that will start keytips mode
  *
  * @type {string[]}
  * @memberof IKeytipLayerProps
  */
  keytipStartSequences?: string[];

  /**
   * List of key sequences that execute the 'go back' functionality in keytips (going back to the previous level of keytips)
   *
   * @type {string[]}
   * @memberof IKeytipLayerProps
   */
  keytipGoBackSequences?: string[];

  /**
   * List of key sequences that will exit keytips mode
   *
   * @type {string[]}
   * @memberof IKeytipLayerProps
   */
  keytipExitSequences?: string[];

  /**
   * List of keytips to add to this layer
   *
   * @type {string[]}
   * @memberof IKeytipLayerProps
   */
  keytips?: IKeytipProps[];
}