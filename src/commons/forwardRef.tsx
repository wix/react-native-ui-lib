import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export interface ForwardRefInjectedProps {
  forwardedRef: any;
}
export default function forwardRef<P>(WrappedComponent: React.ComponentType<P>): React.ComponentType<Omit<P, keyof ForwardRefInjectedProps>> {
  function forwardRef(props: P, ref: any) {
    return <WrappedComponent {...props} forwardedRef={ref}/>;
  }

  const ForwardedComponent = React.forwardRef(forwardRef);

  hoistStatics(ForwardedComponent, WrappedComponent);
  //@ts-ignore
  ForwardedComponent.displayName = WrappedComponent.displayName;
  //@ts-ignore
  ForwardedComponent.propTypes = WrappedComponent.propTypes;
  //@ts-ignore
  ForwardedComponent.defaultProps = WrappedComponent.defaultProps;

  return ForwardedComponent as any;
}

