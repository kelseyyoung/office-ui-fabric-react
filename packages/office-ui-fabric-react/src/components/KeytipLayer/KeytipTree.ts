import { KeySequence } from '../../Utilities';
import { KeytipManager } from './KeytipManager';

export interface IKeytipTreeNode {
  // ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
  id: string;

  // KeySequence that invokes this KeytipTreeNode's onExecute function
  keytipSequence?: KeySequence;

  // Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
  onExecute?: () => void;

  // List of keytips that should become visible when this keytip is pressed, can be empty
  children: string[];

  // Parent keytip
  parent?: string;
}

export interface IKeytipTreeNodeMap {
  [nodeId: string]: IKeytipTreeNode;
}

export class KeytipTree {
  public currentKeytip: IKeytipTreeNode;
  public root: IKeytipTreeNode;
  public nodeMap: IKeytipTreeNodeMap = {};

  private _enableSequences: KeySequence[];
  private _manager: KeytipManager;

  constructor(enableSequences: KeySequence[]) {
    this._manager = KeytipManager.getInstance();
    this._enableSequences = enableSequences;
    // Root has no keytipSequences, we instead check _enableSequences to handle multiple entry points
    this.root = {
      id: this._manager.getLayer().props.id,
      children: []
    };
    this.nodeMap[this.root.id] = this.root;
  }

  public addNode(fullSequence: KeySequence[], onExecute: () => void) {
    let nodeID = this._manager.convertSequencesToID(fullSequence);
    let keytipSequence = fullSequence[fullSequence.length - 1]; // TODO: could just pop here?
    // Parent ID is the root if there's only one sequence
    let parentID = fullSequence.length === 1 ? this.root.id : this._manager.convertSequencesToID(fullSequence.slice(0, fullSequence.length - 1));

    // See if node already exists
    let node = this.nodeMap[nodeID];
    if (node) {
      // If node exists, it was added when one of its children was added
      // Update keytipSequence, onExecute, parent
      node.keytipSequence = keytipSequence;
      node.onExecute = onExecute;
      node.parent = parentID;
    } else {
      // If node doesn't exist, add node
      node = {
        id: nodeID,
        keytipSequence: keytipSequence,
        onExecute: onExecute,
        children: [],
        parent: parentID
      };
      this.nodeMap[nodeID] = node;
    }

    let parent = this.nodeMap[parentID];
    if (!parent) {
      // If parent doesn't exist, create parent with ID and children only
      parent = {
        id: parentID,
        children: []
      };
      this.nodeMap[parentID] = parent;
    }
    // Add node to parent's children
    parent.children.push(nodeID);
  }
}