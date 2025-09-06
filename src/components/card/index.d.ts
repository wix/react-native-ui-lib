import React from 'react';
import { StyleProp, ViewStyle, type DimensionValue } from 'react-native';
import { MarginModifiers } from '../../commons/new';
import { ViewProps } from '../view';
import { TouchableOpacityProps } from '../touchableOpacity';
import CardImage from './CardImage';
import CardSection, { CardSectionProps } from './CardSection';
export interface CardSelectionOptions {
    icon?: number;
    iconColor?: string;
    color?: string;
    borderWidth?: number;
    indicatorSize?: number;
    hideIndicator?: boolean;
}
export { CardSectionProps };
export type CardProps = ViewProps & TouchableOpacityProps & MarginModifiers & {
    /**
     * card custom width
     */
    width?: DimensionValue;
    /**
     * card custom height
     */
    height?: DimensionValue;
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
    onPress?: TouchableOpacityProps['onPress'];
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
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Adds visual indication that the card is selected
     */
    selected?: boolean;
    /**
     * Custom options for styling the selection indication
     */
    selectionOptions?: CardSelectionOptions;
};
declare const _default: React.ForwardRefExoticComponent<ViewProps & TouchableOpacityProps & Partial<Record<"margin" | "marginL" | "marginT" | "marginR" | "marginB" | "marginH" | "marginV", boolean>> & {
    /**
     * card custom width
     */
    width?: DimensionValue | undefined;
    /**
     * card custom height
     */
    height?: DimensionValue | undefined;
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
    onPress?: ((props?: any) => void) | undefined;
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
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Adds visual indication that the card is selected
     */
    selected?: boolean | undefined;
    /**
     * Custom options for styling the selection indication
     */
    selectionOptions?: CardSelectionOptions | undefined;
} & React.RefAttributes<any>> & {
    Image: typeof CardImage;
    Section: typeof CardSection;
};
export default _default;
