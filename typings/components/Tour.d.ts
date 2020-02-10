
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle
} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export interface TourProps {
  visible?: boolean;
  onClose?: (event: GestureResponderEvent) => void;
  overlayColor?: ColorValue;
  overlayOpacity?: number;
  message?: string;
  messageStyle?: StyleProp<TextStyle>;
}

export default class Tour extends BaseComponent<TourProps> {}
