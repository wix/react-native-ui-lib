import React from 'react';
export interface ForwardRefInjectedProps {
    forwardedRef: any;
}
export default function forwardRef<P>(WrappedComponent: React.ComponentType<P>): React.ComponentType<Omit<P, keyof ForwardRefInjectedProps>>;
