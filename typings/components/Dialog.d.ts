
import {ReactElement} from 'react';
import {
  StyleProp,
  ViewStyle
} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {PanningProviderDirection} from './PanningViews';

export interface DialogProps {
  visible?: boolean;
  onDismiss?: (props: DialogProps) => void;
  overlayBackgroundColor?: ColorValue;
  width?: number | string;
  height?: number | string;
  panDirection?: PanningProviderDirection;
  useSafeArea?: boolean;
  onModalDismissed?: () => void;
  renderPannableHeader?: (pannableHeaderProps: object) => ReactElement;
  pannableHeaderProps?: object;
  migrate?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
  renderOverlay?: () => React.Node;
  useTemplate?: boolean;
  containerStyleExtra?: StyleProp<ViewStyle>;
}

export class Dialog extends BaseComponent<DialogProps> {
  static getPannableHeaderProps<T>(dialogProps: T, render: (dialogProps: T) => React.Node);
  static getDialogMaxHeight(): number;
  static Header: any;
}
