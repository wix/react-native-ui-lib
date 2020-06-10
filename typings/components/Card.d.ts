
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
import {TextPropTypes} from '../../src/components/text';
import {TouchableOpacityProps} from './TouchableOpacity';
import {ImageProps} from './Image';

type CardImagePositionOption = 'top' | 'bottom' | 'left' | 'right';

export interface CardImageProps {
  imageSource?: ImageSourcePropType;
  width?: number | string;
  height?: number | string;
  position?: CardImagePositionOption | CardImagePositionOption[];
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  overlayType?: string;
}

export interface CardSectionContentProps extends TextPropTypes {
  text: string;
}

export interface CardSectionProps {
  content?: CardSectionContentProps;
  leadingIcon?: ImageProps;
  trailingIcon?: ImageProps;
}

export interface CardSelectionOptions {
  icon?: ImageRequireSource;
  color?: ColorValue;
  borderWidth?: number;
  indicatorSize?: number;
}

export interface CardProps extends TouchableOpacityProps {
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
  export class Section extends BaseComponent<CardSectionProps> {}
}
