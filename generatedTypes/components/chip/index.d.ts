import React from 'react';
import { StyleProp, ViewStyle, ViewProps, ImageStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { AvatarProps } from '../avatar';
import { BadgeProps } from '../badge';
import { ImageProps } from '../image';
import { TouchableOpacityProps } from '../touchableOpacity';
export declare type ChipProps = ViewProps & TouchableOpacityProps & {
    /**
     * Chip's size. Number or a width and height object.
     */
    size?: number | {
        width: number;
        height: number;
    };
    /**
     * On Chip press callback
     */
    onPress?: (props: any) => void;
    /**
     * Chip's background color
     */
    backgroundColor?: string;
    /**
     * The Chip borderRadius
     */
    borderRadius?: number;
    /**
     * Chip's container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Uses size as minWidth and minHeight - default is true
     */
    useSizeAsMinimum?: boolean;
    /**
     * Disables all internal elements default spacings. Helps reach a custom design
     */
    resetSpacings?: boolean;
    /**
   * Used as testing identifier
   */
    testID?: string;
    /**
     * Main Chip text
     */
    label?: string;
    /**
     * Label's style
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Badge props object
     */
    badgeProps?: BadgeProps;
    /**
     * Avatar props object
     */
    avatarProps?: AvatarProps;
    /**
     * Additional icon props
     */
    iconProps?: Omit<ImageProps, 'source'>;
    /**
     * Icon style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Left icon's source
     */
    iconSource?: ImageSourcePropType;
    /**
     * Right icon's source
     */
    rightIconSource?: ImageSourcePropType;
    /**
     * Adds a dismiss button and serves as its callback
     */
    onDismiss?: (props: any) => void;
    /**
     * Dismiss color
     */
    dismissColor?: string;
    /**
     * Dismiss asset
     */
    dismissIcon?: ImageSourcePropType;
    /**
     * Dismiss style
     */
    dismissIconStyle?: StyleProp<ImageStyle>;
    /**
     * Dismiss container style
     */
    dismissContainerStyle?: StyleProp<ImageStyle>;
};
export declare type ChipPropTypes = ChipProps;
declare const _default: React.ComponentClass<ViewProps & Pick<import("react-native").TouchableOpacityProps, "testID" | "onLayout" | "hitSlop" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "activeOpacity" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset" | "touchSoundDisabled"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    customValue?: any;
    style?: false | {} | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | {
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
        __registeredStyleBrand: import("react-native").Animated.WithAnimatedObject<ViewStyle>;
    } | {
        [x: number]: false | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<ViewStyle> | import("react-native").Animated.WithAnimatedArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined> | readonly (false | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation | import("react-native").Animated.WithAnimatedObject<ViewStyle> | null | undefined)[] | null | undefined;
        length: number | import("react-native").Animated.Value | import("react-native").Animated.AnimatedInterpolation;
        toString: () => string;
        toLocaleString: () => string;
        pop: () => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
        push: (...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        concat: {
            (...items: ConcatArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
            (...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | ConcatArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined> | null | undefined)[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        join: (separator?: string | undefined) => string;
        reverse: () => (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        shift: () => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
        slice: (start?: number | undefined, end?: number | undefined) => (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        sort: (compareFn?: ((a: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, b: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined) => number) | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>;
        splice: {
            (start: number, deleteCount?: number | undefined): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
            (start: number, deleteCount: number, ...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        unshift: (...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => number;
        indexOf: (searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        lastIndexOf: (searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number;
        every: (callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        some: (callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean;
        forEach: (callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => void, thisArg?: any) => void;
        map: <U>(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U, thisArg?: any) => U[];
        filter: {
            <S extends false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S, thisArg?: any): S[];
            (callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        };
        reduce: {
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_1, initialValue: U_1): U_1;
        };
        reduceRight: {
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_2, initialValue: U_2): U_2;
        };
        find: {
            <S_1 extends false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>(predicate: (this: void, value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S_1, thisArg?: any): S_1 | undefined;
            (predicate: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
        };
        findIndex: (predicate: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => number;
        fill: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, start?: number | undefined, end?: number | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>;
        copyWithin: (target: number, start: number, end?: number | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>;
        entries: () => IterableIterator<[number, false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined]>;
        keys: () => IterableIterator<number>;
        values: () => IterableIterator<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>;
        includes: (searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => boolean;
        flatMap: <U_3, This = undefined>(callback: (this: This, value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[];
        flat: <A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[];
    } | null | undefined;
    onPress?: ((props: TouchableOpacityProps) => void) | undefined;
} & {
    /**
     * Chip's size. Number or a width and height object.
     */
    size?: number | {
        width: number;
        height: number;
    } | undefined;
    /**
     * On Chip press callback
     */
    onPress?: ((props: any) => void) | undefined;
    /**
     * Chip's background color
     */
    backgroundColor?: string | undefined;
    /**
     * The Chip borderRadius
     */
    borderRadius?: number | undefined;
    /**
     * Chip's container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Uses size as minWidth and minHeight - default is true
     */
    useSizeAsMinimum?: boolean | undefined;
    /**
     * Disables all internal elements default spacings. Helps reach a custom design
     */
    resetSpacings?: boolean | undefined;
    /**
   * Used as testing identifier
   */
    testID?: string | undefined;
    /**
     * Main Chip text
     */
    label?: string | undefined;
    /**
     * Label's style
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Badge props object
     */
    badgeProps?: BadgeProps | undefined;
    /**
     * Avatar props object
     */
    avatarProps?: AvatarProps | undefined;
    /**
     * Additional icon props
     */
    iconProps?: Pick<ImageProps, "margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV" | "style" | "testID" | "onLayout" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "width" | "height" | "borderRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "aspectRatio" | "onError" | "onLoad" | "onLoadEnd" | "onLoadStart" | "progressiveRenderingEnabled" | "resizeMode" | "resizeMethod" | "loadingIndicatorSource" | "defaultSource" | "blurRadius" | "capInsets" | "onProgress" | "onPartialLoad" | "fadeDuration" | "cover" | "sourceTransformer" | "assetName" | "assetGroup" | "tintColor" | "supportRTL" | "overlayType" | "overlayColor" | "customOverlayContent" | "errorSource"> | undefined;
    /**
     * Icon style
     */
    iconStyle?: StyleProp<ImageStyle>;
    /**
     * Left icon's source
     */
    iconSource?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Right icon's source
     */
    rightIconSource?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Adds a dismiss button and serves as its callback
     */
    onDismiss?: ((props: any) => void) | undefined;
    /**
     * Dismiss color
     */
    dismissColor?: string | undefined;
    /**
     * Dismiss asset
     */
    dismissIcon?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Dismiss style
     */
    dismissIconStyle?: StyleProp<ImageStyle>;
    /**
     * Dismiss container style
     */
    dismissContainerStyle?: StyleProp<ImageStyle>;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
