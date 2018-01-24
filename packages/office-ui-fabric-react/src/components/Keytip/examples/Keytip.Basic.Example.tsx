import * as React from 'react';
import { DefaultButton } from '../../Button';
import { KeytipLayer } from '../../KeytipLayer';

export interface IKeytipBasicExampleState {
}

export class KeytipBasicExample extends React.Component<{}, IKeytipBasicExampleState> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    return (
      <div>
        <KeytipLayer id='layer-id' />
        <DefaultButton text='123' keytipProps={ { content: 'hello' } } />
        <DefaultButton text='456' keytipProps={ { content: 'hello too ' } } />
        <DefaultButton text='789' keytipProps={ { content: 'hello three ' } } />
      </div>
    );
  }
}