import React from 'react';
import { TouchableOpacityProps as RNTouchableOpacityProps, StyleProp, ViewStyle, Animated } from 'react-native';
import { ContainerModifiers } from '../../commons/new';
export declare type TouchableOpacityProps = Omit<RNTouchableOpacityProps, 'style' | 'onPress'> & ContainerModifiers & {
    /**
     * background color for TouchableOpacity
     */
    backgroundColor?: string;
    /**
     * throttle time in MS for onPress callback
     */
    throttleTime?: number;
    /**
     * throttle options {leading, trailing}
     */
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    };
    /**
     * Apply background color on TouchableOpacity when active (press is on)
     */
    activeBackgroundColor?: string;
    /**
     * Should use a more native touchable opacity component
     */
    useNative?: boolean;
    /**
     * Custom value of any type to pass on to TouchableOpacity and receive back in onPress callback
     */
    customValue?: any;
    style?: StyleProp<ViewStyle> | Animated.AnimatedProps<StyleProp<ViewStyle>>;
    onPress?: (props: TouchableOpacityProps) => void;
};
declare const _default: React.ComponentClass<Pick<RNTouchableOpacityProps, "testID" | "onLayout" | "hitSlop" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "activeOpacity" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset" | "touchSoundDisabled"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    /**
     * background color for TouchableOpacity
     */
    backgroundColor?: string | undefined;
    /**
     * throttle time in MS for onPress callback
     */
    throttleTime?: number | undefined;
    /**
     * throttle options {leading, trailing}
     */
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    /**
     * Apply background color on TouchableOpacity when active (press is on)
     */
    activeBackgroundColor?: string | undefined;
    /**
     * Should use a more native touchable opacity component
     */
    useNative?: boolean | undefined;
    /**
     * Custom value of any type to pass on to TouchableOpacity and receive back in onPress callback
     */
    customValue?: any;
    style?: false | {} | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | {
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
        testID?: string | Animated.Value | Animated.AnimatedInterpolation | undefined;
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
    } | {
        toString: ((radix?: number | undefined) => string) & (() => string);
        toFixed: (fractionDigits?: number | undefined) => string;
        toExponential: (fractionDigits?: number | undefined) => string;
        toPrecision: (precision?: number | undefined) => string;
        valueOf: (() => number) & (() => Object);
        toLocaleString: ((locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => string) & (() => string);
        __registeredStyleBrand: Animated.WithAnimatedObject<ViewStyle>;
    } | {
        [x: number]: false | import("react-native").RegisteredStyle<ViewStyle> | Animated.Value | Animated.AnimatedInterpolation | Animated.WithAnimatedObject<ViewStyle> | Animated.WithAnimatedArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined> | readonly (false | import("react-native").RegisteredStyle<ViewStyle> | Animated.Value | Animated.AnimatedInterpolation | Animated.WithAnimatedObject<ViewStyle> | null | undefined)[] | null | undefined;
        length: number | Animated.Value | Animated.AnimatedInterpolation;
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
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
