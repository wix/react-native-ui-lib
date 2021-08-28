import React from 'react';
import * as Modifiers from './modifiers';
export interface BaseComponentInjectedProps {
    /**
     * All generated styles from the modifiers props
     */
    modifiers: ReturnType<typeof Modifiers.generateModifiersStyle>;
}
declare type ThemeComponent = {
    useCustomTheme?: boolean;
};
declare function asBaseComponent<PROPS, STATICS = {}>(WrappedComponent: React.ComponentType<any>): React.ComponentClass<PROPS & ThemeComponent> & STATICS;
export default asBaseComponent;
