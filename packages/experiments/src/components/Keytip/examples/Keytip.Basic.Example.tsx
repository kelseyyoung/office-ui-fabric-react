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
      <div id='basic-keytip-div' style={ { width: 200, height: 1 } }>
        <Keytip
          content={ 'hello' }
          calloutProps={ { target: '#basic-keytip-div' } }
        />
      </div>
    );
  }
}