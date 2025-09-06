import React from 'react';
import { View as RNView, Animated, ViewProps as RNViewProps, type StyleProp, type ViewStyle, type DimensionValue } from 'react-native';
import type { AnimateProps as RNReanimatedProps } from 'react-native-reanimated';
import { ContainerModifiers } from '../../commons/new';
import type { RecorderProps } from '../../typings/recorderTypes';
/**
 * Extra props when using reanimated (only non experimental props)
 */
type ReanimatedProps = Partial<Pick<RNReanimatedProps<object>, 'entering' | 'exiting' | 'layout'>>;
export interface ViewProps extends Omit<RNViewProps, 'style'>, ReanimatedProps, ContainerModifiers, RecorderProps {
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
     * TODO: probably isn't needed
     */
    width?: DimensionValue;
    /**
     * TODO: probably isn't needed
     */
    height?: DimensionValue;
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
declare const _default: React.ForwardRefExoticComponent<ViewProps & React.RefAttributes<RNView>>;
export default _default;
