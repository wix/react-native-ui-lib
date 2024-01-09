import React, {Ref} from 'react';
import hoistStatics from 'hoist-non-react-statics';

export interface ForwardRefInjectedProps<T> {
  /**
   * The forwarded ref of the containing element
   */
  forwardedRef: Ref<T>;
}

export default function forwardRef<P = {}, STATICS extends {[key: string]: true} = {}, RefInterface = any>(WrappedComponent: React.ComponentType<P & ForwardRefInjectedProps<RefInterface>>) {
  function forwardRef(props: P, ref: Ref<RefInterface>) {
    return <WrappedComponent {...props} forwardedRef={ref}/>;
  }

  const ForwardedComponent = React.forwardRef<RefInterface, P>(forwardRef);

  const FinalComponent = hoistStatics<typeof ForwardedComponent, typeof WrappedComponent, STATICS>(ForwardedComponent,
    WrappedComponent);
  FinalComponent.displayName = WrappedComponent.displayName;
  //@ts-ignore
  FinalComponent.propTypes = WrappedComponent.propTypes;
  //@ts-ignore
  FinalComponent.defaultProps = WrappedComponent.defaultProps;

  return FinalComponent;
}
