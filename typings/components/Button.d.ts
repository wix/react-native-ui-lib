
import {
  GestureResponderEvent,
  ImageRequireSource,
  ImageStyle,
  ImageURISource,
  StyleProp,
  TextProps,
  TextStyle
} from 'react-native';
import {PureBaseComponent} from '../commons';
import {ColorsModifiers, TypographyModifiers} from '../modifiers';
import {ColorValue} from '../style/colors';

export type ButtonSize = "xSmall" | "small" | "medium" | "large";
export type ButtonAnimateTo = "center" | "left" | "right";

export type ButtonIconSource =
  | ImageURISource
  | ImageRequireSource
  | ((iconStyle: StyleProp<ImageStyle>) => ImageURISource);

export interface ButtonProps extends TextProps {
  label?: string;
  color?: ColorValue;
  iconSource?: ButtonIconSource;
  iconStyle?: StyleProp<ImageStyle>;
  iconOnRight?: boolean;
  backgroundColor?: ColorValue;
  size?: ButtonSize;
  borderRadius?: number;
  onPress?: (event: GestureResponderEvent | any) => void;
  disabled?: boolean;
  outline?: boolean;
  outlineColor?: ColorValue;
  outlineWidth?: number;
  link?: boolean;
  linkColor?: ColorValue;
  labelStyle?: StyleProp<TextStyle>;
  labelProps?: object;
  fullWidth?: boolean;
  round?: boolean;
  enableShadow?: boolean;
  avoidInnerPadding?: boolean;
  avoidMinWidth?: boolean;
  getActiveBackgroundColor?: (backgroundColor: ColorValue, themeProps: object) => ColorValue;
  animateLayout?: boolean;
  animateTo?: ButtonAnimateTo;
  style?: StyleProp<TextStyle>;
  testID?: string;
  throttleTime?: number;
  ref?: any;
  hitSlop?: any;
}


export class Button extends PureBaseComponent<ButtonProps & ColorsModifiers & TypographyModifiers> {
  static sizes: Record<ButtonSize, ButtonSize>
}
