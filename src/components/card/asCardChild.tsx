import React from 'react';
import CardContext from './CardContext';

function asCardChild(WrappedComponent: React.ComponentType) {
  const cardChild = (props: any) => {
    return (
      <CardContext.Consumer>
        {(context) => <WrappedComponent context={context} {...props} />}
      </CardContext.Consumer>
    );
  };

  return cardChild;
}

export default asCardChild;
export type asCardChildProps = {context?: any};
