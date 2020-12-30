import React, { PureComponent } from 'react';
import { LayoutChangeEvent, ImageStyle, TextStyle, StyleProp } from 'react-native';
import { BaseComponentInjectedProps, ForwardRefInjectedProps, TypographyModifiers, ColorsModifiers, BackgroundColorModifier, MarginModifiers } from '../../commons/new';
import { TouchableOpacityProps } from '../touchableOpacity';
import { TextProps } from '../text';
export declare enum ButtonSize {
    xSmall = "xSmall",
    small = "small",
    medium = "medium",
    large = "large"
}
export declare enum ButtonAnimationDirection {
    center = "center",
    left = "left",
    right = "right"
}
export declare type ButtonProps = TouchableOpacityProps & TypographyModifiers & ColorsModifiers & BackgroundColorModifier & MarginModifiers & {
    /**
     * Text to show inside the button
     */
    label?: string;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string;
    /**
     * Icon image source or a callback function that returns a source
     */
    iconSource?: object | number | Function;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean;
    /**
     * whether the icon should flip horizontally on RTL locals
     */
    supportRTL?: boolean;
    /**
     * Color of the button background
     */
    backgroundColor?: string;
    /**
     * Color of the disabled button background
     */
    disabledBackgroundColor?: string;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize;
    /**
     * Custom border radius.
     */
    borderRadius?: number;
    /**
     * Actions handler
     */
    onPress?: (props: any) => void;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean;
    /**
     * Button will have outline style
     */
    outline?: boolean;
    /**
     * The outline color
     */
    outlineColor?: string;
    /**
     * The outline width
     */
    outlineWidth?: number;
    /**
     * Button will look like a link
     */
    link?: boolean;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string;
    /**
     * Additional styles for label text
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: TextProps;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean;
    /**
     * should the button be a round button
     */
    round?: boolean;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: (backgroundColor: string, props: any) => string;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: ButtonAnimationDirection;
};
export declare type ButtonPropTypes = ButtonProps;
export declare type ButtonState = {
    size?: number;
    borderRadius?: number;
    isLandscape?: boolean;
};
declare type Props = ButtonProps & BaseComponentInjectedProps & ForwardRefInjectedProps;
/**
 * @description: Basic button component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, background
 * @gif: https://media.giphy.com/media/xULW8j5WzsuPytqklq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.tsx
 */
