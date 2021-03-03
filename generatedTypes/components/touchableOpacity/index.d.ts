import React from 'react';
import { TouchableOpacityProps as RNTouchableOpacityProps, StyleProp, ViewStyle, Animated } from 'react-native';
import { ContainerModifiers } from '../../commons/new';
export interface TouchableOpacityProps extends Omit<RNTouchableOpacityProps, 'style' | 'onPress'>, ContainerModifiers {
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
}
declare const _default: React.ComponentClass<TouchableOpacityProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
