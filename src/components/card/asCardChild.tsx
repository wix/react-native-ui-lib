import React from 'react';
import CardContext from './CardContext';

function asCardChild<T>(
  WrappedComponent: React.ComponentType<any>
): React.ComponentType<T> {
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
