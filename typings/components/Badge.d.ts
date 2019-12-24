
import {StyleProp, ImageSourcePropType, ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {PureBaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {ImageProps} from './Image';

export declare const BADGE_SIZES: {
  pimpleSmall: number;
  pimpleBig: number;
  pimpleHuge: number;
  small: number;
  default: number;
  large: number;
};

type BadgeLabelFormatterLimit = 1 | 2 | 3 | 4;

export interface BadgeProps {
  label?: string;
  backgroundColor?: ColorValue;
  size?: number;
  borderWidth?: number;
  borderColor?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelFormatterLimit?: BadgeLabelFormatterLimit;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  iconProps?: ImageProps;
  testID?: string;
}

export class Badge extends PureBaseComponent<BadgeProps> {}
