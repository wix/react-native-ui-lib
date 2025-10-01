import _ from 'lodash';
import { DesignTokens } from '../style';
import { BorderRadiusesLiterals } from '../style/borderRadiuses';
import TypographyPresets from '../style/typographyPresets';
import { colorsPalette } from '../style/colorsPalette';
import type { Dictionary } from '../typings/common';
export declare const FLEX_KEY_PATTERN: RegExp;
export declare const PADDING_KEY_PATTERN: RegExp;
export declare const MARGIN_KEY_PATTERN: RegExp;
export declare const ALIGNMENT_KEY_PATTERN: RegExp;
export declare const POSITION_KEY_PATTERN: RegExp;
export declare const GAP_KEY_PATTERN: RegExp;
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
    gap?: ReturnType<typeof extractGapValues>;
}
export type ModifiersOptions = {
    color?: boolean;
    typography?: boolean;
    backgroundColor?: boolean;
    borderRadius?: boolean;
    paddings?: boolean;
    margins?: boolean;
    alignments?: boolean;
    flex?: boolean;
    position?: boolean;
    gap?: boolean;
};
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
export type PaddingLiterals = keyof typeof PADDING_VARIATIONS;
export type NativePaddingKeyType = (typeof PADDING_VARIATIONS)[PaddingLiterals];
export type MarginLiterals = keyof typeof MARGIN_VARIATIONS;
export type NativeMarginModifierKeyType = (typeof MARGIN_VARIATIONS)[MarginLiterals];
export type FlexLiterals = keyof typeof STYLE_KEY_CONVERTERS;
export type NativeFlexModifierKeyType = (typeof STYLE_KEY_CONVERTERS)[FlexLiterals];
export type ColorLiterals = keyof (typeof colorsPalette & typeof DesignTokens);
export type TypographyLiterals = keyof typeof TypographyPresets;
export type BorderRadiusLiterals = keyof typeof BorderRadiusesLiterals;
export type AlignmentLiterals = 'row' | 'spread' | 'center' | 'centerH' | 'centerV' | 'left' | 'right' | 'top' | 'bottom';
export type PositionLiterals = 'absF' | 'absL' | 'absR' | 'absT' | 'absB' | 'absV' | 'absH';
export type GapLiterals = 'gap';
export type Modifier<T extends string> = Partial<Record<T, boolean>>;
export type CustomModifier = {
    [key: string]: boolean;
};
export type TypographyModifiers = Modifier<TypographyLiterals> | CustomModifier;
export type ColorsModifiers = Modifier<ColorLiterals> | CustomModifier;
export type BackgroundColorModifier = Modifier<`bg-${ColorLiterals}`>;
export type AlignmentModifiers = Modifier<AlignmentLiterals>;
export type PositionModifiers = Modifier<PositionLiterals>;
export type PaddingModifiers = Modifier<PaddingLiterals>;
export type MarginModifiers = Modifier<MarginLiterals>;
export type FlexModifiers = Modifier<FlexLiterals>;
export type BorderRadiusModifiers = Modifier<BorderRadiusLiterals>;
export type GapModifiers = Modifier<GapLiterals>;
export type ContainerModifiers = AlignmentModifiers & PositionModifiers & PaddingModifiers & MarginModifiers & FlexModifiers & BorderRadiusModifiers & BackgroundColorModifier & GapModifiers;
export declare function extractColorValue(props: Dictionary<any>): any;
export declare function extractBackgroundColorValue(props: Dictionary<any>): any;
export declare function extractTypographyValue(props: Dictionary<any>): object | undefined;
export declare function extractPaddingValues(props: Dictionary<any>): Partial<Record<NativePaddingKeyType, number>>;
export declare function extractMarginValues(props: Dictionary<any>): Partial<Record<NativeMarginModifierKeyType, number>>;
export declare function extractGapValues(props: Dictionary<any>): number | undefined;
export declare function extractAlignmentsValues(props: Dictionary<any>): any;
export declare function extractPositionStyle(props: Dictionary<any>): {} | undefined;
export declare function extractFlexStyle(props: Dictionary<any>): Partial<Record<NativeFlexModifierKeyType, number>> | undefined;
export declare function extractAccessibilityProps(props?: any): Partial<any>;
export declare function extractAnimationProps(props?: any): Pick<any, "animation" | "duration" | "delay" | "direction" | "easing" | "iterationCount" | "transition" | "onAnimationBegin" | "onAnimationEnd" | "useNativeDriver">;
export declare function extractBorderRadiusValue(props: Dictionary<any>): number | undefined;
export declare function extractModifierProps(props: Dictionary<any>): _.Dictionary<any>;
/**
 * TODO:
 * @deprecated switch to Modifiers#extractComponentProps
 */
export declare function extractOwnProps(props: Dictionary<any>, ignoreProps: string[]): _.Omit<_.Dictionary<any>, string>;
export declare function extractComponentProps(component: any, props: Dictionary<any>, ignoreProps?: string[]): _.Omit<_.Dictionary<any>, string>;
export declare function getThemeProps<T extends object>(props?: T, context?: any, componentDisplayName?: string): T;
export declare function generateModifiersStyle(options: ModifiersOptions | undefined, props: Dictionary<any>): ExtractedStyle;
export declare function getAlteredModifiersOptions(currentProps: any, nextProps: any): AlteredOptions;
export {};
