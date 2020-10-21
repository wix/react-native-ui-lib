import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import { ViewPropTypes } from '../view';
import { TouchableOpacityProps } from '../touchableOpacity';
import CardImage from './CardImage';
import CardSection, { CardSectionProps } from './CardSection';
export { CardSectionProps };
export declare type CardPropTypes = ViewPropTypes & TouchableOpacityProps & {
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
declare const _default: React.ComponentClass<ViewPropTypes & Pick<import("react-native").TouchableOpacityProps, "testID" | "disabled" | "hitSlop" | "onLayout" | "hasTVPreferredFocus" | "tvParallaxProperties" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityStates" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "activeOpacity" | "onPress" | "onLongPress" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "onBlur" | "onFocus" | "onPressIn" | "onPressOut" | "pressRetentionOffset"> & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
    backgroundColor?: string | undefined;
    throttleTime?: number | undefined;
    throttleOptions?: {
        leading: boolean;
        trailing: boolean;
    } | undefined;
    activeBackgroundColor?: string | undefined;
    useNative?: boolean | undefined;
    customValue?: any;
    ref?: any;
    style?: false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | Animated.AnimatedProps<ViewStyle> | Animated.AnimatedProps<import("react-native").RegisteredStyle<ViewStyle>> | Animated.AnimatedProps<import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined>> | null | undefined;
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
