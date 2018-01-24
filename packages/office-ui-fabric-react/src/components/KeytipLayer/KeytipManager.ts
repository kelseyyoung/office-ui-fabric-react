import { KeytipLayer } from './KeytipLayer';
import { IKeytipProps } from '../../Keytip';

class KeytipManager {

  private static _instance = new KeytipManager();
  private _layer: KeytipLayer;

  public static getInstance() {
    return this._instance;
  }

  public registerKeytip(keytipProps: IKeytipProps) {
    // Set the 'keytips' property in _layer
    this._layer && this._layer.registerKeytip(keytipProps);
  }

  public setLayer(layer: KeytipLayer) {
    this._layer = layer;
  }

}

export { KeytipManager };