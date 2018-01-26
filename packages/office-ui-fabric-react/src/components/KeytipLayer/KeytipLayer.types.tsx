import * as React from 'react';
import { IKeytipProps } from '../../Keytip';
import { KeytipLayer } from '../../KeytipLayer';
import { KeySequence } from '../../Utilities';

export interface IKeytipLayerProps extends React.Props<KeytipLayer> {
  /**
   * Optional callback to access the KeytipLayer component. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: KeytipLayer) => void;

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
  keytipStartSequences: KeySequence[];

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