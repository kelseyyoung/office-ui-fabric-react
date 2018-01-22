/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { MessageBar } from './MessageBar';

describe('MessageBar', () => {
  let noop = () => {
    /* no-op */
  };

  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  it('renders MessageBar correctly', () => {
    const component = renderer.create(<MessageBar>Message</MessageBar>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('dismiss', () => {
    describe('single-line', () => {
      it('is present when onDismiss exists', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar onDismiss={ noop } isMultiline={ false } />);
        let dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).not.toBeNull();
      });

      it('is not present when onDismiss is missing', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar isMultiline={ false } />);
        let dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).toBeNull();
      });
    });

    describe('multi-line', () => {
      it('is present when onDismiss exists', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar onDismiss={ noop } isMultiline={ true } />);
        let dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).not.toBeNull();
      });

      it('is not present when onDismiss is missing', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar isMultiline={ true } />);
        let dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).toBeNull();
      });
    });
  });

  describe('truncated', () => {
    it('is present when onDismiss exists', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar truncated={ true } isMultiline={ false } />);
      let expandElement = renderedDOM.querySelector('.ms-MessageBar-expand');
      expect(expandElement).not.toBeNull();
    });

    it('is not present when truncated is missing', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar isMultiline={ false } />);
      let expandElement = renderedDOM.querySelector('.ms-MessageBar-expand');
      expect(expandElement).toBeNull();
    });
  });
});
