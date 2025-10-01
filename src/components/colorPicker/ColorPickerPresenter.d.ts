import { Colors } from '../../style';
export type HSLColor = ReturnType<typeof Colors.getHSL>;
export declare const BORDER_RADIUS = 12;
export declare function getColorValue(color?: string): string | undefined;
export declare function getHexColor(text: string): string;
export declare function getValidColorString(text?: string): {
    hex: string;
    valid: boolean;
    undefined?: undefined;
} | {
    undefined: undefined;
    valid: boolean;
    hex?: undefined;
};
export declare function getHexString(color: HSLColor): Uppercase<string>;
export declare function getTextColor(color: string): string;
