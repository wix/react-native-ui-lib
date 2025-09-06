import { OpaqueColorValue } from 'react-native';
import tinycolor from 'tinycolor2';
import { Schemes, SchemeType } from './scheme';
export type DesignToken = {
    semantic?: [string];
    resource_paths?: [string];
    toString: Function;
};
export type TokensOptions = {
    primaryColor: string;
};
export type GetColorTintOptions = {
    avoidReverseOnDark?: boolean;
};
export type GetColorByHexOptions = {
    validColors?: string[];
};
export type GeneratePaletteOptions = {
    /** Whether to adjust the lightness of very light colors (generating darker palette) */
    adjustLightness?: boolean;
    /** Whether to adjust the saturation of colors with high lightness and saturation (unifying saturation level throughout palette) */
    adjustSaturation?: boolean;
    /** Array of saturation adjustments to apply on the color's tints array (from darkest to lightest).
     * The 'adjustSaturation' option must be true */
    saturationLevels?: number[];
    /** Whether to add two extra dark colors usually used for dark mode (generating a palette of 10 instead of 8 colors) */
    addDarkestTints?: boolean;
    /** Whether to reverse the color palette to generate dark mode palette (pass 'true' to generate the same palette for both light and dark modes) */
    avoidReverseOnDark?: boolean;
};
export declare class Colors {
    [key: string]: any;
    shouldSupportDarkMode: boolean;
    constructor();
    /**
     * Load custom set of colors
     * arguments:
     * colors - map of keys and colors values e.g {grey10: '#20303C', grey20: '#43515C'}
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
     * Load light and dark schemes based on generated design tokens
     * @param color - palette color
     */
    loadDesignTokens(options: TokensOptions): void;
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
     * Support listening to Appearance changes
     * and change the design tokens accordingly
     */
    supportDarkMode(): void;
    /**
     * Add alpha to hex or rgb color
     * arguments:
     * p1 - hex color / R part of RGB
     * p2 - opacity / G part of RGB
     * p3 - B part of RGB
     * p4 - opacity
     */
    rgba(p1: string, p2: number): string | undefined;
    rgba(p1: number, p2: number, p3: number, p4: number): string | undefined;
    getBackgroundKeysPattern(): RegExp;
    isEmpty(color: string): boolean;
    getColor(colorKey: string, schemeType?: Exclude<SchemeType, 'default'>): string;
    getColorName(colorValue: string): any;
    getSystemColorByHex(colorValue: string, options?: GetColorByHexOptions): string;
    shouldReverseOnDark: (avoidReverseOnDark?: boolean) => boolean;
    getColorTint(colorValue: string | OpaqueColorValue | undefined, tintKey: string | number, options?: GetColorTintOptions): any;
    private getTintedColorForDynamicHex;
    private generatePalette;
    defaultPaletteOptions: {
        adjustLightness: boolean;
        adjustSaturation: boolean;
        addDarkestTints: boolean;
        avoidReverseOnDark: boolean;
        saturationLevels: any;
    };
    generateColorPalette: any;
    private generateDesignTokens;
    private shouldGenerateDarkerPalette;
    isDark(colorValue: string | OpaqueColorValue | undefined, darkThreshold?: number): boolean;
    isValidHex(string: string): boolean;
    getHexString(color: tinycolor.ColorInput): any;
    getHSL(color?: string): any;
    isTransparent(color?: string): boolean;
    areEqual(colorAValue: string | OpaqueColorValue, colorBValue: string | OpaqueColorValue): boolean;
    isDesignToken(color?: DesignToken): boolean;
}
declare const colorObject: Colors & {
    grey1: string;
    grey5: string;
    grey10: string;
    grey20: string;
    grey30: string;
    grey40: string;
    grey50: string;
    grey60: string;
    grey70: string;
    grey80: string;
    blue1: string;
    blue5: string;
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
    green1: string;
    green5: string;
    green10: string;
    green20: string;
    green30: string;
    green40: string;
    green50: string;
    green60: string;
    green70: string;
    green80: string;
    yellow1: string;
    yellow5: string; /** Whether to adjust the saturation of colors with high lightness and saturation (unifying saturation level throughout palette) */
    yellow10: string;
    yellow20: string;
    yellow30: string;
    yellow40: string;
    yellow50: string;
    yellow60: string;
    yellow70: string;
    yellow80: string;
    orange1: string;
    orange5: string;
    orange10: string;
    orange20: string;
    orange30: string;
    orange40: string;
    orange50: string;
    orange60: string;
    orange70: string;
    orange80: string;
    red1: string;
    red5: string;
    red10: string;
    red20: string;
    red30: string;
    red40: string;
    red50: string;
    red60: string;
    red70: string;
    red80: string;
    purple1: string;
    purple5: string;
    purple10: string;
    purple20: string;
    purple30: string;
    purple40: string;
    purple50: string;
    purple60: string;
    purple70: string;
    purple80: string;
    violet1: string;
    violet5: string;
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
    dark: string;
    transparent: string;
} & {
    $backgroundDefault: string;
    $backgroundElevated: string;
    $backgroundElevatedLight: string;
    $backgroundNeutralHeavy: string;
    $backgroundNeutralIdle: string;
    $backgroundNeutralMedium: string;
    $backgroundNeutral: string;
    $backgroundNeutralLight: string;
    $backgroundPrimaryHeavy: string;
    $backgroundPrimaryMedium: string;
    $backgroundPrimaryLight: string;
    $backgroundGeneralHeavy: string;
    $backgroundGeneralMedium: string;
    $backgroundGeneralLight: string;
    $backgroundSuccessHeavy: string; /** Whether to adjust the lightness of very light colors (generating darker palette) */
    $backgroundSuccessLight: string;
    $backgroundWarningHeavy: string;
    $backgroundWarningLight: string;
    $backgroundMajorLight: string;
    $backgroundMajorHeavy: string;
    $backgroundDangerHeavy: string;
    $backgroundDangerLight: string;
    $backgroundDisabled: string;
    $backgroundDark: string;
    $backgroundDarkElevated: string;
    $backgroundDarkActive: string;
    $backgroundInverted: string;
    $textDisabled: string;
    $textDefault: string;
    $textNeutralHeavy: string;
    $textNeutral: string;
    $textNeutralLight: string;
    $textDefaultLight: string;
    $textPrimary: string;
    $textGeneral: string;
    $textSuccess: string;
    $textSuccessLight: string;
    $textMajor: string;
    $textDanger: string;
    $textDangerLight: string;
    $iconDefault: string;
    $iconNeutral: string;
    $iconDefaultLight: string;
    $iconPrimary: string;
    $iconPrimaryLight: string;
    $iconGeneral: string;
    $iconGeneralLight: string;
    $iconSuccess: string;
    $iconSuccessLight: string;
    $iconMajor: string;
    $iconDanger: string;
    $iconDangerLight: string;
    $iconDisabled: string;
    $outlineDefault: string;
    $outlineDisabled: string;
    $outlineDisabledHeavy: string;
    $outlineNeutral: string;
    $outlineNeutralHeavy: string;
    $outlinePrimary: string;
    $outlinePrimaryMedium: string;
    $outlineGeneral: string; /**
     * Get app's current color scheme
     */
    $outlineWarning: string;
    $outlineDanger: string;
    $outlineInverted: string; /**
     * Set color scheme for app
     * arguments:
     * scheme - color scheme e.g light/dark/default
     */
    $black: string;
    $white: string;
};
export default colorObject;
