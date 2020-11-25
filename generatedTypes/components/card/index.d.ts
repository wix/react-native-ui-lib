import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import { ViewProps } from '../view';
import { TouchableOpacityProps } from '../touchableOpacity';
import CardImage from './CardImage';
import CardSection, { CardSectionProps } from './CardSection';
export { CardSectionProps };
export declare type CardProps = ViewProps & TouchableOpacityProps & {
    /**
     * card custom width
     */
    width?: number | string;
    /**
     * card custom height
     */
    height?: number | string;
    /**
     * should inner card flow direction be horizontal
     */
    row?: boolean;
    /**
     * card border radius (will be passed to inner Card.Image component)
     */
    borderRadius?: number;
    /**
     * action for when pressing the card
     */
    onPress?: () => void;
    /**
     * whether the card should have shadow or not
     */
    enableShadow?: boolean;
    /**
     * elevation value (Android only)
     */
    elevation?: number;
    /**
     * enable blur effect (iOS only)
     */
    enableBlur?: boolean;
    /**
     * blur option for blur effect according to @react-native-community/blur lib (make sure enableBlur is on)
     */
    blurOptions?: object;
    /**
     * Additional styles for the top container
     */
    containerStyle?: ViewStyle;
    /**
     * Adds visual indication that the card is selected
     */
    selected?: boolean;
    /**
     * Custom options for styling the selection indication
     */
    selectionOptions?: {
        icon?: number;
        iconColor?: string;
        color?: string;
        borderWidth?: number;
        indicatorSize?: number;
        hideIndicator?: boolean;
    };
};
export declare type CardPropTypes = CardProps;
declare const _default: React.ComponentClass<ViewProps & Pick<import("react-native").TouchableOpacityProps, "testID" | "onLayout" | "hitSlop" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "activeOpacity" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset" | "touchSoundDisabled"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    customValue?: any; /**
     * card custom height
     */
    style?: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | {
        backfaceVisibility?: Animated.WithAnimatedValue<"visible" | "hidden" | undefined> | undefined;
        backgroundColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderBottomColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderBottomEndRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderBottomLeftRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderBottomRightRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderBottomStartRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderBottomWidth?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderEndColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderLeftColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderLeftWidth?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderRightColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderRightWidth?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderStartColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderStyle?: Animated.WithAnimatedValue<"solid" | "dotted" | "dashed" | undefined> | undefined;
        borderTopColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        borderTopEndRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderTopLeftRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderTopRightRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderTopStartRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderTopWidth?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderWidth?: Animated.WithAnimatedValue<number | undefined> | undefined;
        opacity?: Animated.WithAnimatedValue<number | undefined> | undefined;
        testID?: Animated.WithAnimatedValue<string | undefined> | undefined;
        elevation?: Animated.WithAnimatedValue<number | undefined> | undefined;
        alignContent?: Animated.WithAnimatedValue<"center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | undefined> | undefined;
        alignItems?: Animated.WithAnimatedValue<"center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined> | undefined;
        alignSelf?: Animated.WithAnimatedValue<"auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined> | undefined;
        aspectRatio?: Animated.WithAnimatedValue<number | undefined> | undefined;
        borderEndWidth?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        borderStartWidth?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        bottom?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        display?: Animated.WithAnimatedValue<"none" | "flex" | undefined> | undefined;
        end?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        flex?: Animated.WithAnimatedValue<number | undefined> | undefined;
        flexBasis?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        flexDirection?: Animated.WithAnimatedValue<"row" | "column" | "row-reverse" | "column-reverse" | undefined> | undefined;
        flexGrow?: Animated.WithAnimatedValue<number | undefined> | undefined;
        flexShrink?: Animated.WithAnimatedValue<number | undefined> | undefined;
        flexWrap?: Animated.WithAnimatedValue<"wrap" | "nowrap" | "wrap-reverse" | undefined> | undefined;
        height?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        justifyContent?: Animated.WithAnimatedValue<"center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined> | undefined;
        left?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        margin?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginBottom?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginEnd?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginHorizontal?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginLeft?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginRight?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginStart?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginTop?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        marginVertical?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        maxHeight?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        maxWidth?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        minHeight?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        minWidth?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        overflow?: Animated.WithAnimatedValue<"visible" | "hidden" | "scroll" | undefined> | undefined;
        padding?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingBottom?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingEnd?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingHorizontal?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingLeft?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingRight?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingStart?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingTop?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        paddingVertical?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        position?: Animated.WithAnimatedValue<"absolute" | "relative" | undefined> | undefined;
        right?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        start?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        top?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        width?: Animated.WithAnimatedValue<string | number | undefined> | undefined;
        zIndex?: Animated.WithAnimatedValue<number | undefined> | undefined;
        direction?: Animated.WithAnimatedValue<"ltr" | "rtl" | "inherit" | undefined> | undefined;
        shadowColor?: Animated.WithAnimatedValue<string | typeof import("react-native").OpaqueColorValue | undefined> | undefined;
        shadowOffset?: Animated.WithAnimatedValue<{
            width: number;
            height: number;
        } | undefined> | undefined;
        shadowOpacity?: Animated.WithAnimatedValue<number | undefined> | undefined;
        shadowRadius?: Animated.WithAnimatedValue<number | undefined> | undefined;
        transform?: Animated.WithAnimatedValue<(import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform)[] | undefined> | undefined;
        transformMatrix?: Animated.WithAnimatedValue<number[] | undefined> | undefined;
        rotation?: Animated.WithAnimatedValue<number | undefined> | undefined;
        scaleX?: Animated.WithAnimatedValue<number | undefined> | undefined;
        scaleY?: Animated.WithAnimatedValue<number | undefined> | undefined;
        translateX?: Animated.WithAnimatedValue<number | undefined> | undefined;
        translateY?: Animated.WithAnimatedValue<number | undefined> | undefined;
    } | {
        toString: Animated.WithAnimatedValue<((radix?: number | undefined) => string) & (() => string)>;
        toFixed: Animated.WithAnimatedValue<(fractionDigits?: number | undefined) => string>;
        toExponential: Animated.WithAnimatedValue<(fractionDigits?: number | undefined) => string>;
        toPrecision: Animated.WithAnimatedValue<(precision?: number | undefined) => string>;
        valueOf: Animated.WithAnimatedValue<(() => number) & (() => Object)>;
        toLocaleString: Animated.WithAnimatedValue<((locales?: string | string[] | undefined, options?: Intl.NumberFormatOptions | undefined) => string) & (() => string)>;
        __registeredStyleBrand: Animated.WithAnimatedValue<ViewStyle>;
    } | {
        [x: number]: Animated.WithAnimatedValue<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>;
        length: Animated.WithAnimatedValue<number>;
        toString: Animated.WithAnimatedValue<() => string>;
        toLocaleString: Animated.WithAnimatedValue<() => string>;
        pop: Animated.WithAnimatedValue<() => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>;
        push: Animated.WithAnimatedValue<(...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => number>;
        concat: Animated.WithAnimatedValue<{
            (...items: ConcatArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
            (...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | ConcatArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined> | null | undefined)[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        }>;
        join: Animated.WithAnimatedValue<(separator?: string | undefined) => string>;
        reverse: Animated.WithAnimatedValue<() => (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]>;
        shift: Animated.WithAnimatedValue<() => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>;
        slice: Animated.WithAnimatedValue<(start?: number | undefined, end?: number | undefined) => (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]>;
        sort: Animated.WithAnimatedValue<(compareFn?: ((a: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, b: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined) => number) | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>>;
        splice: Animated.WithAnimatedValue<{
            (start: number, deleteCount?: number | undefined): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
            (start: number, deleteCount: number, ...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        }>;
        unshift: Animated.WithAnimatedValue<(...items: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => number>;
        indexOf: Animated.WithAnimatedValue<(searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number>;
        lastIndexOf: Animated.WithAnimatedValue<(searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => number>;
        every: Animated.WithAnimatedValue<(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean>;
        some: Animated.WithAnimatedValue<(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => boolean>;
        forEach: Animated.WithAnimatedValue<(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => void, thisArg?: any) => void>;
        map: Animated.WithAnimatedValue<(<U>(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U, thisArg?: any) => U[])>;
        filter: Animated.WithAnimatedValue<{
            <S extends false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>(callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S, thisArg?: any): S[];
            (callbackfn: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[];
        }>;
        reduce: Animated.WithAnimatedValue<{
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_1, initialValue: U_1): U_1;
        }>;
        reduceRight: Animated.WithAnimatedValue<{
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            (callbackfn: (previousValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, initialValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, currentIndex: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_2, initialValue: U_2): U_2;
        }>;
        find: Animated.WithAnimatedValue<{
            <S_1 extends false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>(predicate: (this: void, value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => value is S_1, thisArg?: any): S_1 | undefined;
            (predicate: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any): false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined;
        }>;
        findIndex: Animated.WithAnimatedValue<(predicate: (value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, obj: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => unknown, thisArg?: any) => number>;
        fill: Animated.WithAnimatedValue<(value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, start?: number | undefined, end?: number | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>>;
        copyWithin: Animated.WithAnimatedValue<(target: number, start: number, end?: number | undefined) => import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>>;
        entries: Animated.WithAnimatedValue<() => IterableIterator<[number, false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined]>>;
        keys: Animated.WithAnimatedValue<() => IterableIterator<number>>;
        values: Animated.WithAnimatedValue<() => IterableIterator<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined>>;
        includes: Animated.WithAnimatedValue<(searchElement: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, fromIndex?: number | undefined) => boolean>;
        flatMap: Animated.WithAnimatedValue<(<U_3, This = undefined>(callback: (this: This, value: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined, index: number, array: (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | readonly (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined)[] | null | undefined)[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[])>;
        flat: Animated.WithAnimatedValue<(<A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[])>;
    } | (false & {}) | null | undefined;
    onPress?: ((props: TouchableOpacityProps) => void) | undefined;
} & {
    /**
     * card custom width
     */
    width?: string | number | undefined;
    /**
     * card custom height
     */
    height?: string | number | undefined;
    /**
     * should inner card flow direction be horizontal
     */
    row?: boolean | undefined;
    /**
     * card border radius (will be passed to inner Card.Image component)
     */
    borderRadius?: number | undefined;
    /**
     * action for when pressing the card
     */
    onPress?: (() => void) | undefined;
    /**
     * whether the card should have shadow or not
     */
    enableShadow?: boolean | undefined;
    /**
     * elevation value (Android only)
     */
    elevation?: number | undefined;
    /**
     * enable blur effect (iOS only)
     */
    enableBlur?: boolean | undefined;
    /**
     * blur option for blur effect according to @react-native-community/blur lib (make sure enableBlur is on)
     */
    blurOptions?: object | undefined;
    /**
     * Additional styles for the top container
     */
    containerStyle?: ViewStyle | undefined;
    /**
     * Adds visual indication that the card is selected
     */
    selected?: boolean | undefined;
    /**
     * Custom options for styling the selection indication
     */
    selectionOptions?: {
        icon?: number | undefined;
        iconColor?: string | undefined;
        color?: string | undefined;
        borderWidth?: number | undefined;
        indicatorSize?: number | undefined;
        hideIndicator?: boolean | undefined;
    } | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any> & {
    Image: typeof CardImage;
    Section: typeof CardSection;
};
export default _default;
