import * as React from 'react';
import { IKeytipProps } from './Keytip.types';
import {
  BaseComponent
} from '../../Utilities';
import { Callout } from 'office-ui-fabric-react/lib/Callout';

export interface IKeytipState {
}

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 *
 * @export
 * @class Keytip
 * @extends {React.Component<IKeytipProps, IKeytipState>}
 */
export class Keytip extends BaseComponent<IKeytipProps, IKeytipState> {
  constructor(props: IKeytipProps, context: any) {
    super(props, context);
  }

  public render(): JSX.Element {
    const {
      content,
      calloutProps
    } = this.props;

    return (
      // TODO: pass through hostID to the callout when it's exposed
      <Callout { ...calloutProps } isBeakVisible={ false }>
        <span>{ content }</span>
      </Callout>
    );
  }
}