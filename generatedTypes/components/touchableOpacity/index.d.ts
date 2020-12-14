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
declare const _default: React.ComponentClass<Pick<RNTouchableOpacityProps, "testID" | "onLayout" | "hitSlop" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityStates" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "activeOpacity" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", number>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
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
    style?: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | Animated.AnimatedProps<ViewStyle> | Animated.AnimatedProps<import("react-native").RegisteredStyle<ViewStyle>> | Animated.AnimatedProps<import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>> | null | undefined;
    onPress?: ((props: TouchableOpacityProps) => void) | undefined;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
