
import {Component} from 'react';
import {GestureResponderEvent, StyleProp, TextStyle} from 'react-native';
import {WheelPickerItemValue, WheelPickerOnValueChange, WheelPickerProps} from '../nativeComponents/WheelPicker';

export interface WheelPickerDialogProps {
  wheelPickerProps?: WheelPickerProps;
  selectLabelStyle?: StyleProp<TextStyle>;
  cancelLabelStyle?: StyleProp<TextStyle>;
  items?: ReadonlyArray<WheelPickerItemValue>;
  selectedValue?: WheelPickerItemValue;
  title?: string;
  onCancel?: (event: GestureResponderEvent) => void;
  onSelect?: (value: WheelPickerItemValue) => void;
  onValueChange?: WheelPickerOnValueChange;
}

export class WheelPickerDialog extends Component<WheelPickerDialogProps> {}
