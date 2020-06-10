import React from 'react';
import CardContext from './CardContext';

function asCardChild(WrappedComponent) {
  const cardChild = (props) => {
    return (
      <CardContext.Consumer>{(context) => <WrappedComponent context={context} {...props}/>}</CardContext.Consumer>
    );
  };

  return cardChild;
}

export default asCardChild;
