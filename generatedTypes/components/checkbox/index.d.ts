import React from 'react';
import { StyleProp, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
export interface CheckboxProps extends TouchableOpacityProps {
    /**
     * The value of the Checkbox. If true the switch will be turned on. Default value is false.
     */
    value?: boolean;
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: (value: boolean) => void;
    /**
     * Whether the checkbox should be disabled
     */
    disabled?: boolean;
    /**
     * The Checkbox color
     */
    color?: string;
    /**
     * alternative Checkbox outline style
     */
    outline?: boolean;
    /**
     * The size of the checkbox. affect both width and height
     */
    size?: number;
    /**
     * The Checkbox border radius
     */
    borderRadius?: number;
    /**
     * The icon asset to use for the selected indication (accept only local assets)
     */
    selectedIcon?: number;
    /**
     * The selected icon color
     */
    iconColor?: string;
    /**
     * The label of the checkbox
     */
    label?: string;
    /**
     * The style of the label
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Additional styling
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Additional styling for checkbox and label container
     */
    containerStyle?: StyleProp<ViewStyle>;
}
export declare type CheckboxPropTypes = CheckboxProps;
declare const _default: React.ComponentClass<CheckboxProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
