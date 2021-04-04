import React from 'react';
import { TextStyle, StyleProp, ImageSourcePropType, ImageStyle, ViewStyle, ViewProps } from 'react-native';
import { RadioGroupContextProps } from './RadioGroupContext';
export declare type RadioButtonProps = RadioGroupContextProps & ViewProps & {
    /**
     * The identifier value of the radio button. must be different than other RadioButtons in the same group
     */
    value?: string | number | boolean;
    /**
     * When using RadioButton without a RadioGroup, use this prop to toggle selection
     */
    selected?: boolean;
    /**
     * Invoked when pressing the button
     */
    onPress?: (selected: boolean) => void;
    /**
     * Whether the radio button should be disabled
     */
    disabled?: boolean;
    /**
     * The color of the radio button
     */
    color?: string;
    /**
     * The size of the radio button, affect both width & height
     */
    size?: number;
    /**
     * The radio button border radius
     */
    borderRadius?: number;
    /**
     * A label for the radio button description
     */
    label?: string;
    /**
     * Label style
     */
    labelStyle?: TextStyle;
    /**
     * Icon image source
     */
    iconSource?: ImageSourcePropType;
    /**
     * Icon image style
     */
    iconStyle?: ImageStyle;
    /**
     * Should the icon be on the right side of the label
     */
    iconOnRight?: boolean;
    /**
     * Should the content be rendered right to the button
     */
    contentOnRight?: boolean;
    /**
     * Additional styling for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
};
export declare type RadioButtonPropTypes = RadioButtonProps;
declare const _default: React.ComponentClass<RadioGroupContextProps & ViewProps & {
    /**
     * The identifier value of the radio button. must be different than other RadioButtons in the same group
     */
    value?: string | number | boolean | undefined;
    /**
     * When using RadioButton without a RadioGroup, use this prop to toggle selection
     */
    selected?: boolean | undefined;
    /**
     * Invoked when pressing the button
     */
    onPress?: ((selected: boolean) => void) | undefined;
    /**
     * Whether the radio button should be disabled
     */
    disabled?: boolean | undefined;
    /**
     * The color of the radio button
     */
    color?: string | undefined;
    /**
     * The size of the radio button, affect both width & height
     */
    size?: number | undefined;
    /**
     * The radio button border radius
     */
    borderRadius?: number | undefined;
    /**
     * A label for the radio button description
     */
    label?: string | undefined;
    /**
     * Label style
     */
    labelStyle?: TextStyle | undefined;
    /**
     * Icon image source
     */
    iconSource?: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    /**
     * Icon image style
     */
    iconStyle?: ImageStyle | undefined;
    /**
     * Should the icon be on the right side of the label
     */
    iconOnRight?: boolean | undefined;
    /**
     * Should the content be rendered right to the button
     */
    contentOnRight?: boolean | undefined;
    /**
     * Additional styling for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
} & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
