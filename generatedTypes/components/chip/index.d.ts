import React from 'react';
import { StyleProp, ViewStyle, ViewProps, ImageStyle, ImageProps, TextStyle, ImageSourcePropType } from 'react-native';
import { AvatarProps } from '../avatar';
import { BadgeProps } from '../badge';
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
    iconProps?: ImageProps;
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
    style?: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | {
        backfaceVisibility?: import("react-native").Animated.WithAnimatedValue<"visible" | "hidden" | undefined> | undefined;
        backgroundColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderBottomColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderBottomEndRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderBottomLeftRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderBottomRightRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderBottomStartRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderBottomWidth?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderEndColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderLeftColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderLeftWidth?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderRightColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderRightWidth?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderStartColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderStyle?: import("react-native").Animated.WithAnimatedValue<"solid" | "dotted" | "dashed" | undefined> | undefined;
        borderTopColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderTopEndRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderTopLeftRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderTopRightRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderTopStartRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderTopWidth?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderWidth?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        opacity?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        testID?: import("react-native").Animated.WithAnimatedValue<string | undefined> | undefined;
        elevation?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        alignContent?: import("react-native").Animated.WithAnimatedValue<"center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | undefined> | undefined;
        alignItems?: import("react-native").Animated.WithAnimatedValue<"center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined> | undefined;
        alignSelf?: import("react-native").Animated.WithAnimatedValue<"auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined> | undefined;
        aspectRatio?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        borderEndWidth?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        borderStartWidth?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        bottom?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        display?: import("react-native").Animated.WithAnimatedValue<"none" | "flex" | undefined> | undefined;
        end?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        flex?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        flexBasis?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        flexDirection?: import("react-native").Animated.WithAnimatedValue<"row" | "column" | "row-reverse" | "column-reverse" | undefined> | undefined;
        flexGrow?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        flexShrink?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        flexWrap?: import("react-native").Animated.WithAnimatedValue<"wrap" | "nowrap" | "wrap-reverse" | undefined> | undefined;
        height?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        justifyContent?: import("react-native").Animated.WithAnimatedValue<"center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined> | undefined;
        left?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        margin?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginBottom?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginEnd?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginHorizontal?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginLeft?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginRight?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginStart?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginTop?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginVertical?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        maxHeight?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        maxWidth?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        minHeight?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        minWidth?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        overflow?: import("react-native").Animated.WithAnimatedValue<"visible" | "hidden" | "scroll" | undefined> | undefined;
        padding?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingBottom?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingEnd?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingHorizontal?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingLeft?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingRight?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingStart?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingTop?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingVertical?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        position?: import("react-native").Animated.WithAnimatedValue<"absolute" | "relative" | undefined> | undefined;
        right?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        start?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        top?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        width?: import("react-native").Animated.WithAnimatedValue<string | number | undefined> | undefined;
        zIndex?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        direction?: import("react-native").Animated.WithAnimatedValue<"ltr" | "rtl" | "inherit" | undefined> | undefined;
        shadowColor?: import("react-native").Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        shadowOffset?: import("react-native").Animated.WithAnimatedValue<{
            width: number;
            height: number;
        } | undefined> | undefined;
        shadowOpacity?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        shadowRadius?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        transform?: import("react-native").Animated.WithAnimatedValue<(import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform)[] | undefined> | undefined;
        transformMatrix?: import("react-native").Animated.WithAnimatedValue<number[] | undefined> | undefined;
        rotation?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        scaleX?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        scaleY?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        translateX?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
        translateY?: import("react-native").Animated.WithAnimatedValue<number | undefined> | undefined;
    } | {
        toString: import("react-native").Animated.WithAnimatedValue<((radix?: number | undefined) => string) & (() => string)>;
        toFixed: import("react-native").Animated.WithAnimatedValue<(fractionDigits?: number | undefined) => string>;
        toExponential: import("react-native").Animated.WithAnimatedValue<(fractionDigits?: number | undefined) => string>;
        toPrecision: import("react-native").Animated.WithAnimatedValue<(precision?: number | undefined) => string>;
        valueOf: import("react-native").Animated.WithAnimatedValue<(() => number) & (() => Object)>;
        toLocaleString: import("react-native").Animated.WithAnimatedValue<((locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => string) & (() => string)>;
        __registeredStyleBrand: import("react-native").Animated.WithAnimatedValue<ViewStyle>;
    } | {
        [x: number]: import("react-native").Animated.WithAnimatedValue<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>;
        length: import("react-native").Animated.WithAnimatedValue<number>;
        toString: import("react-native").Animated.WithAnimatedValue<() => string>;
        toLocaleString: import("react-native").Animated.WithAnimatedValue<() => string>;
        pop: import("react-native").Animated.WithAnimatedValue<() => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>;
        push: import("react-native").Animated.WithAnimatedValue<(...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => number>;
        concat: import("react-native").Animated.WithAnimatedValue<{
            (...items: ConcatArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
            (...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | ConcatArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined> | null | undefined)[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        }>;
        join: import("react-native").Animated.WithAnimatedValue<(separator?: string | undefined) => string>;
        reverse: import("react-native").Animated.WithAnimatedValue<() => (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]>;
        shift: import("react-native").Animated.WithAnimatedValue<() => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>;
        slice: import("react-native").Animated.WithAnimatedValue<(start?: number | undefined, end?: number | undefined) => (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]>;
        sort: import("react-native").Animated.WithAnimatedValue<(compareFn?: ((a: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, b: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined) => number) | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>>;
        splice: import("react-native").Animated.WithAnimatedValue<{
            (start: number, deleteCount?: number | undefined): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
            (start: number, deleteCount: number, ...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        }>;
        unshift: import("react-native").Animated.WithAnimatedValue<(...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => number>;
        indexOf: import("react-native").Animated.WithAnimatedValue<(searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number>;
        lastIndexOf: import("react-native").Animated.WithAnimatedValue<(searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number>;
        every: import("react-native").Animated.WithAnimatedValue<(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean>;
        some: import("react-native").Animated.WithAnimatedValue<(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean>;
        forEach: import("react-native").Animated.WithAnimatedValue<(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => void, thisArg?: any) => void>;
        map: import("react-native").Animated.WithAnimatedValue<(<U>(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U, thisArg?: any) => U[])>;
        filter: import("react-native").Animated.WithAnimatedValue<{
            <S extends false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S, thisArg?: any): S[];
            (callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        }>;
        reduce: import("react-native").Animated.WithAnimatedValue<{
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_1, initialValue: U_1): U_1;
        }>;
        reduceRight: import("react-native").Animated.WithAnimatedValue<{
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_2, initialValue: U_2): U_2;
        }>;
        find: import("react-native").Animated.WithAnimatedValue<{
            <S_1 extends false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>(predicate: (this: void, value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S_1, thisArg?: any): S_1 | undefined;
            (predicate: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
        }>;
        findIndex: import("react-native").Animated.WithAnimatedValue<(predicate: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => number>;
        fill: import("react-native").Animated.WithAnimatedValue<(value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, start?: number | undefined, end?: number | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>>;
        copyWithin: import("react-native").Animated.WithAnimatedValue<(target: number, start: number, end?: number | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>>;
        entries: import("react-native").Animated.WithAnimatedValue<() => IterableIterator<[number, false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined]>>;
        keys: import("react-native").Animated.WithAnimatedValue<() => IterableIterator<number>>;
        values: import("react-native").Animated.WithAnimatedValue<() => IterableIterator<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>>;
        includes: import("react-native").Animated.WithAnimatedValue<(searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => boolean>;
        flatMap: import("react-native").Animated.WithAnimatedValue<(<U_3, This = undefined>(callback: (this: This, value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[])>;
        flat: import("react-native").Animated.WithAnimatedValue<(<A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[])>;
    } | (false & {}) | null | undefined;
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
    iconProps?: ImageProps | undefined;
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
