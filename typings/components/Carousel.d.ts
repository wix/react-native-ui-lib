
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import {BaseComponent} from '../commons';
import {PageControlProps} from './PageControl';

export type CarouselPageControlPosition = 'over' | 'under';

export interface CarouselProps {
  initialPage?: number;
  pageWidth?: number;
  itemSpacings?: number;
  containerMarginHorizontal?: number;
  containerPaddingVertical?: number;
  loop?: boolean;
  onChangePage?: (page: number, prevPage: number) => void;
  onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void;
  containerStyle?: StyleProp<ViewStyle>;
  pageControlProps?: PageControlProps;
  pageControlPosition?: CarouselPageControlPosition;
  showCounter?: boolean;
  counterTextStyle?: StyleProp<TextStyle>;
  pagingEnabled?: boolean;
  allowAccessibleLayout?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.Node;
  animated?: boolean;
}

export class Carousel extends BaseComponent<CarouselProps> {}
