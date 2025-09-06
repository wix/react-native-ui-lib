import { FlatListProps } from 'react-native';
export interface GridListBaseProps extends Pick<FlatListProps<any>, 'style' | 'contentContainerStyle' | 'columnWrapperStyle'> {
    /**
     * Allow a responsive item width to the maximum item width
     */
    maxItemWidth?: number;
    /**
     * Number of items to show in a row (ignored when passing maxItemWidth)
     */
    numColumns?: number;
    /**
     * Spacing between each item
     */
    itemSpacing?: number;
    /**
     * List padding (used for item size calculation)
     */
    listPadding?: number;
    /**
     * whether to keep the items initial size when orientation changes,
     * in which case the apt number of columns will be calculated automatically.
     */
    keepItemSize?: boolean;
    /**
     * Pass when you want to use a custom container width for calculation
     */
    containerWidth?: number;
}
export type GridListProps<T = any> = GridListBaseProps & FlatListProps<T>;
