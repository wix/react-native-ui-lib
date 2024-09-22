import React, {ComponentType, ForwardedRef, PropsWithoutRef} from 'react';
import hoistStatics from 'hoist-non-react-statics';

export interface ForwardRefInjectedProps<T = any> {
  /**
   * The forwarded ref of the containing element
   */
  forwardedRef: ForwardedRef<T>;
}

export default function forwardRef<P, STATICS = {}, RefInterface = any>(WrappedComponent: ComponentType<PropsWithoutRef<P> & ForwardRefInjectedProps<RefInterface>>) {
  function forwardRef(props: PropsWithoutRef<P>, ref: ForwardedRef<RefInterface>) {
    return <WrappedComponent {...props} forwardedRef={ref}/>;
  }

  const ForwardedComponent = React.forwardRef<RefInterface, P>(forwardRef);

  hoistStatics(ForwardedComponent, WrappedComponent);
  //@ts-ignore
  ForwardedComponent.displayName = WrappedComponent.displayName;
  //@ts-ignore
  ForwardedComponent.propTypes = WrappedComponent.propTypes;
  //@ts-ignore
  ForwardedComponent.defaultProps = WrappedComponent.defaultProps;

  return ForwardedComponent as typeof ForwardedComponent & STATICS;
}
