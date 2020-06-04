import React from 'react';
import { ViewStyle } from 'react-native';
declare type TouchableOpacityPropTypes = {
    /**
     * Background color
     */
    backgroundColor?: string;
    /**
     * Background color when actively pressing the touchable
     */
    feedbackColor?: string;
    /**
     * Opacity value when actively pressing the touchable
     */
    activeOpacity?: number;
    /**
     * Scale value when actively pressing the touchable
     */
    activeScale?: number;
    /**
     * Callback for when tapping the touchable
     */
    onPress?: (props: any) => void;
    /**
     * Callback for when long pressing the touchable
     */
    onLongPress?: (props: any) => void;
    /**
     * Pass controlled pressState to track gesture state changes
     */
    pressState?: object;
    /**
     * If true, disable all interactions for this component.
     */
    disabled?: boolean;
    /**
     * Pass custom style
     */
    style: ViewStyle;
};
declare const _default: React.ComponentType<TouchableOpacityPropTypes>;
export default _default;
