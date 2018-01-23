import * as React from 'react';
import { Keytip } from '../Keytip';

export interface IKeytipBasicExampleState {
}

export class KeytipBasicExample extends React.Component<{}, IKeytipBasicExampleState> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    return (
      <div>
        <span id='basic-keytip-div' />
        <Keytip
          content={ 'hello' }
          calloutProps={ { target: '#basic-keytip-div' } }
        />
      </div>
    );
  }
}