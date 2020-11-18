import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PanningDirections, PanningProviderDirection, PanAmountsProps } from './panningProvider';
export interface DismissibleAnimationProps {
    /**
     * The return animation speed (default is 20)
     */
    speed?: number;
    /**
     * The return animation bounciness (default is 6)
     */
    bounciness?: number;
    /**
     * The dismiss animation duration (default is 280)
     */
    duration?: number;
}
export declare type DismissibleAnimationPropTypes = DismissibleAnimationProps;
export interface PanDismissibleViewProps {
    /**
     * Additional styling
     */
    style?: StyleProp<ViewStyle>;
    /**
     * The directions of the allowed pan (default allows all directions)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    directions?: PanningDirections[] | PanningProviderDirection[];
    /**
     * onDismiss callback
     */
    onDismiss?: () => void;
    /**
     * Some animation options to choose from, defaults are set for:
     * speed - the animation speed (default is 20)
     * bounciness - the animation bounciness (default is 6)
     * duration - the dismiss animation duration (default is 280)
     */
    animationOptions?: DismissibleAnimationProps;
    /**
     * Override the default threshold (height/2 and width/2) with different values.
     */
    threshold?: PanAmountsProps;
    /**
     * Allow diagonal dismiss, this is false by default,
     * since it looks better and most cases.
     */
    allowDiagonalDismiss?: boolean;
}
export declare type PanDismissibleViewPropTypes = PanDismissibleViewProps;
declare const _default: React.ComponentClass<PanDismissibleViewProps, any>;
export default _default;
