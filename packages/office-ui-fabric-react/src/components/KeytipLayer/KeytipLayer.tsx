import * as React from 'react';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { Keytip, IKeytipProps } from '../Keytip';
import {
  BaseComponent
} from '../../Utilities';
import { Layer } from '../../Layer';
import { IKeySequence, KeyCodes } from '../../Utilities';
import { KeytipManager } from './KeytipManager';

export interface IKeytipLayerState {
  keytips: IKeytipProps[];
}

const defaultStartEndSequence = {
  keyCodes: [KeyCodes.alt, KeyCodes.win]
} as IKeySequence;

const defaultGoBackSequence = {
  keyCodes: [KeyCodes.escape]
} as IKeySequence;

const ktpId = 'ktp';

/**
 * A layer that holds all keytip items
 *
 * @export
 * @class KeytipLayer
 * @extends {BaseComponent<IKeytipLayerProps>}
 */
export class KeytipLayer extends BaseComponent<IKeytipLayerProps, IKeytipLayerState> {
  public static defaultProps: IKeytipLayerProps = {
    keytipStartSequences: [defaultStartEndSequence],
    keytipGoBackSequences: [defaultGoBackSequence],
    keytipExitSequences: [defaultStartEndSequence],
    id: ktpId + '-' + KeyCodes.alt + '-' + KeyCodes.win
  };

  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipLayerProps, context: any) {
    super(props, context);

    this.state = {
      keytips: []
    };

    this._keytipManager.setLayer(this);
  }

  public addKeytip(keytipProps: IKeytipProps) {
    return (previousState: IKeytipLayerState, currentProps: IKeytipLayerState) => {
      // TODO: check for duplicates
      let currentKeytips = [...previousState.keytips, ...[keytipProps]];
      return { ...previousState, keytips: currentKeytips };
    };
  }

  public registerKeytip(keytipProps: IKeytipProps) {
    this.setState(this.addKeytip(keytipProps));
  }

  public render(): JSX.Element {
    const {
      id
    } = this.props;

    const {
      keytips
    } = this.state;

    return (
      <Layer id={ id }>
        { keytips && keytips.map((keytipProps: IKeytipProps, index: number) => {
          return <Keytip key={ index } {...keytipProps} />;
        }) }
      </Layer>
    );
  }
}