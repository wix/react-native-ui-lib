import {ReactElement} from 'react';
import {ImageRequireSource} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {ButtonProps} from './Button';

export type ToastPosition = 'top' | 'bottom';

export interface ToastProps {
  visible?: boolean;
  position?: ToastPosition;
  backgroundColor?: ColorValue;
  color?: ColorValue;
  message?: string;
  icon?: ImageRequireSource;
  actions?: ButtonProps;
  onDismiss?: () => void;
  autoDismiss?: number;
  onAnimationEnd?: (visible: boolean) => void;
  centerMessage?: boolean;
  zIndex?: number;
  showLoader?: boolean;
  showDismiss?: boolean;
  renderAttachment?: () => React.ReactElement;
  customLoader?: () => React.ReactElement;
}

export class Toast extends BaseComponent<ToastProps> {}
