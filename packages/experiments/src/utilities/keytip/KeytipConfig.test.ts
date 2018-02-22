import { buildKeytipConfigMap, IKeytipConfig } from './KeytipConfig';
import { fullKeySequencesAreEqual, IKeySequence } from '../keysequence/IKeySequence';

describe('KeytipConfig', () => {
  it('buildKeytipConfigMap test', () => {
    let keytipConfig: IKeytipConfig = {
      keytips: [
        {
          id: 'keytip1',
          sequence: { keys: ['a'] },
          children: [
            {
              id: 'keytip2',
              sequence: { keys: ['b', '1'] },
              children: [
                {
                  id: 'keytip3',
                  sequence: { keys: ['c'] }
                }
              ]
            },
            {
              id: 'keytip4',
              sequence: { keys: ['t', '2'] }
            },
            {
              id: 'keytip5',
              sequence: { keys: ['f'] },
              children: [
                {
                  id: 'keytip6',
                  sequence: { keys: ['x', '0'] }
                },
                {
                  id: 'keytip7',
                  sequence: { keys: ['y', 'y'] },
                  children: [
                    {
                      id: 'keytip8',
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

    expect(fullKeySequencesAreEqual(keytipConfigMap.keytip1, keytip1Seq)).toEqual(true);
    expect(fullKeySequencesAreEqual(keytipConfigMap.keytip2, keytip2Seq)).toEqual(true);
    expect(fullKeySequencesAreEqual(keytipConfigMap.keytip3, keytip3Seq)).toEqual(true);
    expect(fullKeySequencesAreEqual(keytipConfigMap.keytip4, keytip4Seq)).toEqual(true);
    expect(fullKeySequencesAreEqual(keytipConfigMap.keytip5, keytip5Seq)).toEqual(true);
    expect(fullKeySequencesAreEqual(keytipConfigMap.keytip6, keytip6Seq)).toEqual(true);
    expect(fullKeySequencesAreEqual(keytipConfigMap.keytip7, keytip7Seq)).toEqual(true);
    expect(fullKeySequencesAreEqual(keytipConfigMap.keytip8, keytip8Seq)).toEqual(true);
  });
});