
import {
  GestureResponderEvent,
  ImageRequireSource,
  ImageStyle,
  ImageURISource,
  StyleProp,
  TextStyle
} from 'react-native';
import {PureBaseComponent} from '../commons';
import {TextProps} from './Text';
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
  onPress?: (event: GestureResponderEvent) => void;
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
}


export class Button extends PureBaseComponent<ButtonProps> {}
