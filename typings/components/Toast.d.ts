import {ReactElement} from 'react';
import {ImageRequireSource} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export type ToastPosition = 'top' | 'bottom';

export interface ToastProps {
  visible?: boolean;
  position?: ToastPosition;
  backgroundColor?: ColorValue;
  color?: ColorValue;
  message?: string;
  icon?: ImageRequireSource;
  action?: any; // This is actually ButtonProps, but it's not available here.
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
