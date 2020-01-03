
import {Component} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ColorValue} from '../style/colors';

export type WheelPickerItemValue = string | number;

export interface WheelPickerItemProps {
  value?: WheelPickerItemValue;
  label?: string;
}

export type WheelPickerOnValueChange = (value: WheelPickerItemValue, index: number) => void;

export interface WheelPickerProps {
  selectedValue?: WheelPickerItemValue;
  onValueChange?: WheelPickerOnValueChange;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  itemHeight?: number;
  color?: ColorValue;
  itemStyle?: StyleProp<ViewStyle>;
}

export class WheelPicker extends Component<WheelPickerProps> {}

export namespace WheelPicker {
  export class Item extends Component<WheelPickerItemProps> {}
}
