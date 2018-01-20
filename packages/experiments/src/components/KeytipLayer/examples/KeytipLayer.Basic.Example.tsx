import * as React from 'react';
import { KeytipLayer } from '../KeytipLayer';

export interface IKeytipLayerBasicExampleState {
}

export class KeytipLayerBasicExample extends React.Component<{}, IKeytipLayerBasicExampleState> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    const keytipProps = [
      {
        content: 'hello'
      },
      {
        content: 'hello2'
      }
    ];

    return (
      <KeytipLayer id={ 'basic-keytip-layer' } keytips={ keytipProps } />
    );
  }
}