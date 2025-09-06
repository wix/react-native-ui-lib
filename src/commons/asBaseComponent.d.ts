import React from 'react';
import * as Modifiers from './modifiers';
export interface BaseComponentInjectedProps {
    /**
     * All generated styles from the modifiers props
     */
    modifiers: ReturnType<typeof Modifiers.generateModifiersStyle>;
}
export interface AsBaseComponentOptions {
    ignoreModifiers?: boolean;
    ignoreTheme?: boolean;
    modifiersOptions?: Modifiers.ModifiersOptions;
}
declare function asBaseComponent<PROPS, STATICS = {}, RefInterface = any>(WrappedComponent: React.ComponentType<any>, options?: AsBaseComponentOptions): React.ForwardRefExoticComponent<React.PropsWithoutRef<PROPS> & React.RefAttributes<RefInterface>> & STATICS;
export default asBaseComponent;
