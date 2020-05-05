import {ImageStyle, TextStyle, Animated} from 'react-native';

type RadioButtonValue = {
  value?: string | boolean;
};

export type RadioButtonPropTypes = {
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

export type RadioButtonState = {
  opacityAnimationValue: Animated.Value;
  scaleAnimationValue: Animated.Value;
};

export type RadioGroupPropTypes = {
  /**
   * The initial value of the selected radio button
   */
  initialValue?: RadioButtonValue['value'];
  /**
   * Invoked once when value changes, by selecting one of the radio buttons in the group
   */
  onValueChange?: Function;
};

export type RadioGroupState = RadioButtonValue;

export type RadioGroupContextPropTypes = {
    value: RadioButtonValue['value'];
    onValueChange?: Function;
};

export type RadioGroupChildPropTypes = {
  /**
   * The identifier value of the radio button. must be different than other RadioButtons in the same group
   */
  value?: RadioButtonValue['value'];
  /**
   * When using RadioButton without a RadioGroup, use this prop to toggle selection
   */
  selected?: boolean;
};
