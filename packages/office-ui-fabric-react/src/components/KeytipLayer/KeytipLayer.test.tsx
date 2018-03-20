import * as React from 'react';
import { KeytipManager, KeytipTree } from '../../utilities/keytips';
import { mount } from 'enzyme';
import { KeytipLayer } from './KeytipLayer';
import { IKeytipProps } from '../../Keytip';
import {
  KeytipTransitionModifier,
  IKeytipTransitionKey
} from '../../Utilities';

describe('KeytipLayer', () => {
  const keytipManager = KeytipManager.getInstance();
  const keytipStartSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
  const keytipExitSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
  const keytipReturnSequences: IKeytipTransitionKey[] = [{ key: 'Escape' }];

  afterEach(() => {
    // Cleanup KeytipManager
    keytipManager.keytips = [];
    keytipManager.keytipTree = new KeytipTree();
  });

  it('constructor initializes the keytips state from KeytipManager.keytips', () => {
    // Add some keytips to the Manager
    const keytipB: IKeytipProps = {
      content: 'B',
      keySequences: [{ keys: ['b'] }]
    };
    const keytipG: IKeytipProps = {
      content: 'G',
      keySequences: [{ keys: ['g'] }]
    };
    keytipManager.keytips = [keytipB, keytipG];

    // Create layer
    const defaultKeytipLayer = mount(
      <KeytipLayer
        content='Alt Windows'
        keytipStartSequences={ keytipStartSequences }
        keytipReturnSequences={ keytipReturnSequences }
        keytipExitSequences={ keytipExitSequences }
      />
    );

    const layerKeytips = defaultKeytipLayer.state('keytips');
    expect(layerKeytips).toHaveLength(2);
  });
});