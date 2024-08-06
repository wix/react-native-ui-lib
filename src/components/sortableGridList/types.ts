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
  /**
   * Temporary migration flag for enabling flex on the container of the list (like it should be by default)
   */
  flexMigration?: boolean;
  /**
   * Wether to reorder the items by index instead of by replacing locations.
   * Items will move to the new index by pushing other items ahead or aback instead of swapping places with the item at the new index.
   */
  orderByIndex?: boolean
}

export interface SortableItemProps {
  id: string;
  data: any;
  itemsOrder: Animated.SharedValue<ItemsOrder>;
  onChange: () => void;
  style: StyleProp<ViewStyle>;
  orderByIndex?: boolean;
}
