import { ktpPrefix, ktpSeparator } from '../keytip/KeytipUtils';

export interface IKeySequence {
  keys: string[];
}

/**
 * Tests for equality between two IKeySequences
 * @param seq1 - First IKeySequence
 * @param seq2 - Second IKeySequence
 */
export function keySequencesAreEqual(seq1: IKeySequence, seq2: IKeySequence): boolean {
  let keyCodes1 = seq1.keys.join();
  let keyCodes2 = seq2.keys.join();
  return keyCodes1 === keyCodes2;
}

/**
 * Tests for equality between two arrays of IKeySequence
 * @param seq1 - First IKeySequence[]
 * @param seq2 - Second IKeySequence[]
 */
export function fullKeySequencesAreEqual(seq1: IKeySequence[], seq2: IKeySequence[]): boolean {
  if (seq1.length !== seq2.length) {
    return false;
  }

  for (let i = 0; i < seq1.length; i++) {
    if (!keySequencesAreEqual(seq1[i], seq2[i])) {
      return false;
    }
  }

  return true;
}

/**
 *
 * @param sequences
 * @param seq
 */
export function keySequencesContain(sequences: IKeySequence[], seq: IKeySequence): boolean {
  for (let i = 0; i < sequences.length; i++) {
    if (keySequencesAreEqual(sequences[i], seq)) {
      return true;
    }
  }
  return false;
}

/**
 * Method returns true if the key squence of the object with minimum length is in the other key sequence.
 * If the minium length is zero, then it will default to false.
 * @param seq1
 * @param seq2
 */
export function keySequenceStartsWith(seq1: IKeySequence, seq2: IKeySequence): boolean {
  let keyCodes1 = seq1.keys.join();
  let keyCodes2 = seq2.keys.join();
  if (keyCodes1.length === 0 || keyCodes2.length === 0) {
    return false;
  }
  return keyCodes1.indexOf(keyCodes2) === 0 || keyCodes2.indexOf(keyCodes1) === 0;
}

/**
 * Converts a whole set of KeySequences into one keytip ID, which will be the ID for the last keytip sequence specified
 * keySequences should not include the initial keytip 'start' sequence
 * @param keySequences - Full path of IKeySequences for one keytip
 */
export function convertSequencesToKeytipID(keySequences: IKeySequence[]): string {
  let conversion = ktpPrefix;
  for (let keySequence of keySequences) {
    conversion += ktpSeparator + keySequence.keys.join(ktpSeparator);
  }
  return conversion;
}