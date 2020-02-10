
import {
  GestureResponderEvent,
  ImageRequireSource,
  ImageSourcePropType,
  StyleProp,
  ViewStyle
} from 'react-native';
import {BlurViewProperties} from '@react-native-community/blur';
import {BaseComponent, PureBaseComponent} from '../commons';
import {ColorValue} from '../style/colors';

type CardImagePositionOption = 'top' | 'bottom' | 'left' | 'right';

export interface CardImageProps {
  imageSource?: ImageSourcePropType;
  width?: number | string;
  height?: number | string;
  position?: CardImagePositionOption | CardImagePositionOption[];
  borderRadius?: number;
}

export interface CardSelectionOptions {
  icon?: ImageRequireSource;
  color?: ColorValue;
  borderWidth?: number;
  indicatorSize?: number;
}

export interface CardProps {
  width?: number | string;
  height?: number | string;
  row?: boolean;
  borderRadius?: number;
  onPress?: (event: GestureResponderEvent) => void;
  enableShadow?: boolean;
  elevation?: number;
  enableBlur?: boolean;
  blurOptions?: BlurViewProperties;
  containerStyle?: StyleProp<ViewStyle>;
  selected?: boolean;
  selectionOptions?: CardSelectionOptions;
}

export class Card extends PureBaseComponent<CardProps> {}

export namespace Card {
  export class Image extends BaseComponent<CardImageProps> {}
}
