import { IKeySequence } from '../keysequence/IKeySequence';
import { addKeytipSequence } from '../keytip/KeytipUtils';
import { IKeytipProps } from '../../Keytip';

export interface IKeytipConfig {
  keytips: IKeytipConfigItem[];
}

export interface IKeytipConfigItem {
  /**
   * Key Sequence for this keytip only
   */
  sequence: IKeySequence;

  /**
   * Content for the keytip
   */
  content: string;

  /**
   * Identifier for the keytip, to be used to access in the configMap
   */
  id: string;

  /**
   * Optional props in IKeytipProps
   */
  optionalProps?: Partial<IKeytipProps>;

  /**
   * Children keytips of this keytip
   */
  children?: IKeytipConfigItem[];
}

export interface IKeytipConfigMap {
  [id: string]: IKeytipProps;
}

/**
 * Builds a map of ID -> IKeytipProps
 *
 * @param config - IKeytipConfig object
 * @returns {IKeytipConfigMap} - Config map
 */
export function buildKeytipConfigMap(config: IKeytipConfig): IKeytipConfigMap {
  let configMap: IKeytipConfigMap = {};

  for (let keytip of config.keytips) {
    constructKeytip(configMap, [], keytip);
  }

  return configMap;
}

export function constructKeytip(configMap: IKeytipConfigMap, parentSequence: IKeySequence[], keytip: IKeytipConfigItem): void {
  // Compute full key sequence
  let keytipSequence = addKeytipSequence(parentSequence, keytip.sequence);

  // Save props in configMap
  let keytipProps: IKeytipProps = { ...keytip.optionalProps, keySequences: keytipSequence, content: keytip.content };
  configMap[keytip.id] = keytipProps;

  if (keytip.children) {
    for (let child of keytip.children) {
      // Create keytips for all children
      constructKeytip(configMap, keytipSequence, child);
    }
  }
}