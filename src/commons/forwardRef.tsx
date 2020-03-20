import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default <PROPS extends {}>(WrappedComponent: React.ClassType<PROPS, any, any>) => {
  function forwardRef(props: PROPS, ref: any) {
    return <WrappedComponent {...props} forwardedRef={ref}/>;
  }

  const ForwardedComponent = React.forwardRef(forwardRef);

  hoistStatics(ForwardedComponent, WrappedComponent);
  ForwardedComponent.displayName = WrappedComponent.displayName;
  ForwardedComponent.propTypes = WrappedComponent.propTypes;
  ForwardedComponent.defaultProps = WrappedComponent.defaultProps;

  return ForwardedComponent;
};
