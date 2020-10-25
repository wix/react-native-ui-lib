import React from 'react';
export interface ForwardRefInjectedProps {
    /**
     * The forwarded ref of the containing element
     */
    forwardedRef: any;
}
export default function forwardRef<P = any>(WrappedComponent: React.ComponentType<P>): React.ComponentType<P>;
