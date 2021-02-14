import _ from 'lodash';
import { BorderRadiusesLiterals } from '../style/borderRadiuses';
import TypographyPresets from '../style/typographyPresets';
import { colorsPalette } from '../style/colorsPalette';
export declare const FLEX_KEY_PATTERN: RegExp;
export declare const PADDING_KEY_PATTERN: RegExp;
export declare const MARGIN_KEY_PATTERN: RegExp;
export declare const ALIGNMENT_KEY_PATTERN: RegExp;
export declare const POSITION_KEY_PATTERN: RegExp;
export interface AlteredOptions {
    flex?: boolean;
    alignments?: boolean;
    paddings?: boolean;
    margins?: boolean;
    backgroundColor?: boolean;
    position?: boolean;
}
export interface ExtractedStyle {
    color?: ReturnType<typeof extractColorValue>;
    typography?: ReturnType<typeof extractTypographyValue>;
    backgroundColor?: ReturnType<typeof extractBackgroundColorValue>;
    borderRadius?: ReturnType<typeof extractBorderRadiusValue>;
    paddings?: ReturnType<typeof extractPaddingValues>;
    margins?: ReturnType<typeof extractMarginValues>;
    alignments?: ReturnType<typeof extractAlignmentsValues>;
    flexStyle?: ReturnType<typeof extractFlexStyle>;
    positionStyle?: ReturnType<typeof extractPositionStyle>;
}
declare const PADDING_VARIATIONS: {
    readonly padding: "padding";
    readonly paddingL: "paddingLeft";
    readonly paddingT: "paddingTop";
    readonly paddingR: "paddingRight";
    readonly paddingB: "paddingBottom";
    readonly paddingH: "paddingHorizontal";
    readonly paddingV: "paddingVertical";
};
declare const MARGIN_VARIATIONS: {
    readonly margin: "margin";
    readonly marginL: "marginLeft";
    readonly marginT: "marginTop";
    readonly marginR: "marginRight";
    readonly marginB: "marginBottom";
    readonly marginH: "marginHorizontal";
    readonly marginV: "marginVertical";
};
declare const STYLE_KEY_CONVERTERS: {
    readonly flex: "flex";
    readonly flexG: "flexGrow";
    readonly flexS: "flexShrink";
};
export declare type PaddingLiterals = keyof typeof PADDING_VARIATIONS;
export declare type NativePaddingKeyType = typeof PADDING_VARIATIONS[PaddingLiterals];
export declare type MarginLiterals = keyof typeof MARGIN_VARIATIONS;
export declare type NativeMarginModifierKeyType = typeof MARGIN_VARIATIONS[MarginLiterals];
export declare type FlexLiterals = keyof typeof STYLE_KEY_CONVERTERS;
export declare type NativeFlexModifierKeyType = typeof STYLE_KEY_CONVERTERS[FlexLiterals];
export declare type ColorLiterals = keyof typeof colorsPalette;
export declare type TypographyLiterals = keyof typeof TypographyPresets;
export declare type BorderRadiusLiterals = keyof typeof BorderRadiusesLiterals;
export declare type AlignmentLiterals = 'row' | 'spread' | 'center' | 'centerH' | 'centerV' | 'left' | 'right' | 'top' | 'bottom';
export declare type PositionLiterals = 'absF' | 'absL' | 'absR' | 'absT' | 'absB' | 'absV' | 'absH';
export declare type Modifier<T extends string> = Partial<Record<T, boolean>>;
export declare type CustomModifier = {
    [key: string]: boolean;
};
export declare type TypographyModifiers = Modifier<TypographyLiterals> | CustomModifier;
export declare type ColorsModifiers = Modifier<ColorLiterals> | CustomModifier;
export declare type BackgroundColorModifier = Modifier<'bg'>;
export declare type AlignmentModifiers = Modifier<AlignmentLiterals>;
export declare type PositionModifiers = Modifier<PositionLiterals>;
export declare type PaddingModifiers = Modifier<PaddingLiterals>;
export declare type MarginModifiers = Modifier<MarginLiterals>;
export declare type FlexModifiers = Modifier<FlexLiterals>;
export declare type BorderRadiusModifiers = Modifier<BorderRadiusLiterals>;
export declare type ContainerModifiers = AlignmentModifiers & PositionModifiers & PaddingModifiers & MarginModifiers & FlexModifiers & BorderRadiusModifiers & BackgroundColorModifier;
export declare function extractColorValue(props: Dictionary<any>): any;
export declare function extractBackgroundColorValue(props: Dictionary<any>): any;
export declare function extractTypographyValue(props: Dictionary<any>): object | undefined;
export declare function extractPaddingValues(props: Dictionary<any>): Partial<Record<NativePaddingKeyType, number>>;
export declare function extractMarginValues(props: Dictionary<any>): Partial<Record<NativeMarginModifierKeyType, number>>;
export declare function extractAlignmentsValues(props: Dictionary<any>): any;
export declare function extractPositionStyle(props: Dictionary<any>): {
    position: "absolute";
} | undefined;
export declare function extractFlexStyle(props: Dictionary<any>): Partial<Record<NativeFlexModifierKeyType, number>> | undefined;
export declare function extractAccessibilityProps(props?: any): Partial<any>;
export declare function extractAnimationProps(props?: any): Pick<any, "onAnimationEnd" | "animation" | "duration" | "delay" | "direction" | "easing" | "iterationCount" | "transition" | "onAnimationBegin" | "useNativeDriver">;
export declare function extractBorderRadiusValue(props: Dictionary<any>): number | undefined;
export declare function extractModifierProps(props: Dictionary<any>): _.Dictionary<any>;
/**
 * TODO:
 * @deprecated switch to Modifiers#extractComponentProps
 */
export declare function extractOwnProps(props: Dictionary<any>, ignoreProps: string[]): Pick<Partial<Dictionary<any>>, number>;
export declare function extractComponentProps(component: any, props: Dictionary<any>, ignoreProps?: string[]): Pick<Partial<Dictionary<any>>, number>;
export declare function getThemeProps(props?: any, context?: any): any;
export declare function generateModifiersStyle(options: {
    color: boolean;
    typography: boolean;
    backgroundColor: boolean;
    borderRadius: boolean;
    paddings: boolean;
    margins: boolean;
    alignments: boolean;
    flex: boolean;
    position: boolean;
} | undefined, props: Dictionary<any>): ExtractedStyle;
export declare function getAlteredModifiersOptions(currentProps: any, nextProps: any): AlteredOptions;
export {};
