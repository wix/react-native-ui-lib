import {StyleProp, ViewStyle} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export interface ProgressBarProps {
  height?: number;
  progress?: string;
  backgroundColor?: ColorValue;
  progressBackgroundColor?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
}

export class ProgressBar extends BaseComponent<ProgressBarProps> {}
