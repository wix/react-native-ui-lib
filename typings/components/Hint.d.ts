
import {ReactElement} from 'react';
import {
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export interface HintTargetFrame {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface HintProps {
  visible?: boolean;
  color?: ColorValue;
  message?: string | ReactElement;
  messageStyle?: StyleProp<TextStyle>;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  position?: 'top' | 'bottom';
  targetFrame?: HintTargetFrame;
  useSideTip?: boolean;
  borderRadius?: number;
  edgeMargins?: number;
  offset?: number;
  onBackgroundPress?: (event: GestureResponderEvent) => void;
  containerWidth?: number;
  style?: ViewStyle;
  testID?: string;
}

export class Hint extends BaseComponent<HintProps> {}
