/// <reference types="react" />
import { FlatListProps, ScrollViewProps } from 'react-native';
import { GridListBaseProps } from '../gridList';
import { ItemsOrder } from './usePresenter';
export interface SortableGridListProps<T = any> extends GridListBaseProps, ScrollViewProps {
    data: FlatListProps<T>['data'];
    renderItem: FlatListProps<T>['renderItem'];
    onOrderChange?: (newData: T[], newOrder: ItemsOrder) => void;
}
declare function SortableGridList<T = any>(props: SortableGridListProps<T>): JSX.Element;
export default SortableGridList;
