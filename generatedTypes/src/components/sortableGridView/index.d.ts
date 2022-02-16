import React from 'react';
export interface SortableGridItemProps {
    /**
     * unique identifier for a sortable grid item
     */
    id: string;
}
export interface SortableGridViewProps {
    /**
     * The list of itemProps to be rendered by renderItem
     */
    items: SortableGridItemProps[];
    /**
    * Render method for sortable grid items,
    * these components will be rendered inside the assigned space calculated by the grid
    */
    renderItem: (item: SortableGridItemProps) => React.ReactElement;
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
