import React from 'react';
import { ViewStyle } from 'react-native';
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
declare const _default: React.ComponentClass<ViewProps & TouchableOpacityProps & {
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
