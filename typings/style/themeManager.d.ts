declare class ThemeManager {
    theme: {
        primaryColor: any;
        CTA: {
            textColor: any;
            disabledColor: any;
            backgroundColor: any;
        };
        titleColor: any;
        subtitleColor: any;
        dividerColor: any;
        components: {
            TouchableOpacity: {
                throttleTime: number;
                throttleOptions: {
                    leading: boolean;
                    trailing: boolean;
                };
            };
        };
    };
    setTheme(overrides: any): void;
    getTheme(): {
        primaryColor: any;
        CTA: {
            textColor: any;
            disabledColor: any;
            backgroundColor: any;
        };
        titleColor: any;
        subtitleColor: any;
        dividerColor: any;
        components: {
            TouchableOpacity: {
                throttleTime: number;
                throttleOptions: {
                    leading: boolean;
                    trailing: boolean;
                };
            };
        };
    };
    setItem(key: any, value: any): void;
    getItem(key: any): any;
    setComponentTheme(componentName: any, overrides: any): void;
    readonly components: {
        TouchableOpacity: {
            throttleTime: number;
            throttleOptions: {
                leading: boolean;
                trailing: boolean;
            };
        };
    };
    readonly primaryColor: any;
    readonly CTATextColor: any;
    readonly CTADisabledColor: any;
    readonly CTABackgroundColor: any;
    readonly titleColor: any;
    readonly subtitleColor: any;
    readonly dividerColor: any;
}
declare const _default: ThemeManager;
export default _default;
