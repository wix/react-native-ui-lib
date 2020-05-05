import { ImageStyle, TextStyle, Animated } from 'react-native';
declare type RadioButtonValue = {
    value?: string | boolean;
};
export declare type RadioButtonPropTypes = {
    /**
     * The identifier value of the radio button. must be different than other RadioButtons in the same group
     */
    value?: RadioButtonValue['value'];
    /**
     * When using RadioButton without a RadioGroup, use this prop to toggle selection
     */
    selected?: boolean;
    /**
     * Invoked when pressing the button
     */
    onPress?: Function;
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
    iconSource?: object | number;
    /**
     * Icon image style
     */
    iconStyle?: ImageStyle;
    /**
     * Should the icon be on the right side of the label
     */
    iconOnRight?: boolean;
};
export declare type RadioButtonState = {
    opacityAnimationValue: Animated.Value;
    scaleAnimationValue: Animated.Value;
};
export declare type RadioGroupPropTypes = {
    /**
     * The initial value of the selected radio button
     */
    initialValue?: RadioButtonValue['value'];
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange?: Function;
};
export declare type RadioGroupState = RadioButtonValue;
export declare type RadioGroupContextPropTypes = {
    value: RadioButtonValue['value'];
    onValueChange?: Function;
};
export declare type RadioGroupChildPropTypes = {
    /**
     * The identifier value of the radio button. must be different than other RadioButtons in the same group
     */
    value?: RadioButtonValue['value'];
    /**
     * When using RadioButton without a RadioGroup, use this prop to toggle selection
     */
    selected?: boolean;
};
export {};
