import {Component, PureComponent} from 'react';
import {
  GestureResponderEvent,
  ImageRequireSource,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import {State as RNGestureHandlerState} from 'react-native-gesture-handler';
import {ColorValue} from '../style/colors';
import {BadgeProps} from '../components/Badge';

export namespace Incubator {
  export interface TabControllerProps {
    selectedIndex?: number;
    onChangeIndex?: (index: number) => void;
    asCarousel?: boolean;
  }

  export class TabController extends Component<TabControllerProps> {}

  export interface TabBarProps {
    items?: TabBarItemProps[];
    height?: number;
    enableShadow?: boolean;
    indicatorStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    labelColor?: ColorValue;
    selectedLabelColor?: ColorValue;
    uppercase?: boolean;
    iconColor?: ColorValue;
    selectedIconColor?: ColorValue;
    activeBackgroundColor?: ColorValue;
    containerWidth?: number;
  }

  export interface TabBarItemProps {
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    labelColor?: ColorValue;
    selectedLabelColor?: ColorValue;
    icon?: ImageRequireSource;
    iconColor?: ColorValue;
    selectedIconColor?: ColorValue;
    badge?: BadgeProps;
    width?: number;
    ignore?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    uppercase?: boolean;
    activeOpacity?: number;
    activeBackgroundColor?: ColorValue;
  }

  export interface TabPageProps {
    index: number;
    lazy?: boolean;
  }

  export namespace TabController {
    export class TabBar extends PureComponent<TabBarProps> {}
    export class TabBarItem extends PureComponent<TabBarItemProps> {}
    export class TabPage extends PureComponent<TabPageProps> {}
  }

  export interface TouchableOpacityProps {
    feedbackColor?: ColorValue;
    backgroundColor?: ColorValue;
    activeOpacity?: number;
    activeScale?: number;
    onPress?: (props: TouchableOpacityProps) => void;
    pressState?: RNGestureHandlerState;
  }

  export class TouchableOpacity extends Component<TouchableOpacityProps> {}
}
