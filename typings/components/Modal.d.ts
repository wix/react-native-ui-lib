import {ComponentType} from 'react';
import {GestureResponderEvent, StyleProp, TextStyle} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {ButtonIconSource, ButtonProps} from '../components/Button';

export interface TopBarProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  doneButtonProps?: ButtonProps;
  doneLabel?: string;
  doneIcon?: ButtonIconSource;
  onDone?: (event: GestureResponderEvent) => void;
  cancelButtonProps?: ButtonProps;
  cancelLabel?: string;
  cancelIcon?: ButtonIconSource;
  onCancel?: (event: GestureResponderEvent) => void;
  includeStatusBar?: boolean;
}

export class TopBar extends BaseComponent<TopBarProps> {}

export interface ModalProps {
  enableModalBlur?: boolean;
  blurView?: ComponentType;
  onBackgroundPress?: (event: GestureResponderEvent) => void;
  overlayBackgroundColor?: ColorValue;
}

export class Modal extends BaseComponent<ModalProps> {}
