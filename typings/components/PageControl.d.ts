
import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export interface PageControlProps {
  containerStyle?: StyleProp<ViewStyle>;
  numOfPages?: number;
  currentPage?: number;
  onPagePress?: (event: GestureResponderEvent) => void;
  color?: ColorValue;
  inactiveColor?: ColorValue;
  size?: number;
  enlargeActive?: boolean;
  spacing?: number;
  testID?: string;
}

export class PageControl extends BaseComponent<PageControlProps> {}
