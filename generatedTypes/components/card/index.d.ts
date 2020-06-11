import React from 'react';
import { ViewStyle } from 'react-native';
import { ViewPropTypes } from '../view';
import { TouchableOpacityProps } from '../touchableOpacity';
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
declare const _default: React.ComponentType<CardPropTypes>;
export default _default;
