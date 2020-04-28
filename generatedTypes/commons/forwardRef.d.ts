import React from 'react';
export interface ForwardRefInjectedProps {
    /**
     * The forwarded ref of the containing element
     */
    forwardedRef: any;
}
export default function forwardRef(WrappedComponent: React.ComponentType<any>): React.ComponentType<any>;
