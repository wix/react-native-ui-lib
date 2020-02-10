
import {ReactElement} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {BaseComponent} from '../commons';
import {ButtonProps} from './Button';

type ActionSheetOnOptionPress = (index: number) => void;

export interface ActionSheetProps {
  visible?: boolean;
  title?: string;
  message?: string;
  cancelButtonIndex?: number;
  destructiveButtonIndex?: number;
  options?: ButtonProps[];
  onDismiss?: () => void;
  useNativeIOS?: boolean;
  showCancelButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  dialogStyle?: StyleProp<ViewStyle>;
  optionsStyle?: StyleProp<ViewStyle>;
  renderTitle?: () => ReactElement;
  renderAction?: (option: ButtonProps, index: number, onOptionPress: ActionSheetOnOptionPress) => ReactElement;
  onModalDismissed?: () => void;
  useSafeArea?: boolean;
}

export class ActionSheet extends BaseComponent<ActionSheetProps> {}
