
import {
  GestureResponderEvent,
  ImageRequireSource,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export interface TabBarItemProps {
  icon?: ImageRequireSource;
  iconColor?: ColorValue;
  iconSelectedColor?: ColorValue;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  maxLines?: number;
  selectedLabelStyle?: StyleProp<TextStyle>;
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  showDivider?: boolean;
  width?: number;
  onLayout?: (width: number) => void;
}

export class TabBarItem extends BaseComponent<TabBarItemProps> {}

export type TabBarLayoutMode = 'FIT' | 'SCROLL';

export interface TabBarProps {
  height?: number;
  selectedIndex?: number;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  isContentIndicator?: boolean;
  ignoreLastTab?: boolean;
  disableAnimatedTransition?: boolean;
  onChangeIndex?: (index: number) => void;
  onTabSelected?: (index: number) => void;
  mode?: TabBarLayoutMode;
  useGradientFinish?: boolean;
  enableShadow?: boolean;
}

export class TabBar extends BaseComponent<TabBarProps> {}
