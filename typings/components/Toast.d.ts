
import {ReactElement} from 'react';
import {
  GestureResponderEvent,
  ImageRequireSource,
  StyleProp,
  TextStyle
} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {ButtonProps} from './Button';
import {BlurViewProperties} from '@react-native-community/blur';

export type ToastPosition = "relative" | "top" | "bottom";

export interface ToastProps {
  visible?: boolean;
  position?: ToastPosition;
  height?: number;
  backgroundColor?: ColorValue;
  color?: ColorValue;
  message?: string;
  messageStyle?: StyleProp<TextStyle>;
  icon?: ImageRequireSource;
  actions?: ReadonlyArray<ButtonProps>;
  onDismiss?: (event: GestureResponderEvent) => void;
  autoDismiss?: number;
  allowDismiss?: boolean;
  onAnimationEnd?: (visible: boolean) => void;
  renderContent?: (props: ToastProps) => ReactElement | ReactElement[];
  centerMessage?: boolean;
  animated?: boolean;
  enableBlur?: boolean;
  blurOptions?: BlurViewProperties;
  zIndex?: number;
}

export class Toast extends BaseComponent<ToastProps> {}
