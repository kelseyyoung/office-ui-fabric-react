import { IKeySequence } from '../keysequence/IKeySequence';
import { addKeytipSequence } from '../keytip/KeytipUtils';

export interface IKeytipConfig {
  keytips: IKeytipConfigItem[];
}

export interface IKeytipConfigItem {
  sequence: IKeySequence;
  id: string;
  children?: IKeytipConfigItem[];
}

export interface IKeytipConfigMap {
  // TODO: should this point to an entire IKeytipProps?
  [id: string]: IKeySequence[];
}

export function buildKeytipConfigMap(config: IKeytipConfig): IKeytipConfigMap {
  let configMap: IKeytipConfigMap = {};

  for (let keytip of config.keytips) {
    constructKeytipSequence(configMap, [], keytip);
  }

  return configMap;
}

export function constructKeytipSequence(configMap: IKeytipConfigMap, parentSequence: IKeySequence[], keytip: IKeytipConfigItem): void {
  let keytipSequence = addKeytipSequence(parentSequence, keytip.sequence);
  configMap[keytip.id] = keytipSequence;
  if (keytip.children) {
    for (let child of keytip.children) {
      constructKeytipSequence(configMap, keytipSequence, child);
    }
  }
}