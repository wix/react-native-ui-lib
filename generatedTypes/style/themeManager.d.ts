export declare class ThemeManager {
    theme: {
        primaryColor: any;
        CTA: {
            textColor: string;
            disabledColor: string;
            backgroundColor: any;
        };
        titleColor: string;
        subtitleColor: string;
        dividerColor: string;
        components: Extendable;
    };
    forcedTheme: {
        components: Extendable;
    };
    setTheme(overrides: Dictionary<string>): void;
    getTheme(): {
        primaryColor: any;
        CTA: {
            textColor: string;
            disabledColor: string;
            backgroundColor: any;
        };
        titleColor: string;
        subtitleColor: string;
        dividerColor: string;
        components: Extendable;
    };
    setItem(key: string, value: any): void;
    getItem(key: string): any;
    setComponentTheme(componentName: string, overrides: Dictionary<any> | Function): void;
    setComponentForcedTheme(componentName: string, overrides: Dictionary<any> | Function): void;
    get components(): Extendable;
    get forcedThemeComponents(): Extendable;
    get primaryColor(): any;
    get CTATextColor(): string;
    get CTADisabledColor(): string;
    get CTABackgroundColor(): any;
    get titleColor(): string;
    get subtitleColor(): string;
    get dividerColor(): string;
}
declare const _default: ThemeManager;
export default _default;
