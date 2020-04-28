import React from 'react';
import * as Modifiers from './modifiers';
export interface BaseComponentInjectedProps {
    /**
     * All generated styles from the modifiers props
     */
    modifiers: ReturnType<typeof Modifiers.generateModifiersStyle>;
}
declare function asBaseComponent<PROPS>(WrappedComponent: React.ComponentType<any>): React.ComponentType<PROPS>;
export default asBaseComponent;
