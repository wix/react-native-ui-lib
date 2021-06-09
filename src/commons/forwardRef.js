import React from 'react'; //@ts-ignore

import hoistStatics from 'hoist-non-react-statics';
export default function forwardRef(WrappedComponent) {
  function forwardRef(props, ref) {
    return <WrappedComponent {...props} forwardedRef={ref} />;
  }

  const ForwardedComponent = React.forwardRef(forwardRef);
  hoistStatics(ForwardedComponent, WrappedComponent);
  ForwardedComponent.displayName = WrappedComponent.displayName; //@ts-ignore

  ForwardedComponent.propTypes = WrappedComponent.propTypes; //@ts-ignore

  ForwardedComponent.defaultProps = WrappedComponent.defaultProps;
  return ForwardedComponent;
}