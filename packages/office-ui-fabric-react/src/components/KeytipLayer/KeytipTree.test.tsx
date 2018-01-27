import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { KeytipLayer } from './KeytipLayer';
import { KeytipManager } from './KeytipManager';
import { IKeySequence, KeyCodes } from '../../Utilities';

describe('KeytipTree', () => {
  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  it('constructor creates a root node', () => {
    const layerID = 'my-id';
    const startSequence = [{ keyCodes: [KeyCodes.a] } as IKeySequence];
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ startSequence } />
    );

    let keytipManager = KeytipManager.getInstance();
    let keytipTree = keytipManager.keytipTree;

    // Tree root ID should be the layer's ID
    expect(keytipTree.root.id).toEqual(layerID);
    // Tree root should not have any children
    expect(keytipTree.root.children).toHaveLength(0);

    // Only the root should be specified in the nodeMap
    expect(keytipTree.nodeMap[layerID]).toBeDefined();
    expect(Object.keys(keytipTree.nodeMap)).toHaveLength(1);
  });

  it('addNode directly under root works correctly', () => {
    const layerID = 'my-id';
    const startSequence = [{ keyCodes: [KeyCodes.a] } as IKeySequence];
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ startSequence } />
    );
    let keytipManager = KeytipManager.getInstance();
    let keytipTree = keytipManager.keytipTree;

    /*
    const keytipID = 'ktp-' + KeyCodes.d.toString();
    const sampleKeySequence = [new KeySequence([KeyCodes.d])];
    const emptyCallback = () => { return undefined; };

    keytipTree.addNode(sampleKeySequence, emptyCallback);

    // Test code C has been added to root's children
    expect(keytipTree.root.children).toHaveLength(1);
    expect(keytipTree.root.children).toContain(keytipID);

    // Test C was added to nodeMap
    expect(Object.keys(keytipTree.nodeMap)).toHaveLength(2);
    let keytipTreeNode = keytipTree.nodeMap[keytipID];
    expect(keytipTreeNode).toBeDefined();

    // Test TreeNode C properties
    expect(keytipTreeNode.id).toEqual(keytipID);
    expect(keytipTreeNode.children).toHaveLength(0);
    expect(keytipTreeNode.parent).toEqual(layerID);
    */
  });
});