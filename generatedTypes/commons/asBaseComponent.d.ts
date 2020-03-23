import React from 'react';
import * as Modifiers from './modifiers';
export interface BaseComponentInjectedProps {
    modifiers: ReturnType<typeof Modifiers.generateModifiersStyle>;
}
declare function asBaseComponent<PROPS>(WrappedComponent: React.ComponentType<PROPS>): React.ComponentType<Omit<PROPS, keyof BaseComponentInjectedProps>>;
export default asBaseComponent;
