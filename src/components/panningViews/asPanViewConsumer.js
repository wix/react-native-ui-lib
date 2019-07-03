import React, {Component} from 'react';
import PanningContext from './panningContext';

function asPanViewConsumer(WrappedComponent) {
  class PanViewConsumer extends Component {
    render() {
      return (
        <PanningContext.Consumer>
          {context => <WrappedComponent ref={r => (this.contentRef = r)} context={context} {...this.props} />}
        </PanningContext.Consumer>
      );
    }
  }

  return PanViewConsumer;
}

export default asPanViewConsumer;
