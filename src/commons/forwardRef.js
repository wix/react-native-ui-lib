import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
export default function forwardRef(WrappedComponent) {
  function forwardRef(props, ref) {
    return <WrappedComponent {...props} forwardedRef={ref} />;
  }

  // @ts-expect-error
  const ForwardedComponent = React.forwardRef(forwardRef);
  hoistStatics(ForwardedComponent, WrappedComponent);
  //@ts-ignore
  ForwardedComponent.displayName = WrappedComponent.displayName;
  //@ts-ignore
  ForwardedComponent.propTypes = WrappedComponent.propTypes;
  //@ts-ignore
  ForwardedComponent.defaultProps = WrappedComponent.defaultProps;
  return ForwardedComponent;
}