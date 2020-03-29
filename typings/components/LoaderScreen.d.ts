import {ActivityIndicatorProps, StyleProp, TextStyle} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

export interface LoaderScreenProps extends ActivityIndicatorProps {
  loaderColor?: ColorValue;
  backgroundColor?: ColorValue;
  message?: string;
  messageStyle?: StyleProp<TextStyle>;
  overlay?: boolean;
}

export class LoaderScreen extends BaseComponent<LoaderScreenProps> {}
