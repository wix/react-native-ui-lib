import React from 'react';
//@ts-ignore
import hoistStatics from 'hoist-non-react-statics';

export interface ForwardRefInjectedProps {
  /**
   * The forwarded ref of the containing element
   */
  forwardedRef: any;
}

export default function forwardRef(WrappedComponent: React.ComponentType<any>): React.ComponentType<any> {
  function forwardRef(props: any, ref: any) {
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

