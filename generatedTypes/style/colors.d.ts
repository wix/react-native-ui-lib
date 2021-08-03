import _ from 'lodash';
import tinycolor from 'tinycolor2';
declare type Schemes = {
    light: {
        [key: string]: string;
    };
    dark: {
        [key: string]: string;
    };
};
declare type SchemeType = 'default' | 'light' | 'dark';
export declare class Colors {
    [key: string]: any;
    schemes: Schemes;
    currentScheme: SchemeType;
    constructor();
    /**
     * Load custom set of colors
     * arguments:
     * colors - map of keys and colors values e.g {dark10: '#20303C', dark20: '#43515C'}
     */
    loadColors(colors: {
        [key: string]: string;
    }): void;
    /**
     * Load set of schemes for light/dark mode
     * arguments:
     * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
     */
    loadSchemes(schemes: Schemes): void;
    /**
     * Get app's current color scheme
     */
    getScheme(): 'light' | 'dark';
    /**
     * Set color scheme for app
     * arguments:
     * scheme - color scheme e.g light/dark/default
     */
    setScheme(scheme: SchemeType): void;
    /**
     * Add alpha to hex or rgb color
     * arguments:
     * p1 - hex color / R part of RGB
     * p2 - opacity / G part of RGB
     * p3 - B part of RGB
     * p4 - opacity
     */
    rgba(p1: string, p2: number): string;
    rgba(p1: number, p2: number, p3: number, p4: number): string;
    getBackgroundKeysPattern(): RegExp;
    isEmpty(color: string): boolean;
    getColorTint(color: string, tintKey: string | number): any;
    getColorName(color: string): any;
    getTintedColorForDynamicHex(color: string, tintKey: string | number): string;
    generateColorPalette: ((color: any) => string[]) & _.MemoizedFunction;
    isDark(color: string): boolean;
    isValidHex(string: string): boolean;
    getHexString(color: tinycolor.ColorInput): string;
    getHSL(color?: string): tinycolor.ColorFormats.HSLA;
    isTransparent(color?: string): boolean | "" | undefined;
    areEqual(colorA: string, colorB: string): boolean;
}
declare const colorObject: Colors & {
    dark10: string;
    dark20: string;
    dark30: string;
    dark40: string;
    dark50: string;
    dark60: string;
    dark70: string;
    dark80: string;
    grey10: string;
    grey20: string;
    grey30: string;
    grey40: string;
    grey50: string;
    grey60: string;
    grey70: string;
    grey80: string;
    blue10: string;
    blue20: string;
    blue30: string;
    blue40: string;
    blue50: string;
    blue60: string;
    blue70: string;
    blue80: string;
    cyan10: string;
    cyan20: string;
    cyan30: string;
    cyan40: string;
    cyan50: string;
    cyan60: string;
    cyan70: string;
    cyan80: string;
    green10: string;
    green20: string;
    green30: string;
    green40: string;
    green50: string;
    green60: string;
    green70: string;
    green80: string;
    yellow10: string;
    yellow20: string;
    yellow30: string;
    yellow40: string;
    yellow50: string;
    yellow60: string;
    yellow70: string;
    yellow80: string;
    orange10: string;
    orange20: string;
    orange30: string;
    orange40: string;
    orange50: string;
    orange60: string;
    orange70: string;
    orange80: string;
    red10: string;
    red20: string;
    red30: string;
    red40: string;
    red50: string;
    red60: string;
    red70: string;
    red80: string;
    purple10: string;
    purple20: string;
    purple30: string;
    purple40: string;
    purple50: string;
    purple60: string;
    purple70: string;
    purple80: string;
    /**
     * Get app's current color scheme
     */
    violet10: string;
    violet20: string;
    violet30: string;
    violet40: string;
    violet50: string;
    violet60: string;
    violet70: string;
    violet80: string;
    white: string;
    black: string;
    transparent: string;
} & {
    primary: string;
};
export default colorObject;
