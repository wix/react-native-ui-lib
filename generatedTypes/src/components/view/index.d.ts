import React from 'react';
import { Animated, ViewProps as RNViewProps, StyleProp, ViewStyle } from 'react-native';
import { ContainerModifiers } from '../../commons/new';
export interface ViewProps extends Omit<RNViewProps, 'style'>, ContainerModifiers {
    /**
     * If true, will render as SafeAreaView
     */
    useSafeArea?: boolean;
    /**
     * Use Animate.View as a container
     */
    animated?: boolean;
    /**
      * Use Animate.View (from react-native-reanimated) as a container
     */
    reanimated?: boolean;
    /**
     * Turn off accessibility for this view and its nested children
     */
    inaccessible?: boolean;
    /**
     * TODO: probobly isn't needed
     */
    width?: string | number;
    /**
     * TODO: probobly isn't needed
     */
    height?: string | number;
    /**
     * Experimental: Pass time in ms to delay render
     */
    renderDelay?: number;
    /**
     * Set background color
     */
    backgroundColor?: string;
    style?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
}
declare const _default: React.ComponentClass<ViewProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
