import * as React from 'react';
import { IKeytipProps } from './Keytip.types';
import {
  BaseComponent
} from '../../Utilities';
import { Callout } from '../../Callout';

export interface IKeytipState {
}

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 *
 * @export
 * @class Keytip
 * @extends {BaseComponent<IKeytipProps, IKeytipState>}
 */
export class Keytip extends BaseComponent<IKeytipProps, IKeytipState> {
  // tslint:disable-next-line:no-any
  constructor(props: IKeytipProps, context: any) {
    super(props, context);
  }

  public render(): JSX.Element {
    const {
      content,
      keytipTarget,
      calloutProps
    } = this.props;

    return (
      // TODO: pass through hostID to the callout when it's exposed
      <Callout { ...calloutProps } isBeakVisible={ false } doNotLayer={ true } target={ keytipTarget }>
        <span>{ content }</span>
      </Callout>
    );
  }
}