import {FlatListProps, ScrollViewProps, StyleProp, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {GridListBaseProps} from '../gridList';

export type ItemLayout = {width: number; height: number} | undefined;
export type ItemsOrder = string[];

export type ItemProps<T> = T & {id: string};

export interface SortableGridListProps<T = any> extends GridListBaseProps, ScrollViewProps {
  data: FlatListProps<ItemProps<T>>['data'];
  renderItem: FlatListProps<ItemProps<T>>['renderItem'];
  onOrderChange?: (newData: ItemProps<T>[], newOrder: ItemsOrder) => void;
  extraData?: any;
}

export interface SortableItemProps {
  id: string;
  data: any;
  itemsOrder: Animated.SharedValue<ItemsOrder>;
  onChange: () => void;
  style: StyleProp<ViewStyle>;
}
