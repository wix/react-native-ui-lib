
import {Component} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ColorValue} from '../style/colors';

export type WheelPickerItemValue = string | number;

export interface WheelPickerItemProps {
  value?: WheelPickerItemValue;
  label?: string;
}

declare class WheelPickerItem extends Component<WheelPickerItemProps> {}

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

export class WheelPicker extends Component<WheelPickerProps> {
  Item: typeof WheelPickerItem;
}
