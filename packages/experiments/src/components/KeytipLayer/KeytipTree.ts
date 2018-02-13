import {
  IKeySequence,
  keySequencesAreEqual,
  keySequenceStartsWith,
  convertSequencesToKeytipID
} from '../../utilities/keysequence';

export interface IKeytipTreeNode {
  /**
   * ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
   */
  id: string;

  /**
   * KeySequence that invokes this KeytipTreeNode's onExecute function
   */
  keytipSequence: IKeySequence;

  /**
   * Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
   */
  onExecute?: () => void;

  /**
   * Function to execute when we return to this keytip
   */
  onReturn?: () => void;

  /**
   * List of keytips that should become visible when this keytip is pressed, can be empty
   */
  children: string[];

  /**
   * Parent keytip ID
   */
  parent: string;

  /**
   * Whether or not this node has children nodes or not. Should be used for menus/overflow components, that have
   * their children registered after the initial rendering of the DOM.
   */
  hasChildrenNodes?: boolean;

  /**
   * Whether the keytip is visible or not in the dom.
   */
  visible?: boolean;

  /**
   * T/F if this keytip's component is currently disabled
   */
  disabled?: boolean;

  /**
   * Link to another keytip node if this is a persisted keytip
   */
  keytipLink?: IKeytipTreeNode;
}

export interface IKeytipTreeNodeMap {
  [nodeId: string]: IKeytipTreeNode;
}

export class KeytipTree {
  public currentKeytip?: IKeytipTreeNode;
  public currentSequence: IKeySequence;
  public root: IKeytipTreeNode;
  public nodeMap: IKeytipTreeNodeMap = {};

  /**
   * KeytipTree constructor
   * @param enableSequences - KeySequences that will start keytip mode, passed down through the KeytipLayer
   */
  constructor(rootId: string) {

    // Root has no keytipSequences, we instead check _enableSequences to handle multiple entry points
    this.root = {
      id: rootId,
      children: [],
      parent: '',
      keytipSequence: { keys: [] },
      hasChildrenNodes: true
    };
    this.currentSequence = { keys: [] };
    this.nodeMap[this.root.id] = this.root;
  }

  /**
   * Add a keytip node to this KeytipTree
   * @param fullSequence - Full key sequence for the keytip to add
   * @param onExecute - Callback function to trigger when this keytip is activated
   */
  public addNode(sequence: IKeySequence[], onExecute?: () => void, hasChildrenNodes?: boolean): void {
    let fullSequence = [...sequence];
    let nodeID = convertSequencesToKeytipID(fullSequence);
    // This keytip's sequence is the last one defined
    let keytipSequence = fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    let parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);

    // See if node already exists
    let node = this.nodeMap[nodeID];
    if (node) {
      // If node exists, it was added when one of its children was added
      // Update keytipSequence, onExecute, parent
      node.keytipSequence = keytipSequence!;
      node.onExecute = onExecute;
      node.hasChildrenNodes = hasChildrenNodes;
      node.parent = parentID;
    } else {
      // If node doesn't exist, add node
      node = {
        id: nodeID,
        keytipSequence: keytipSequence!,
        children: [],
        parent: parentID,
        onExecute,
        hasChildrenNodes,
      };
      this.nodeMap[nodeID] = node;
    }

    let parent = this.nodeMap[parentID];
    if (!parent) {
      // If parent doesn't exist, create parent with ID and children only
      parent = {
        id: parentID,
        hasChildrenNodes: true,
        children: [],
        keytipSequence: { keys: [] },
        parent: ''
      };
      this.nodeMap[parentID] = parent;
    }
    // Add node to parent's children
    parent.children.push(nodeID);
  }

  /**
   * Removes a node from the KeytipTree
   * Will also remove all of the node's children from the Tree
   * @param sequence - full IKeySequence of the node to remove
   */
  public removeNode(sequence: IKeySequence[]): void {
    let fullSequence = [...sequence];
    let nodeID = convertSequencesToKeytipID(fullSequence);
    // Take off the last sequence to calculate the parent ID
    fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    let parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);

    let parent = this.nodeMap[parentID];
    if (parent) {
      // Remove node from its parent's children
      parent.children.splice(parent.children.indexOf(nodeID), 1);
    }

    let node = this.nodeMap[nodeID];
    if (node) {
      // Remove all the node's children from the nodeMap
      let children = node.children;
      for (let child of children) {
        delete this.nodeMap[child];
      }

      // Remove the node from the nodeMap
      delete this.nodeMap[nodeID];
    }
  }

  public getExactMatchedNode(keySequence: IKeySequence, currentKeytip: IKeytipTreeNode): IKeytipTreeNode | undefined {
    let possibleNodes = this._getChildrenNodes(currentKeytip.children);
    for (let node of possibleNodes) {
      if (keySequencesAreEqual(node.keytipSequence, keySequence)) {
        return node;
      }
    }
    return undefined;
  }

  public getPartiallyMatchedNodes(keySequence: IKeySequence, currentKeytip: IKeytipTreeNode): IKeytipTreeNode[] {
    let nodes: IKeytipTreeNode[] = [];
    let possibleNodes = this._getChildrenNodes(currentKeytip.children);
    for (let node of possibleNodes) {
      if (keySequenceStartsWith(node.keytipSequence, keySequence)) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  private _getChildrenNodes(ids: string[]): IKeytipTreeNode[] {
    let nodes: IKeytipTreeNode[] = [];
    for (let id of ids) {
      nodes.push(this.nodeMap[id]);
    }
    return nodes;
  }
}