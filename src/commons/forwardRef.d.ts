import React, { ComponentType, ForwardedRef } from 'react';
export interface ForwardRefInjectedProps<T = any> {
    /**
     * The forwarded ref of the containing element
     */
    forwardedRef: ForwardedRef<T>;
}
export default function forwardRef<P, STATICS = {}, RefInterface = any>(WrappedComponent: ComponentType<P & ForwardRefInjectedProps<RefInterface>>): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<RefInterface>> & STATICS;
