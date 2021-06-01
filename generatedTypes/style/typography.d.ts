import { TextStyle } from 'react-native';
declare type MeasureTextTypography = TextStyle & {
    allowFontScaling?: boolean;
};
export declare class Typography {
    keysPattern: RegExp;
    /**
     * Load custom set of typographies
     * arguments:
     * typographies - map of keys and typography values
     * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
     */
    loadTypographies(typographies: Dictionary<any>): void;
    getKeysPattern(): RegExp;
    generateKeysPattern(): RegExp;
    measureWidth(text: string, typography?: TextStyle | undefined, containerWidth?: number): Promise<any>;
    measureTextSize(text: string, typography?: MeasureTextTypography, containerWidth?: number): Promise<any>;
}
declare type CustomTypographyPresets = {
    [custom: string]: TextStyle;
};
declare const typography: Typography & Partial<{
    text10: TextStyle;
    text20: TextStyle;
    text30: TextStyle;
    text40: TextStyle;
    text50: TextStyle;
    text60: TextStyle;
    text65: TextStyle;
    text70: TextStyle;
    text80: TextStyle;
    text90: TextStyle;
    text100: TextStyle;
    text10T: TextStyle;
    text10L: TextStyle;
    text10R: TextStyle;
    text10M: TextStyle;
    text10BO: TextStyle;
    text10H: TextStyle;
    text10BL: TextStyle;
    text20T: TextStyle;
    text20L: TextStyle;
    text20R: TextStyle;
    text20M: TextStyle;
    text20BO: TextStyle;
    text20H: TextStyle;
    text20BL: TextStyle;
    text30T: TextStyle;
    text30L: TextStyle;
    text30R: TextStyle;
    text30M: TextStyle;
    text30BO: TextStyle;
    text30H: TextStyle;
    text30BL: TextStyle;
    text40T: TextStyle;
    text40L: TextStyle;
    text40R: TextStyle;
    text40M: TextStyle;
    text40BO: TextStyle;
    text40H: TextStyle;
    text40BL: TextStyle;
    text50T: TextStyle;
    text50L: TextStyle;
    text50R: TextStyle;
    text50M: TextStyle;
    text50BO: TextStyle;
    text50H: TextStyle;
    text50BL: TextStyle;
    text60T: TextStyle;
    text60L: TextStyle;
    text60R: TextStyle;
    text60M: TextStyle;
    text60BO: TextStyle;
    text60H: TextStyle;
    text60BL: TextStyle;
    text65T: TextStyle;
    text65L: TextStyle;
    text65R: TextStyle;
    text65M: TextStyle;
    text65BO: TextStyle;
    text65H: TextStyle;
    text65BL: TextStyle;
    text70T: TextStyle;
    text70L: TextStyle;
    text70R: TextStyle;
    text70M: TextStyle;
    text70BO: TextStyle;
    text70H: TextStyle;
    text70BL: TextStyle;
    text80T: TextStyle;
    text80L: TextStyle;
    text80R: TextStyle;
    text80M: TextStyle;
    text80BO: TextStyle;
    text80H: TextStyle;
    text80BL: TextStyle;
    text90T: TextStyle;
    text90L: TextStyle;
    text90R: TextStyle;
    text90M: TextStyle;
    text90BO: TextStyle;
    text90H: TextStyle;
    text90BL: TextStyle;
    text100T: TextStyle;
    text100L: TextStyle;
    text100R: TextStyle;
    text100M: TextStyle;
    text100BO: TextStyle;
    text100H: TextStyle;
    text100BL: TextStyle;
}> & CustomTypographyPresets;
export default typography;
