import React from 'react';
import { GridListItemProps } from '../gridListItem';
export interface SortableGridViewProps {
    /**
     * The list of itemProps to be rendered by renderItem
     */
    items: GridListItemProps[];
    /**
     * Callback with new items ordered and the new order
     */
    onChange: (newItems: GridListItemProps[], newOrder: number[]) => void;
    /**
     * Render method for sortable grid items,
     * these components will be rendered inside the assigned space calculated by the grid
     */
    renderItem: (item: GridListItemProps) => React.ReactElement;
    /**
     * Number of items to show in a row
     */
    numOfColumns?: number;
    /**
     * Spacing between each item
     */
    itemSpacing?: number;
    /**
     * Pass the desired grid view width (default is screen wide)
     */
    viewWidth?: number;
}
declare const SortableGridView: React.FC<SortableGridViewProps>;
export default SortableGridView;
