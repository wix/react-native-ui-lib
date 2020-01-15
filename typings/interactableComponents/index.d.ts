import {ImageRequireSource, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {PureBaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export interface DrawerItem {
  width?: number;
  background?: ColorValue;
  text?: string;
  icon?: ImageRequireSource;
  onPress?: () => void;
  keepOpen?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface DrawerProps {
  onSwipeableLeftOpen?: () => void;
  onSwipeableRightOpen?: () => void;
  onSwipeableOpen?: () => void;
  onSwipeableClose?: () => void;
  onSwipeableLeftWillOpen?: () => void;
  onSwipeableRightWillOpen?: () => void;
  onSwipeableWillOpen?: () => void;
  onSwipeableWillClose?: () => void;

  childrenContainerStyle?: StyleProp<ViewStyle>;

  friction?: number;
  damping?: number;
  tension?: number;
  bounciness?: number;
  leftThreshold?: number;
  rightThreshold?: number;
  overshootLeft?: boolean;
  overshootRight?: boolean;
  overshootFriction?: number;

  onDragStart?: (props: DrawerProps) => void;
  rightItems?: DrawerItem[];
  leftItem?: DrawerItem;
  equalWidths?: boolean;
  itemsMinWidth?: number;
  itemsTintColor?: ColorValue;
  itemsIconSize?: number;
  itemsTextStyle?: StyleProp<TextStyle>;
  useNativeAnimations?: boolean;
}

export class Drawer extends PureBaseComponent<DrawerProps> {}
