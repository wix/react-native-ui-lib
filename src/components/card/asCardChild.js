import React, {Component} from 'react';
import CardContext from './CardContext';

function asCardChild(WrappedComponent) {
  class CardChild extends Component {
    render() {
      return (
        <CardContext.Consumer>
          {(context) => (
            <WrappedComponent context={context} {...this.props}/>
          )}
        </CardContext.Consumer>
      );
    }
  }

  return CardChild;
}

export default asCardChild;
