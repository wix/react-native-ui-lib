import React, {ComponentType, ForwardedRef} from 'react';
import hoistStatics from 'hoist-non-react-statics';

export interface ForwardRefInjectedProps<T = any> {
  /**
   * The forwarded ref of the containing element
   */
  forwardedRef: ForwardedRef<T>;
}

export default function forwardRef<P, STATICS = {}, RefInterface = any>(WrappedComponent: ComponentType<P & ForwardRefInjectedProps<RefInterface>>) {
  function forwardRef(props: P, ref: ForwardedRef<RefInterface>) {
    return <WrappedComponent {...props} forwardedRef={ref}/>;
  }

  // @ts-expect-error
  const ForwardedComponent = React.forwardRef<RefInterface, P>(forwardRef);

  hoistStatics(ForwardedComponent, WrappedComponent);
  ForwardedComponent.displayName = WrappedComponent.displayName;

  return ForwardedComponent as typeof ForwardedComponent & STATICS;
}
