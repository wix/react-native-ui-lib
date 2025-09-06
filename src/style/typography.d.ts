import { TextStyle } from 'react-native';
import { TypographyKeys } from './typographyPresets';
export type { TypographyKeys };
import type { Dictionary } from '../typings/common';
type MeasureTextTypography = TextStyle & {
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
type CustomTypographyPresets = {
    [custom: string]: TextStyle;
};
declare const typography: Typography & Partial<TypographyKeys> & CustomTypographyPresets;
export default typography;
