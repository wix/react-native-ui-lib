import {ReactElement} from 'react';
import {GestureResponderEvent, StyleProp, TextStyle} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {ButtonProps} from './Button';
import {PageControlProps} from './PageControl';

export interface FeatureHighlightFrame {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface FeatureHighlightMinimumRectSize {
  width?: number;
  height?: number;
}

export interface FeatureHighlightProps {
  visible: boolean;
  highlightFrame?: FeatureHighlightFrame;
  getTarget?: () => ReactElement;
  title?: string;
  message?: string;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  titleNumberOfLines?: number;
  messageNumberOfLines?: number;
  confirmButtonProps?: ButtonProps;
  onBackgroundPress?: (event: GestureResponderEvent) => void;
  overlayColor?: ColorValue;
  textColor?: ColorValue;
  borderColor?: ColorValue;
  borderWidth?: number;
  borderRadius?: number;
  minimumRectSize?: FeatureHighlightMinimumRectSize;
  innerPadding?: number;
  pageControlProps?: PageControlProps;
}

export class FeatureHighlight extends BaseComponent<FeatureHighlightProps> {}
