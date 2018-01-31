import { KeyCodes } from './KeyCodes';

export interface IKeySequence {
  keyCodes: KeyCodes[];
}

export function convertSequencesToString(keySequences: IKeySequence[]): string {
  let conversion = '';
  for (let keySequence of keySequences) {
    conversion+= keySequence.keyCodes.join('-');
  }
  return conversion;
}