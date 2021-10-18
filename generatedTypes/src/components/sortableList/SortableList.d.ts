/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export interface SortableListProps<T> {
    /**
     * Plain array of all items
     */
    items: Array<T>;
    /**
     * Takes an item from items list and renders it into the view
     */
    renderItem: (item: T) => JSX.Element;
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
    dragableAreaSize?: number;
    /**
     * [optional] The side of the draggable area. defaults to left.
     */
    dragableAreaSide?: 'left' | 'right';
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
declare const SortableList: ({ items, itemHeight, onOrderChange, renderItem, dragableAreaSize, dragableAreaSide, style, contentContainerStyle, testID }: SortableListProps<any>) => JSX.Element;
export default SortableList;
