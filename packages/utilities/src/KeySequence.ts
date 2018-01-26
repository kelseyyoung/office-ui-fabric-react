import { KeyCodes } from './KeyCodes';

export class KeySequence {
  public keyCodes: KeyCodes[];

  constructor(keyCodes: KeyCodes[]) {
    this.keyCodes = keyCodes;
  }
}