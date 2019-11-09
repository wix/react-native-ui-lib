import React, {Component} from 'react';
import PanningContext from './panningContext';

function asPanViewConsumer(WrappedComponent) {
  class PanViewConsumer extends Component {
    // TODO: remove when removing PanDismissibleView
    saveRef = r => {
      this.contentRef = r;
    };

    render() {
      return (
        <PanningContext.Consumer>
          {context => <WrappedComponent ref={this.saveRef} context={context} {...this.props}/>}
        </PanningContext.Consumer>
      );
    }
  }

  return PanViewConsumer;
}

export default asPanViewConsumer;
