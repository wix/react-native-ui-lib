import type { Context } from 'react';
import type { Dictionary, Extendable } from '../typings/common';
interface Theme {
    components: Extendable;
}
export declare class ThemeManager {
    private themeContext?;
    theme: Theme;
    forcedTheme: {
        components: Extendable;
    };
    setThemeContext(context: Context<any>): void;
    getThemeContext(): Context<any> | undefined;
    setItem(key: string, value: any): void;
    getItem(key: string): any;
    setComponentTheme(componentName: string, overrides: Dictionary<any> | Function): void;
    setComponentForcedTheme(componentName: string, overrides: Dictionary<any> | Function): void;
    get components(): Extendable;
    get forcedThemeComponents(): Extendable;
}
declare const _default: ThemeManager;
export default _default;
