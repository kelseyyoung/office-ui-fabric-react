import * as React from 'react';
import { IKeytipProps } from './Keytip.types';
import {
  BaseComponent
} from '../../Utilities';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../ContextualMenu/';
import { getKeytipClassnames } from './Keytip.classnames';
import { getTheme } from '../../Styling';

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

    const classNames = getKeytipClassnames(getTheme());

    return (
      <Callout
        { ...calloutProps }
        isBeakVisible={ false }
        doNotLayer={ true }
        directionalHint={ DirectionalHint.bottomCenter }
        target={ keytipTarget }>
        <div className={ classNames.root }>
          <span className={ classNames.content }>{ content }</span>
        </div >
      </Callout>
    );
  }
}