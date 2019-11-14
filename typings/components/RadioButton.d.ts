
import {Component, ComponentType} from 'react';
import {
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle
} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

declare interface RadioGroupChildProps {
  value?: string | boolean;
  selected?: boolean;
}

declare class RadioGroupChild<P> extends Component<P & RadioGroupChildProps> {}

export declare function asRadioGroupChild<P>(WrappedComponent: ComponentType<P>): RadioGroupChild<P>;

export interface RadioButtonProps extends RadioGroupChildProps {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  color?: ColorValue;
  size?: number;
  borderRadius?: number;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  iconSource?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  iconOnRight?: boolean;
}

export class RadioButton extends BaseComponent<RadioGroupChild<RadioButtonProps>> {}

export type RadioGroupValue = string | boolean;

export interface RadioGroupProps {
  value?: RadioGroupValue;
  initialValue?: RadioGroupValue;
  onValueChange?: (value: RadioGroupValue) => void;
}

export class RadioGroup extends BaseComponent<RadioGroupProps> {}
