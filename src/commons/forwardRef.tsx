import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export interface ForwardRefInjectedProps {
  /**
   * The forwarded ref of the containing element
   */
  forwardedRef: any;
}

export default function forwardRef<P = any, STATICS = {}>(WrappedComponent: React.ComponentType<P>): React.ComponentType<P> & STATICS {
  function forwardRef(props: P, ref: any) {
    return <WrappedComponent {...props} forwardedRef={ref}/>;
  }

  const ForwardedComponent = React.forwardRef(forwardRef);

  hoistStatics(ForwardedComponent, WrappedComponent);
  ForwardedComponent.displayName = WrappedComponent.displayName;
  //@ts-ignore
  ForwardedComponent.propTypes = WrappedComponent.propTypes;
  //@ts-ignore
  ForwardedComponent.defaultProps = WrappedComponent.defaultProps;

  return ForwardedComponent as any;
}
