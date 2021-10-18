/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
interface SortableListProps<T> {
  items: Array<T>;
  itemHeight: number;
  onOrderChange: (items: Array<T>) => void;
  renderItem: (item: T) => JSX.Element;
  dragableAreaSize?: number;
  dragableAreaSide?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}
declare const SortableList: ({ items, itemHeight, onOrderChange, renderItem, dragableAreaSize }: SortableListProps<any>) => JSX.Element;
export default SortableList;
