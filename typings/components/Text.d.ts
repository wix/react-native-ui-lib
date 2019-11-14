
import {TextProps as RNTextProps} from 'react-native';
import {PureBaseComponent} from '../commons';

export interface TextProps extends RNTextProps {
  color?: string;
  center?: boolean;
  uppercase?: boolean;
}

export class Text extends PureBaseComponent<TextProps> {}
