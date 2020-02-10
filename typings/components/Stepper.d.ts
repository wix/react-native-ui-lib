
import {StyleProp, ViewStyle} from 'react-native';
import {PureBaseComponent} from '../commons';

export interface StepperProps {
  label?: string;
  min: number;
  max?: number;
  containerStyle?: StyleProp<ViewStyle>;
  onValueChange?: (newValue: number) => void;
  initialValue: number;
}

export class Stepper extends PureBaseComponent<StepperProps> {}
