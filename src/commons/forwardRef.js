import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default WrappedComponent => {
  function forwardRef(props, ref) {
    return <WrappedComponent {...props} forwardedRef={ref}/>;
  }

  const ForwardedComponent = React.forwardRef(forwardRef);

  hoistStatics(ForwardedComponent, WrappedComponent);
  ForwardedComponent.displayName = WrappedComponent.displayName;
  ForwardedComponent.propTypes = WrappedComponent.propTypes;
  ForwardedComponent.defaultProps = WrappedComponent.defaultProps;

  return ForwardedComponent;
};
