import React from 'react';
import { TouchableOpacityProps as RNTouchableOpacityProps } from 'react-native';
import { ContainerModifiers } from '../../commons/new';
export declare type TouchableOpacityProps = RNTouchableOpacityProps & ContainerModifiers & {
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
    ref?: any;
};
declare const _default: React.ComponentClass<RNTouchableOpacityProps & Partial<Record<import("../../commons/modifiers").AlignmentLiterals, boolean>> & Partial<Record<import("../../commons/modifiers").PositionLiterals, boolean>> & Partial<Record<"padding" | "paddingL" | "paddingT" | "paddingR" | "paddingB" | "paddingH" | "paddingV", boolean>> & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & Partial<Record<"flex" | "flexG" | "flexS", boolean>> & Partial<Record<"br0" | "br10" | "br20" | "br30" | "br40" | "br50" | "br60" | "br100", boolean>> & Partial<Record<"bg", boolean>> & {
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
    ref?: any;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
