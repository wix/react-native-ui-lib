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
declare const typography: Typography & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", TextStyle>> & CustomTypographyPresets;
export default typography;
