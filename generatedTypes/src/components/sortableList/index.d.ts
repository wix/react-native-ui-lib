import React from 'react';
import { FlatListProps } from 'react-native';
import { AnimatedFlatListProps } from './AnimatedFlatList';
export interface SortableListProps<ItemT> extends Omit<AnimatedFlatListProps<ItemT>, 'extraData' | 'data'> {
    /**
     * The data of the list, do not update the data.
     */
    data: FlatListProps<ItemT>['data'];
    /**
     * A callback to get the new order (or swapped items).
     */
    onOrderChange: (data: ItemT[]) => void;
    /**
     * Enable scrolling while dragging (experimental, default is false).
     */
    scrollWhileDragging?: boolean;
}
declare const SortableList: {
    <ItemT extends unknown>(props: SortableListProps<ItemT>): JSX.Element;
    SortableListItemDecorator: (props: React.PropsWithChildren<import("./SortableListItemDecorator").SortableListItemDecoratorProps>) => JSX.Element;
};
export default SortableList;
