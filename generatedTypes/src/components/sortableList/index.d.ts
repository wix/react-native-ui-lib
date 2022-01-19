import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ListRenderItem } from './Item';
export interface SortableListProps<T> {
    /**
     * Plain array of all items
     */
    items: Array<T>;
    /**
     * Takes an item from items list and renders it into the view
     */
    renderItem: ListRenderItem<T>;
    /**
     * Height of each item (mandatory)
     */
    itemHeight: number;
    /**
     * Called when the animation of the sort action is finished
     */
    onOrderChange: (items: Array<T>) => void;
    /**
     * [optional] The size (in pixels) of the draggable area. Enables scrolling when set as it default to the whole width of the item component.
     */
    draggableAreaSize?: number;
    /**
     * [optional] The side of the draggable area. defaults to left.
     */
    draggableAreaSide?: 'left' | 'right';
    /**
     * Styling for the external list View
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Styling for the internal list View
     */
    contentContainerStyle?: StyleProp<ViewStyle>;
    /**
     * Used to locate this view in end-to-end tests
     */
    testID?: string;
}
declare const _default: React.ComponentType<SortableListProps<any>>;
export default _default;
