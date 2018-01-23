import * as React from 'react';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { Keytip, IKeytipProps } from '../Keytip';
import {
  BaseComponent
} from '../../Utilities';
import { Layer } from 'office-ui-fabric-react/lib/Layer';

/**
 * A layer that holds all keytip items
 *
 * @export
 * @class KeytipLayer
 * @extends {React.Component<IKeytipLayerProps>}
 */
export class KeytipLayer extends BaseComponent<IKeytipLayerProps> {
  // tslint:disable-next-line:no-any
  constructor(props: IKeytipLayerProps, context: any) {
    super(props, context);
  }

  public render(): JSX.Element {
    const {
      keytips,
      id
    } = this.props;
    return (
      <Layer id={ id }>
        { keytips && keytips.map((keytipProps: IKeytipProps, index: number) => {
          return <Keytip key={ index } {...keytipProps} />;
        }) }
      </Layer>
    );
  }
}