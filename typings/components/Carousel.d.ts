
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
  loop?: boolean;
  onChangePage?: (page: number, prevPage: number) => void;
  onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void;
  containerStyle?: StyleProp<ViewStyle>;
  pageControlProps?: PageControlProps;
  pageControlPosition?: CarouselPageControlPosition;
  showCounter?: boolean;
  counterTextStyle?: StyleProp<TextStyle>;
}

export class Carousel extends BaseComponent<CarouselProps> {}
