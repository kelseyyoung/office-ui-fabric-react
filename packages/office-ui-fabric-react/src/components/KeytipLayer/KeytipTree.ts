import { IKeySequence } from '../../Utilities';
import { KeytipManager } from './KeytipManager';

export interface IKeytipTreeNode {
  // ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
  id: string;

  // Keytip key code sequence that invokes this KeytipTreeNode's onExecute function
  keytipSequences?: IKeySequence;

  // Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
  onExecute?: () => void;

  // List of keytips that should become visible when this keytip is pressed, can be empty
  children: IKeytipTreeNode[];

  // Parent keytip
  parent?: IKeytipTreeNode | undefined;
}

export class KeytipTree {

  public currentKeytip: IKeytipTreeNode;

  private _enableSequences: IKeySequence[];
  private _root: IKeytipTreeNode;
  private _nodes: IKeytipTreeNode[];
  private _manager: KeytipManager;

  constructor(enableSequences: IKeySequence[]) {
    this._manager = KeytipManager.getInstance();
    this._enableSequences = enableSequences;
    // Root has no keytipSequences, we instead check _enableSequences to handle multiple entry points
    this._root = {
      id: this._manager.getLayer().props.id,
      children: []
    };
    this._nodes = [this._root];
  }

  public addNode(fullSequence: IKeySequence[], onExecute: void) {
    // Add
  }
}