declare class Button extends PureComponent<Props, ButtonState> {
    static displayName: string;
    static defaultProps: {
        iconOnRight: boolean;
    };
    static sizes: typeof ButtonSize;
    static animationDirection: typeof ButtonAnimationDirection;
    constructor(props: Props);
    state: {
        size: undefined;
    };
    styles: {
        container: {
            backgroundColor: string;
            justifyContent: "center";
            alignItems: "center";
        };
        containerDisabled: {
            backgroundColor: string;
        };
        innerContainerLink: {
            minWidth: undefined;
            paddingHorizontal: undefined;
            paddingVertical: undefined;
            borderRadius: number;
            backgroundColor: undefined;
        };
        shadowStyle: {
            shadowColor: string;
            shadowOffset: {
                height: number;
                width: number;
            };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
        };
        text: {
            backgroundColor: string;
            flex: number;
            flexDirection: "row";
        } | {
            color?: string | typeof import("react-native").OpaqueColorValue | undefined;
            fontFamily?: string | undefined;
            fontSize?: number | undefined;
            fontStyle?: "normal" | "italic" | undefined;
            fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
            letterSpacing?: number | undefined;
            lineHeight?: number | undefined;
            textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
            textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
            textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
            textDecorationColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            textShadowColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            textShadowOffset?: {
                width: number;
                height: number;
            } | undefined;
            textShadowRadius?: number | undefined;
            textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | undefined;
            testID?: string | undefined;
            fontVariant?: import("react-native").FontVariant[] | undefined;
            writingDirection?: "auto" | "ltr" | "rtl" | undefined;
            backfaceVisibility?: "visible" | "hidden" | undefined;
            backgroundColor: import("react-native").ColorValue;
            borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            borderBottomEndRadius?: number | undefined;
            borderBottomLeftRadius?: number | undefined;
            borderBottomRightRadius?: number | undefined;
            borderBottomStartRadius?: number | undefined;
            borderBottomWidth?: number | undefined;
            borderColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            borderEndColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            borderLeftWidth?: number | undefined;
            borderRadius?: number | undefined;
            borderRightColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            borderRightWidth?: number | undefined;
            borderStartColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            borderStyle?: "solid" | "dotted" | "dashed" | undefined;
            borderTopColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            borderTopEndRadius?: number | undefined;
            borderTopLeftRadius?: number | undefined;
            borderTopRightRadius?: number | undefined;
            borderTopStartRadius?: number | undefined;
            borderTopWidth?: number | undefined;
            borderWidth?: number | undefined;
            opacity?: number | undefined;
            elevation?: number | undefined;
            alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | undefined;
            alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined;
            alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined;
            aspectRatio?: number | undefined;
            borderEndWidth?: string | number | undefined;
            borderStartWidth?: string | number | undefined;
            bottom?: string | number | undefined;
            display?: "none" | "flex" | undefined;
            end?: string | number | undefined;
            flex: number;
            flexBasis?: string | number | undefined;
            flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
            flexGrow?: number | undefined;
            flexShrink?: number | undefined;
            flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
            height?: string | number | undefined;
            justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
            left?: string | number | undefined;
            margin?: string | number | undefined;
            marginBottom?: string | number | undefined;
            marginEnd?: string | number | undefined;
            marginHorizontal?: string | number | undefined;
            marginLeft?: string | number | undefined;
            marginRight?: string | number | undefined;
            marginStart?: string | number | undefined;
            marginTop?: string | number | undefined;
            marginVertical?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            overflow?: "visible" | "hidden" | "scroll" | undefined;
            padding?: string | number | undefined;
            paddingBottom?: string | number | undefined;
            paddingEnd?: string | number | undefined;
            paddingHorizontal?: string | number | undefined;
            paddingLeft?: string | number | undefined;
            paddingRight?: string | number | undefined;
            paddingStart?: string | number | undefined;
            paddingTop?: string | number | undefined;
            paddingVertical?: string | number | undefined;
            position?: "absolute" | "relative" | undefined;
            right?: string | number | undefined;
            start?: string | number | undefined;
            top?: string | number | undefined;
            width?: string | number | undefined;
            zIndex?: number | undefined;
            direction?: "ltr" | "rtl" | "inherit" | undefined;
            shadowColor?: string | typeof import("react-native").OpaqueColorValue | undefined;
            shadowOffset?: {
                width: number;
                height: number;
            } | undefined;
            shadowOpacity?: number | undefined;
            shadowRadius?: number | undefined;
            transform?: (import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform)[] | undefined;
            transformMatrix?: number[] | undefined;
            rotation?: number | undefined;
            scaleX?: number | undefined;
            scaleY?: number | undefined;
            translateX?: number | undefined;
            translateY?: number | undefined;
            textAlignVertical?: "auto" | "center" | "top" | "bottom" | undefined;
            includeFontPadding?: boolean | undefined;
        };
    };
    componentDidUpdate(prevProps: Props): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onOrientationChanged: () => void;
    onLayout: (event: LayoutChangeEvent) => void;
    get isOutline(): boolean;
    get isFilled(): boolean;
    get isIconButton(): boolean | 0 | undefined;
    getBackgroundColor(): any;
    getActiveBackgroundColor(): string | undefined;
    getLabelColor(): string | undefined;
    getLabelSizeStyle(): object;
    getContainerSizeStyle(): any;
    getOutlineStyle(): {
        borderWidth: number;
        borderColor: string;
    } | undefined;
    getBorderRadiusStyle(): {
        borderRadius: number;
    };
    getShadowStyle(): ({
        shadowColor: string;
        shadowOffset: {
            height: number;
            width: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    } | {
        shadowColor: any;
    })[] | undefined;
    getIconStyle(): StyleProp<ImageStyle>[];
    getAnimationDirectionStyle(): {
        alignSelf: string;
    } | undefined;
    renderIcon(): any;
    renderLabel(): JSX.Element | null;
    render(): JSX.Element;
}
export { Button };
declare const _default: React.ComponentClass<(Pick<import("react-native").TouchableOpacityProps, "testID" | "onLayout" | "hitSlop" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "activeOpacity" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset" | "touchSoundDisabled"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    customValue?: any;
    style?: false | {} | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | {
        backfaceVisibility?: "visible" | "hidden" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomEndRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomLeftRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomRightRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomStartRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderLeftWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRightWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopEndRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopLeftRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopRightRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopStartRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        opacity?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        testID?: string | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        elevation?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        aspectRatio?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderEndWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStartWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        bottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        display?: "none" | "flex" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        end?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flex?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexBasis?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexGrow?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexShrink?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        height?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        left?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        margin?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginBottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginEnd?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginHorizontal?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginLeft?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginRight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginStart?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginTop?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginVertical?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        maxHeight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        maxWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        minHeight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        minWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        overflow?: "visible" | "hidden" | "scroll" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        padding?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingBottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingEnd?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingHorizontal?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingLeft?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingRight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingStart?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingTop?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingVertical?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        position?: "absolute" | "relative" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        right?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        start?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        top?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        width?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        zIndex?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        direction?: "ltr" | "rtl" | "inherit" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowOffset?: import("react-native").Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        shadowOpacity?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        transform?: import("react-native").Animated.WithAnimatedArray<import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform> | undefined;
        transformMatrix?: import("react-native").Animated.WithAnimatedArray<number> | undefined;
        rotation?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        scaleX?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        scaleY?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        translateX?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        translateY?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
    } | {
        toString: ((radix?: number | undefined) => string) & (() => string);
        toFixed: (fractionDigits?: number | undefined) => string;
        toExponential: (fractionDigits?: number | undefined) => string;
        toPrecision: (precision?: number | undefined) => string;
        valueOf: (() => number) & (() => Object);
        toLocaleString: ((locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => string) & (() => string);
        __registeredStyleBrand: import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle>;
    } | {
        [x: number]: false | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle> | import("react-native").Animated.WithAnimatedArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined> | readonly (false | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        length: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation;
        toString: () => string;
        toLocaleString: () => string;
        pop: () => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        push: (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        concat: {
            (...items: ConcatArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
            (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | ConcatArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined> | null | undefined)[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        join: (separator?: string | undefined) => string;
        reverse: () => (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        shift: () => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        slice: (start?: number | undefined, end?: number | undefined) => (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        sort: (compareFn?: ((a: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, b: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined) => number) | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        splice: {
            (start: number, deleteCount?: number | undefined): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
            (start: number, deleteCount: number, ...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        unshift: (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        indexOf: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        lastIndexOf: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        every: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        some: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        forEach: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => void, thisArg?: any) => void;
        map: <U>(callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U, thisArg?: any) => U[];
        filter: {
            <S extends false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>(callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S, thisArg?: any): S[];
            (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        reduce: {
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_1, initialValue: U_1): U_1;
        };
        reduceRight: {
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_2, initialValue: U_2): U_2;
        };
        find: {
            <S_1 extends false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>(predicate: (this: void, value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S_1, thisArg?: any): S_1 | undefined;
            (predicate: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        };
        findIndex: (predicate: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => number;
        fill: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, start?: number | undefined, end?: number | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        copyWithin: (target: number, start: number, end?: number | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        entries: () => IterableIterator<[number, false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined]>;
        keys: () => IterableIterator<number>;
        values: () => IterableIterator<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>;
        includes: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => boolean;
        flatMap: <U_3, This = undefined>(callback: (this: This, value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[];
        flat: <A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[];
    } | null | undefined;
    onPress?: ((props: TouchableOpacityProps) => void) | undefined;
} & import("../../commons/modifiers").CustomModifier & {
    /**
     * Text to show inside the button
     */
    label?: string | undefined;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string | undefined;
    /**
     * Icon image source or a callback function that returns a source
     */
    iconSource?: number | object | Function | undefined;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * whether the icon should flip horizontally on RTL locals
     */
    supportRTL?: boolean | undefined;
    /**
     * Color of the button background
     */
    backgroundColor?: string | undefined;
    /**
     * Color of the disabled button background
     */
    disabledBackgroundColor?: string | undefined;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize | undefined;
    /**
     * Custom border radius.
     */
    borderRadius?: number | undefined;
    /**
     * Actions handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean | undefined;
    /**
     * Button will have outline style
     */
    outline?: boolean | undefined;
    /**
     * The outline color
     */
    outlineColor?: string | undefined;
    /**
     * The outline width
     */
    outlineWidth?: number | undefined;
    /**
     * Button will look like a link
     */
    link?: boolean | undefined;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string | undefined;
    /**
     * Additional styles for label text
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | undefined;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean | undefined;
    /**
     * should the button be a round button
     */
    round?: boolean | undefined;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean | undefined;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean | undefined;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean | undefined;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: ((backgroundColor: string, props: any) => string) | undefined;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean | undefined;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: ButtonAnimationDirection | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Pick<import("react-native").TouchableOpacityProps, "testID" | "onLayout" | "hitSlop" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "activeOpacity" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset" | "touchSoundDisabled"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    customValue?: any;
    style?: false | {} | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | {
        backfaceVisibility?: "visible" | "hidden" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomEndRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomLeftRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomRightRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomStartRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderLeftWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRightWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopEndRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopLeftRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopRightRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopStartRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        opacity?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        testID?: string | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        elevation?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        aspectRatio?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderEndWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStartWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        bottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        display?: "none" | "flex" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        end?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flex?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexBasis?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexGrow?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexShrink?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        height?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        left?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        margin?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginBottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginEnd?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginHorizontal?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginLeft?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginRight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginStart?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginTop?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginVertical?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        maxHeight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        maxWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        minHeight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        minWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        overflow?: "visible" | "hidden" | "scroll" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        padding?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingBottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingEnd?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingHorizontal?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingLeft?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingRight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingStart?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingTop?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingVertical?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        position?: "absolute" | "relative" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        right?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        start?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        top?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        width?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        zIndex?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        direction?: "ltr" | "rtl" | "inherit" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowOffset?: import("react-native").Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        shadowOpacity?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        transform?: import("react-native").Animated.WithAnimatedArray<import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform> | undefined;
        transformMatrix?: import("react-native").Animated.WithAnimatedArray<number> | undefined;
        rotation?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        scaleX?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        scaleY?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        translateX?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        translateY?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
    } | {
        toString: ((radix?: number | undefined) => string) & (() => string);
        toFixed: (fractionDigits?: number | undefined) => string;
        toExponential: (fractionDigits?: number | undefined) => string;
        toPrecision: (precision?: number | undefined) => string;
        valueOf: (() => number) & (() => Object);
        toLocaleString: ((locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => string) & (() => string);
        __registeredStyleBrand: import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle>;
    } | {
        [x: number]: false | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle> | import("react-native").Animated.WithAnimatedArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined> | readonly (false | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        length: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation;
        toString: () => string;
        toLocaleString: () => string;
        pop: () => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        push: (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        concat: {
            (...items: ConcatArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
            (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | ConcatArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined> | null | undefined)[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        join: (separator?: string | undefined) => string;
        reverse: () => (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        shift: () => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        slice: (start?: number | undefined, end?: number | undefined) => (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        sort: (compareFn?: ((a: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, b: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined) => number) | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        splice: {
            (start: number, deleteCount?: number | undefined): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
            (start: number, deleteCount: number, ...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        unshift: (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        indexOf: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        lastIndexOf: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        every: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        some: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        forEach: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => void, thisArg?: any) => void;
        map: <U>(callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U, thisArg?: any) => U[];
        filter: {
            <S extends false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>(callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S, thisArg?: any): S[];
            (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        reduce: {
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_1, initialValue: U_1): U_1;
        };
        reduceRight: {
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_2, initialValue: U_2): U_2;
        };
        find: {
            <S_1 extends false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>(predicate: (this: void, value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S_1, thisArg?: any): S_1 | undefined;
            (predicate: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        };
        findIndex: (predicate: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => number;
        fill: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, start?: number | undefined, end?: number | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        copyWithin: (target: number, start: number, end?: number | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        entries: () => IterableIterator<[number, false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined]>;
        keys: () => IterableIterator<number>;
        values: () => IterableIterator<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>;
        includes: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => boolean;
        flatMap: <U_3, This = undefined>(callback: (this: This, value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[];
        flat: <A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[];
    } | null | undefined;
    onPress?: ((props: TouchableOpacityProps) => void) | undefined;
} & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & {
    /**
     * Text to show inside the button
     */
    label?: string | undefined;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string | undefined;
    /**
     * Icon image source or a callback function that returns a source
     */
    iconSource?: number | object | Function | undefined;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * whether the icon should flip horizontally on RTL locals
     */
    supportRTL?: boolean | undefined;
    /**
     * Color of the button background
     */
    backgroundColor?: string | undefined;
    /**
     * Color of the disabled button background
     */
    disabledBackgroundColor?: string | undefined;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize | undefined;
    /**
     * Custom border radius.
     */
    borderRadius?: number | undefined;
    /**
     * Actions handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean | undefined;
    /**
     * Button will have outline style
     */
    outline?: boolean | undefined;
    /**
     * The outline color
     */
    outlineColor?: string | undefined;
    /**
     * The outline width
     */
    outlineWidth?: number | undefined;
    /**
     * Button will look like a link
     */
    link?: boolean | undefined;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string | undefined;
    /**
     * Additional styles for label text
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | undefined;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean | undefined;
    /**
     * should the button be a round button
     */
    round?: boolean | undefined;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean | undefined;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean | undefined;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean | undefined;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: ((backgroundColor: string, props: any) => string) | undefined;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean | undefined;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: ButtonAnimationDirection | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Pick<import("react-native").TouchableOpacityProps, "testID" | "onLayout" | "hitSlop" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "activeOpacity" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset" | "touchSoundDisabled"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    customValue?: any;
    style?: false | {} | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | {
        backfaceVisibility?: "visible" | "hidden" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomEndRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomLeftRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomRightRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomStartRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderLeftWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRightWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopEndRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopLeftRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopRightRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopStartRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        opacity?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        testID?: string | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        elevation?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        aspectRatio?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderEndWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStartWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        bottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        display?: "none" | "flex" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        end?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flex?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexBasis?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexGrow?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexShrink?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        height?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        left?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        margin?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginBottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginEnd?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginHorizontal?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginLeft?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginRight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginStart?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginTop?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginVertical?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        maxHeight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        maxWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        minHeight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        minWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        overflow?: "visible" | "hidden" | "scroll" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        padding?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingBottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingEnd?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingHorizontal?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingLeft?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingRight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingStart?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingTop?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingVertical?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        position?: "absolute" | "relative" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        right?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        start?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        top?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        width?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        zIndex?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        direction?: "ltr" | "rtl" | "inherit" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowOffset?: import("react-native").Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        shadowOpacity?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        transform?: import("react-native").Animated.WithAnimatedArray<import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform> | undefined;
        transformMatrix?: import("react-native").Animated.WithAnimatedArray<number> | undefined;
        rotation?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        scaleX?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        scaleY?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        translateX?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        translateY?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
    } | {
        toString: ((radix?: number | undefined) => string) & (() => string);
        toFixed: (fractionDigits?: number | undefined) => string;
        toExponential: (fractionDigits?: number | undefined) => string;
        toPrecision: (precision?: number | undefined) => string;
        valueOf: (() => number) & (() => Object);
        toLocaleString: ((locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => string) & (() => string);
        __registeredStyleBrand: import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle>;
    } | {
        [x: number]: false | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle> | import("react-native").Animated.WithAnimatedArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined> | readonly (false | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        length: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation;
        toString: () => string;
        toLocaleString: () => string;
        pop: () => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        push: (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        concat: {
            (...items: ConcatArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
            (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | ConcatArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined> | null | undefined)[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        join: (separator?: string | undefined) => string;
        reverse: () => (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        shift: () => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        slice: (start?: number | undefined, end?: number | undefined) => (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        sort: (compareFn?: ((a: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, b: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined) => number) | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        splice: {
            (start: number, deleteCount?: number | undefined): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
            (start: number, deleteCount: number, ...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        unshift: (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        indexOf: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        lastIndexOf: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        every: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        some: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        forEach: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => void, thisArg?: any) => void;
        map: <U>(callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U, thisArg?: any) => U[];
        filter: {
            <S extends false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>(callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S, thisArg?: any): S[];
            (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        reduce: {
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_1, initialValue: U_1): U_1;
        };
        reduceRight: {
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_2, initialValue: U_2): U_2;
        };
        find: {
            <S_1 extends false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>(predicate: (this: void, value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S_1, thisArg?: any): S_1 | undefined;
            (predicate: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        };
        findIndex: (predicate: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => number;
        fill: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, start?: number | undefined, end?: number | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        copyWithin: (target: number, start: number, end?: number | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        entries: () => IterableIterator<[number, false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined]>;
        keys: () => IterableIterator<number>;
        values: () => IterableIterator<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>;
        includes: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => boolean;
        flatMap: <U_3, This = undefined>(callback: (this: This, value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[];
        flat: <A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[];
    } | null | undefined;
    onPress?: ((props: TouchableOpacityProps) => void) | undefined;
} & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & {
    /**
     * Text to show inside the button
     */
    label?: string | undefined;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string | undefined;
    /**
     * Icon image source or a callback function that returns a source
     */
    iconSource?: number | object | Function | undefined;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * whether the icon should flip horizontally on RTL locals
     */
    supportRTL?: boolean | undefined;
    /**
     * Color of the button background
     */
    backgroundColor?: string | undefined;
    /**
     * Color of the disabled button background
     */
    disabledBackgroundColor?: string | undefined;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize | undefined;
    /**
     * Custom border radius.
     */
    borderRadius?: number | undefined;
    /**
     * Actions handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean | undefined;
    /**
     * Button will have outline style
     */
    outline?: boolean | undefined;
    /**
     * The outline color
     */
    outlineColor?: string | undefined;
    /**
     * The outline width
     */
    outlineWidth?: number | undefined;
    /**
     * Button will look like a link
     */
    link?: boolean | undefined;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string | undefined;
    /**
     * Additional styles for label text
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | undefined;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean | undefined;
    /**
     * should the button be a round button
     */
    round?: boolean | undefined;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean | undefined;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean | undefined;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean | undefined;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: ((backgroundColor: string, props: any) => string) | undefined;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean | undefined;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: ButtonAnimationDirection | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}) | (Pick<import("react-native").TouchableOpacityProps, "testID" | "onLayout" | "hitSlop" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "activeOpacity" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset" | "touchSoundDisabled"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    customValue?: any;
    style?: false | {} | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | {
        backfaceVisibility?: "visible" | "hidden" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        backgroundColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomEndRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomLeftRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomRightRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomStartRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderBottomWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderEndColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderLeftColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderLeftWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRightColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderRightWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStartColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopEndRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopLeftRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopRightRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopStartRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderTopWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderWidth?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        opacity?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        testID?: string | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        elevation?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        alignSelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        aspectRatio?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderEndWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        borderStartWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        bottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        display?: "none" | "flex" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        end?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flex?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexBasis?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexGrow?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexShrink?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        height?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        left?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        margin?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginBottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginEnd?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginHorizontal?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginLeft?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginRight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginStart?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginTop?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        marginVertical?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        maxHeight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        maxWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        minHeight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        minWidth?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        overflow?: "visible" | "hidden" | "scroll" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        padding?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingBottom?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingEnd?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingHorizontal?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingLeft?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingRight?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingStart?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingTop?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        paddingVertical?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        position?: "absolute" | "relative" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        right?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        start?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        top?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        width?: string | number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        zIndex?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        direction?: "ltr" | "rtl" | "inherit" | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowColor?: string | typeof import("react-native").OpaqueColorValue | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowOffset?: import("react-native").Animated.WithAnimatedObject<{
            width: number;
            height: number;
        }> | undefined;
        shadowOpacity?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        shadowRadius?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        transform?: import("react-native").Animated.WithAnimatedArray<import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform> | undefined;
        transformMatrix?: import("react-native").Animated.WithAnimatedArray<number> | undefined;
        rotation?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        scaleX?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        scaleY?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        translateX?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
        translateY?: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | undefined;
    } | {
        toString: ((radix?: number | undefined) => string) & (() => string);
        toFixed: (fractionDigits?: number | undefined) => string;
        toExponential: (fractionDigits?: number | undefined) => string;
        toPrecision: (precision?: number | undefined) => string;
        valueOf: (() => number) & (() => Object);
        toLocaleString: ((locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => string) & (() => string);
        __registeredStyleBrand: import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle>;
    } | {
        [x: number]: false | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle> | import("react-native").Animated.WithAnimatedArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined> | readonly (false | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        length: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation;
        toString: () => string;
        toLocaleString: () => string;
        pop: () => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        push: (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        concat: {
            (...items: ConcatArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
            (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | ConcatArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined> | null | undefined)[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        join: (separator?: string | undefined) => string;
        reverse: () => (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        shift: () => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        slice: (start?: number | undefined, end?: number | undefined) => (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        sort: (compareFn?: ((a: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, b: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined) => number) | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        splice: {
            (start: number, deleteCount?: number | undefined): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
            (start: number, deleteCount: number, ...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        unshift: (...items: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        indexOf: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        lastIndexOf: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        every: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        some: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        forEach: (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => void, thisArg?: any) => void;
        map: <U>(callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U, thisArg?: any) => U[];
        filter: {
            <S extends false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>(callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S, thisArg?: any): S[];
            (callbackfn: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        reduce: {
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_1, initialValue: U_1): U_1;
        };
        reduceRight: {
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_2, initialValue: U_2): U_2;
        };
        find: {
            <S_1 extends false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>(predicate: (this: void, value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S_1, thisArg?: any): S_1 | undefined;
            (predicate: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined;
        };
        findIndex: (predicate: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => number;
        fill: (value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, start?: number | undefined, end?: number | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        copyWithin: (target: number, start: number, end?: number | undefined) => import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined>;
        entries: () => IterableIterator<[number, false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined]>;
        keys: () => IterableIterator<number>;
        values: () => IterableIterator<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined>;
        includes: (searchElement: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => boolean;
        flatMap: <U_3, This = undefined>(callback: (this: This, value: false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | readonly (false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined)[] | null | undefined)[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[];
        flat: <A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[];
    } | null | undefined;
    onPress?: ((props: TouchableOpacityProps) => void) | undefined;
} & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & {
    /**
     * Text to show inside the button
     */
    label?: string | undefined;
    /**
     * The Button text color (inherited from Text component)
     */
    color?: string | undefined;
    /**
     * Icon image source or a callback function that returns a source
     */
    iconSource?: number | object | Function | undefined;
    /**
     * Icon image style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Should the icon be right to the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * whether the icon should flip horizontally on RTL locals
     */
    supportRTL?: boolean | undefined;
    /**
     * Color of the button background
     */
    backgroundColor?: string | undefined;
    /**
     * Color of the disabled button background
     */
    disabledBackgroundColor?: string | undefined;
    /**
     * Size of the button [large, medium, small, xSmall]
     */
    size?: ButtonSize | undefined;
    /**
     * Custom border radius.
     */
    borderRadius?: number | undefined;
    /**
     * Actions handler
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Disable interactions for the component
     */
    disabled?: boolean | undefined;
    /**
     * Button will have outline style
     */
    outline?: boolean | undefined;
    /**
     * The outline color
     */
    outlineColor?: string | undefined;
    /**
     * The outline width
     */
    outlineWidth?: number | undefined;
    /**
     * Button will look like a link
     */
    link?: boolean | undefined;
    /**
     * label color for when it's displayed as link
     */
    linkColor?: string | undefined;
    /**
     * Additional styles for label text
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Props that will be passed to the button's Text label.
     */
    labelProps?: (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & import("../../commons/modifiers").CustomModifier & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & import("../../commons/modifiers").CustomModifier & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | (import("react-native").TextProps & Partial<Record<"text10" | "text20" | "text30" | "text40" | "text50" | "text60" | "text65" | "text70" | "text80" | "text90" | "text100" | "text10T" | "text10L" | "text10R" | "text10M" | "text10BO" | "text10H" | "text10BL" | "text20T" | "text20L" | "text20R" | "text20M" | "text20BO" | "text20H" | "text20BL" | "text30T" | "text30L" | "text30R" | "text30M" | "text30BO" | "text30H" | "text30BL" | "text40T" | "text40L" | "text40R" | "text40M" | "text40BO" | "text40H" | "text40BL" | "text50T" | "text50L" | "text50R" | "text50M" | "text50BO" | "text50H" | "text50BL" | "text60T" | "text60L" | "text60R" | "text60M" | "text60BO" | "text60H" | "text60BL" | "text65T" | "text65L" | "text65R" | "text65M" | "text65BO" | "text65H" | "text65BL" | "text70T" | "text70L" | "text70R" | "text70M" | "text70BO" | "text70H" | "text70BL" | "text80T" | "text80L" | "text80R" | "text80M" | "text80BO" | "text80H" | "text80BL" | "text90T" | "text90L" | "text90R" | "text90M" | "text90BO" | "text90H" | "text90BL" | "text100T" | "text100L" | "text100R" | "text100M" | "text100BO" | "text100H" | "text100BL", boolean>> & Partial<Record<"black" | "white" | "dark10" | "dark20" | "dark30" | "dark40" | "dark50" | "dark60" | "dark70" | "dark80" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "blue10" | "blue20" | "blue30" | "blue40" | "blue50" | "blue60" | "blue70" | "blue80" | "cyan10" | "cyan20" | "cyan30" | "cyan40" | "cyan50" | "cyan60" | "cyan70" | "cyan80" | "green10" | "green20" | "green30" | "green40" | "green50" | "green60" | "green70" | "green80" | "yellow10" | "yellow20" | "yellow30" | "yellow40" | "yellow50" | "yellow60" | "yellow70" | "yellow80" | "orange10" | "orange20" | "orange30" | "orange40" | "orange50" | "orange60" | "orange70" | "orange80" | "red10" | "red20" | "red30" | "red40" | "red50" | "red60" | "red70" | "red80" | "purple10" | "purple20" | "purple30" | "purple40" | "purple50" | "purple60" | "purple70" | "purple80" | "violet10" | "violet20" | "violet30" | "violet40" | "violet50" | "violet60" | "violet70" | "violet80", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
        color?: string | undefined;
        center?: boolean | undefined;
        uppercase?: boolean | undefined;
        highlightString?: string | undefined;
        highlightStyle?: TextStyle | undefined;
        animated?: boolean | undefined;
        textAlign?: string | undefined;
    }) | undefined;
    /**
     * should the button act as a coast to coast button (no border radius)
     */
    fullWidth?: boolean | undefined;
    /**
     * should the button be a round button
     */
    round?: boolean | undefined;
    /**
     * Control shadow visibility (iOS-only)
     */
    enableShadow?: boolean | undefined;
    /**
     * avoid inner button padding
     */
    avoidInnerPadding?: boolean | undefined;
    /**
     * avoid minimum width constraints
     */
    avoidMinWidth?: boolean | undefined;
    /**
     * callback for getting activeBackgroundColor (e.g. (calculatedBackgroundColor, prop) => {...})
     * better set using ThemeManager
     */
    getActiveBackgroundColor?: ((backgroundColor: string, props: any) => string) | undefined;
    /**
     * should animate layout change
     * Note?: For Android you must set 'setLayoutAnimationEnabledExperimental(true)' via RN's 'UIManager'
     */
    animateLayout?: boolean | undefined;
    /**
     * the direction of the animation ('left' and 'right' will effect the button's own alignment)
     */
    animateTo?: ButtonAnimationDirection | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}), any> & typeof Button;
export default _default;
