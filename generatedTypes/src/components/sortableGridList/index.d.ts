/// <reference types="react" />
import { GridListProps } from '../gridList';
import { ItemsOrder } from './usePresenter';
export interface SortableGridListProps<T = any> extends GridListProps<T> {
    onOrderChange?: (newData: T[], newOrder: ItemsOrder) => void;
}
declare function SortableGridList<T = any>(props: SortableGridListProps<T>): JSX.Element;
export default SortableGridList;
