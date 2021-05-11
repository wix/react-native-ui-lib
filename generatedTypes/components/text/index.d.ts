import React, { PureComponent } from 'react';
import { TextProps as RNTextProps, TextStyle, Animated, StyleProp } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps, MarginModifiers, TypographyModifiers, ColorsModifiers } from '../../commons/new';
export declare type TextProps = Omit<RNTextProps, 'style'> & TypographyModifiers & ColorsModifiers & MarginModifiers & {
    /**
     * color of the text
     */
    color?: string;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean;
    /**
     * Substring to highlight
     */
    highlightString?: string;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean;
    textAlign?: string;
    style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
};
export declare type TextPropTypes = TextProps;
declare type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & TextProps;
/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendsLink: https://facebook.github.io/react-native/docs/text.html
 * @modifiers: margins, color, typography
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.js
 */
declare class Text extends PureComponent<PropsTypes> {
    static displayName: string;
    private TextContainer;
    getTextPartsByHighlight(targetString?: string, highlightString?: string): string[];
    renderText(children: any): any;
    render(): JSX.Element;
}
export { Text };
declare const _default: React.ComponentClass<(Pick<RNTextProps, "testID" | "onLayout" | "nativeID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "onPress" | "onLongPress" | "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onTextLayout" | "maxFontSizeMultiplier" | "adjustsFontSizeToFit" | "minimumFontScale" | "suppressHighlighting" | "selectable" | "selectionColor" | "textBreakStrategy"> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Substring to highlight
     */
    highlightString?: string | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
    style?: StyleProp<{} | TextStyle | {
        color?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontFamily?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontSize?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontStyle?: "normal" | "italic" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        letterSpacing?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        lineHeight?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textAlign?: "auto" | "left" | "right" | "center" | "justify" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textShadowColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textShadowOffset?: Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        textShadowRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        testID?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontVariant?: Animated.WithAnimatedArray<import("react-native").FontVariant> | undefined;
        writingDirection?: "auto" | "ltr" | "rtl" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        backfaceVisibility?: "visible" | "hidden" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomEndRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomLeftRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomRightRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomStartRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderLeftWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRightWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopEndRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopLeftRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopRightRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopStartRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        opacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        elevation?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        aspectRatio?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderEndWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStartWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        bottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        display?: "none" | "flex" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        end?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flex?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexBasis?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexGrow?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexShrink?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        height?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        left?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        margin?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginBottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginEnd?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginHorizontal?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginLeft?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginRight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginStart?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginTop?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginVertical?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        maxHeight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        maxWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        minHeight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        minWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        overflow?: "visible" | "hidden" | "scroll" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        padding?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingBottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingEnd?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingHorizontal?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingLeft?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingRight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingStart?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingTop?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingVertical?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        position?: "absolute" | "relative" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        right?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        start?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        top?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        width?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        zIndex?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        direction?: "ltr" | "rtl" | "inherit" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowOffset?: Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        shadowOpacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        transform?: Animated.WithAnimatedArray<import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform> | undefined;
        transformMatrix?: Animated.WithAnimatedArray<number> | undefined;
        rotation?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        scaleX?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        scaleY?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        translateX?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        translateY?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textAlignVertical?: "auto" | "center" | "top" | "bottom" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        includeFontPadding?: boolean | Animated.Value | Animated.AnimatedInterpolation | undefined;
    }>;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Pick<RNTextProps, "testID" | "onLayout" | "nativeID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "onPress" | "onLongPress" | "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onTextLayout" | "maxFontSizeMultiplier" | "adjustsFontSizeToFit" | "minimumFontScale" | "suppressHighlighting" | "selectable" | "selectionColor" | "textBreakStrategy"> & import("../../commons/modifiers").CustomModifier & Partial<Record<"transparent" | "black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Substring to highlight
     */
    highlightString?: string | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
    style?: StyleProp<{} | TextStyle | {
        color?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontFamily?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontSize?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontStyle?: "normal" | "italic" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        letterSpacing?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        lineHeight?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textAlign?: "auto" | "left" | "right" | "center" | "justify" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textShadowColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textShadowOffset?: Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        textShadowRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        testID?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontVariant?: Animated.WithAnimatedArray<import("react-native").FontVariant> | undefined;
        writingDirection?: "auto" | "ltr" | "rtl" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        backfaceVisibility?: "visible" | "hidden" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomEndRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomLeftRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomRightRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomStartRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderLeftWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRightWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopEndRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopLeftRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopRightRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopStartRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        opacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        elevation?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        aspectRatio?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderEndWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStartWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        bottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        display?: "none" | "flex" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        end?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flex?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexBasis?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexGrow?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexShrink?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        height?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        left?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        margin?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginBottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginEnd?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginHorizontal?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginLeft?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginRight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginStart?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginTop?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginVertical?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        maxHeight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        maxWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        minHeight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        minWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        overflow?: "visible" | "hidden" | "scroll" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        padding?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingBottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingEnd?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingHorizontal?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingLeft?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingRight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingStart?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingTop?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingVertical?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        position?: "absolute" | "relative" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        right?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        start?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        top?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        width?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        zIndex?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        direction?: "ltr" | "rtl" | "inherit" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowOffset?: Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        shadowOpacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        transform?: Animated.WithAnimatedArray<import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform> | undefined;
        transformMatrix?: Animated.WithAnimatedArray<number> | undefined;
        rotation?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        scaleX?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        scaleY?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        translateX?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        translateY?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textAlignVertical?: "auto" | "center" | "top" | "bottom" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        includeFontPadding?: boolean | Animated.Value | Animated.AnimatedInterpolation | undefined;
    }>;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Pick<RNTextProps, "testID" | "onLayout" | "nativeID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "onPress" | "onLongPress" | "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onTextLayout" | "maxFontSizeMultiplier" | "adjustsFontSizeToFit" | "minimumFontScale" | "suppressHighlighting" | "selectable" | "selectionColor" | "textBreakStrategy"> & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Substring to highlight
     */
    highlightString?: string | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
    style?: StyleProp<{} | TextStyle | {
        color?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontFamily?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontSize?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontStyle?: "normal" | "italic" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        letterSpacing?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        lineHeight?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textAlign?: "auto" | "left" | "right" | "center" | "justify" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textShadowColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textShadowOffset?: Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        textShadowRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        testID?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontVariant?: Animated.WithAnimatedArray<import("react-native").FontVariant> | undefined;
        writingDirection?: "auto" | "ltr" | "rtl" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        backfaceVisibility?: "visible" | "hidden" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomEndRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomLeftRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomRightRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomStartRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderLeftWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRightWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopEndRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopLeftRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopRightRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopStartRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        opacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        elevation?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        aspectRatio?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderEndWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStartWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        bottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        display?: "none" | "flex" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        end?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flex?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexBasis?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexGrow?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexShrink?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        height?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        left?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        margin?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginBottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginEnd?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginHorizontal?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginLeft?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginRight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginStart?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginTop?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginVertical?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        maxHeight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        maxWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        minHeight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        minWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        overflow?: "visible" | "hidden" | "scroll" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        padding?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingBottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingEnd?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingHorizontal?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingLeft?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingRight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingStart?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingTop?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingVertical?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        position?: "absolute" | "relative" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        right?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        start?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        top?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        width?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        zIndex?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        direction?: "ltr" | "rtl" | "inherit" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowOffset?: Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        shadowOpacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        transform?: Animated.WithAnimatedArray<import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform> | undefined;
        transformMatrix?: Animated.WithAnimatedArray<number> | undefined;
        rotation?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        scaleX?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        scaleY?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        translateX?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        translateY?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textAlignVertical?: "auto" | "center" | "top" | "bottom" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        includeFontPadding?: boolean | Animated.Value | Animated.AnimatedInterpolation | undefined;
    }>;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Pick<RNTextProps, "testID" | "onLayout" | "nativeID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "onPress" | "onLongPress" | "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onTextLayout" | "maxFontSizeMultiplier" | "adjustsFontSizeToFit" | "minimumFontScale" | "suppressHighlighting" | "selectable" | "selectionColor" | "textBreakStrategy"> & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"transparent" | "black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * color of the text
     */
    color?: string | undefined;
    /**
     * whether to center the text (using textAlign)
     */
    center?: boolean | undefined;
    /**
     * whether to change the text to uppercase
     */
    uppercase?: boolean | undefined;
    /**
     * Substring to highlight
     */
    highlightString?: string | undefined;
    /**
     * Custom highlight style for highlight string
     */
    highlightStyle?: TextStyle | undefined;
    /**
     * Use Animated.Text as a container
     */
    animated?: boolean | undefined;
    textAlign?: string | undefined;
    style?: StyleProp<{} | TextStyle | {
        color?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontFamily?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontSize?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontStyle?: "normal" | "italic" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        letterSpacing?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        lineHeight?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textAlign?: "auto" | "left" | "right" | "center" | "justify" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textDecorationColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textShadowColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textShadowOffset?: Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        textShadowRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        testID?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
        fontVariant?: Animated.WithAnimatedArray<import("react-native").FontVariant> | undefined;
        writingDirection?: "auto" | "ltr" | "rtl" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        backfaceVisibility?: "visible" | "hidden" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomEndRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomLeftRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomRightRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomStartRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderBottomWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderLeftWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderRightWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopEndRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopLeftRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopRightRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopStartRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderTopWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderWidth?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        opacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        elevation?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        aspectRatio?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderEndWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        borderStartWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        bottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        display?: "none" | "flex" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        end?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flex?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexBasis?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexGrow?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexShrink?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        height?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        left?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        margin?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginBottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginEnd?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginHorizontal?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginLeft?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginRight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginStart?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginTop?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        marginVertical?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        maxHeight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        maxWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        minHeight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        minWidth?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        overflow?: "visible" | "hidden" | "scroll" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        padding?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingBottom?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingEnd?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingHorizontal?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingLeft?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingRight?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingStart?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingTop?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        paddingVertical?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        position?: "absolute" | "relative" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        right?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        start?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        top?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        width?: string | number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        zIndex?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        direction?: "ltr" | "rtl" | "inherit" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowOffset?: Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        shadowOpacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        shadowRadius?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        transform?: Animated.WithAnimatedArray<import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform> | undefined;
        transformMatrix?: Animated.WithAnimatedArray<number> | undefined;
        rotation?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        scaleX?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        scaleY?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        translateX?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        translateY?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
        textAlignVertical?: "auto" | "center" | "top" | "bottom" | Animated.Value | Animated.AnimatedInterpolation | undefined;
        includeFontPadding?: boolean | Animated.Value | Animated.AnimatedInterpolation | undefined;
    }>;
} & {
    useCustomTheme?: boolean | undefined;
}), any>;
export default _default;
