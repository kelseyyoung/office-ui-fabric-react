import { IKeySequence, keySequencesAreEqual, keySequencesContain, convertSequencesToKeytipID } from './IKeySequence';
import { KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
import { ktpFullPrefix, ktpSeparator } from '../keytip/KeytipUtils';

describe('IKeySequence', () => {

  describe('keySequencesAreEqual', () => {
    it('single KeyCode', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq3: IKeySequence = { keyCodes: [KeyCodes.b] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
      expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
    });

    it('multiple KeyCodes', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      let seq3: IKeySequence = { keyCodes: [KeyCodes.b, KeyCodes.a] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
      expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
    });

    it('should be false when sequences are different length', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(false);
    });
  });

  describe('keySequencesContain', () => {
    it('single KeyCode', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let sequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.b] }];
      let sequences2: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.b] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(true);
      expect(keySequencesContain(sequences2, seq1)).toEqual(false);
    });

    it('multiple KeyCodes', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      let sequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.b] }];
      let sequences2: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.b] }, { keyCodes: [KeyCodes.c, KeyCodes.d] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
      expect(keySequencesContain(sequences2, seq1)).toEqual(true);
    });
  });

  describe('convertSequencesToKeytipID', () => {
    it('for one singular key sequence', () => {
      let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }];
      let keytipID = convertSequencesToKeytipID(keySequence);
      expect(keytipID).toEqual(ktpFullPrefix + KeyCodes.a);
    });

    it('for one complex key sequence', () => {
      let complexKeySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.d] }];
      let keytipID = convertSequencesToKeytipID(complexKeySequence);
      expect(keytipID).toEqual(ktpFullPrefix + KeyCodes.a + ktpSeparator + KeyCodes.d);
    });

    it('for multiple singular key sequences', () => {
      let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.c] }];
      let keytipID = convertSequencesToKeytipID(keySequences);
      expect(keytipID).toEqual(ktpFullPrefix + KeyCodes.a + ktpSeparator + KeyCodes.c);
    });

    it('for multiple complex key sequences', () => {
      let complexKeySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.n] }, { keyCodes: [KeyCodes.c, KeyCodes.b] }];
      let keytipID = convertSequencesToKeytipID(complexKeySequences);
      expect(keytipID).toEqual(ktpFullPrefix + KeyCodes.a +
        ktpSeparator + KeyCodes.n + ktpSeparator +
        KeyCodes.c + ktpSeparator + KeyCodes.b);
    });
  });
});