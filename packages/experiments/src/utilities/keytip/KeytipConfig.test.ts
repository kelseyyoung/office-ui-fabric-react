import { buildKeytipConfigMap, IKeytipConfig } from './KeytipConfig';
import { fullKeySequencesAreEqual, IKeySequence } from '../keysequence/IKeySequence';

describe('KeytipConfig', () => {
  it('buildKeytipConfigMap test', () => {
    let keytipConfig: IKeytipConfig = {
      keytips: [
        {
          id: 'keytip1',
          sequence: { keys: ['a'] },
          content: 'A',
          optionalProps: {
            onExecute: jest.fn()
          },
          children: [
            {
              id: 'keytip2',
              sequence: { keys: ['b', '1'] },
              content: 'B1',
              optionalProps: {
                disabled: true
              },
              children: [
                {
                  id: 'keytip3',
                  content: 'C',
                  sequence: { keys: ['c'] }
                }
              ]
            },
            {
              id: 'keytip4',
              sequence: { keys: ['t', '2'] },
              content: 'T2'
            },
            {
              id: 'keytip5',
              sequence: { keys: ['f'] },
              content: 'F',
              children: [
                {
                  id: 'keytip6',
                  sequence: { keys: ['x', '0'] },
                  content: 'X0',
                  optionalProps: {
                    onReturn: jest.fn()
                  },
                },
                {
                  id: 'keytip7',
                  sequence: { keys: ['y', 'y'] },
                  content: 'YY',
                  children: [
                    {
                      id: 'keytip8',
                      content: 'R',
                      sequence: { keys: ['r'] }
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    let keytipConfigMap = buildKeytipConfigMap(keytipConfig);

    let keytip1Seq: IKeySequence[] = [{ keys: ['a'] }];
    let keytip2Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b', '1'] }];
    let keytip3Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b', '1'] }, { keys: ['c'] }];
    let keytip4Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['t', '2'] }];
    let keytip5Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['f'] }];
    let keytip6Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['f'] }, { keys: ['x', '0'] }];
    let keytip7Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['f'] }, { keys: ['y', 'y'] }];
    let keytip8Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['f'] }, { keys: ['y', 'y'] }, { keys: ['r'] }];

    // Keytip1
    let keytip1 = keytipConfigMap.keytip1;
    expect(fullKeySequencesAreEqual(keytip1.keySequences, keytip1Seq)).toEqual(true);
    expect(keytip1.content).toEqual('A');
    expect(keytip1.onExecute).toBeDefined();

    // Keytip2
    let keytip2 = keytipConfigMap.keytip2;
    expect(fullKeySequencesAreEqual(keytip2.keySequences, keytip2Seq)).toEqual(true);
    expect(keytip2.content).toEqual('B1');
    expect(keytip2.disabled).toEqual(true);

    // Keytip3
    let keytip3 = keytipConfigMap.keytip3;
    expect(fullKeySequencesAreEqual(keytip3.keySequences, keytip3Seq)).toEqual(true);
    expect(keytip3.content).toEqual('C');

    // Keytip4
    let keytip4 = keytipConfigMap.keytip4;
    expect(fullKeySequencesAreEqual(keytip4.keySequences, keytip4Seq)).toEqual(true);
    expect(keytip4.content).toEqual('T2');

    // Keytip5
    let keytip5 = keytipConfigMap.keytip5;
    expect(fullKeySequencesAreEqual(keytip5.keySequences, keytip5Seq)).toEqual(true);
    expect(keytip5.content).toEqual('F');

    // Keytip6
    let keytip6 = keytipConfigMap.keytip6;
    expect(fullKeySequencesAreEqual(keytip6.keySequences, keytip6Seq)).toEqual(true);
    expect(keytip6.content).toEqual('X0');
    expect(keytip6.onReturn).toBeDefined();

    // Keytip7
    let keytip7 = keytipConfigMap.keytip7;
    expect(fullKeySequencesAreEqual(keytip7.keySequences, keytip7Seq)).toEqual(true);
    expect(keytip7.content).toEqual('YY');

    // Keytip8
    let keytip8 = keytipConfigMap.keytip8;
    expect(fullKeySequencesAreEqual(keytip8.keySequences, keytip8Seq)).toEqual(true);
    expect(keytip8.content).toEqual('R');
  });
});