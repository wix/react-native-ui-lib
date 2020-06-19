import React from 'react';
import { TextStyle, ImageSourcePropType, ImageStyle } from 'react-native';
interface RadioButtonPropTypes {
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
}
declare const _default: React.ComponentClass<RadioButtonPropTypes, any> | React.FunctionComponent<RadioButtonPropTypes>;
export default _default;
