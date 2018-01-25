import { KeytipLayer } from './KeytipLayer';
import { IKeytipProps } from '../../Keytip';
import { KeySequence, KeyCodes } from '../../Utilities';

const ktpId = 'ktp';

class KeytipManager {

  private static _instance = new KeytipManager();
  private _layer: KeytipLayer;

  public static getInstance() {
    return this._instance;
  }

  // Converts a whole set of KeySequences into one ID, which will be the ID for the last keytip sequence specified
  // keySequences should not include the initial keytip 'start' sequence
  public convertSequencesToID(keySequences: KeySequence[]): string {
    let id = ktpId;
    for (let keySequence of keySequences) {
      id += '-' + keySequence.keyCodes.join('-');
    }
    return id;
  }

  // Gets the aria-describedby property for a set of keySequences
  // keySequences should not include the initial keytip 'start' sequence
  public getAriaDescribedBy(keySequences: KeySequence[]): string {
    let describedby = this._layer.props.id;
    if (!!keySequences.length) {
      // Return just the layer ID
      return describedby;
    }

    for (let i = 0; i < keySequences.length; i++) {
      describedby += ' ' + this.convertSequencesToID(keySequences.slice(0, i + 1));
    }

    return describedby;
  }

  public registerKeytip(keytipProps: IKeytipProps) {
    // Set the 'keytips' property in _layer
    this._layer && this._layer.registerKeytip(keytipProps);
  }

  public getLayer() {
    return this._layer;
  }

  public setLayer(layer: KeytipLayer) {
    this._layer = layer;
  }

}

export { KeytipManager };