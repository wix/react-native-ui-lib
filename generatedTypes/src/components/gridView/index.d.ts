import React from 'react';
import UIComponent from '../../commons/UIComponent';
import { GridListItemProps } from '../gridListItem';
export interface GridViewProps {
    /**
     * The list of items based on GridListItem props
     */
    items?: GridListItemProps[];
    /**
     * pass the desired grid view width (will improve loading time)
     */
    viewWidth?: number;
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
     * overlay label for the last item
     */
    lastItemLabel?: string | number;
    /**
     * color of overlay label for the last item
     */
    lastItemOverlayColor?: string;
    /**
     * whether to keep the items initial size when orientation changes,
     * in which case the apt number of columns will be calculated automatically.
     * Ignored when passing 'maxItemWidth'
     */
    keepItemSize?: boolean;
    /**
     * Pass to render a custom item
     */
    renderCustomItem?: (item: GridListItemProps) => React.ReactElement;
}
interface GridViewState {
    viewWidth: number;
    numColumns: number;
    itemSize: number;
}
/**
 * @description: A auto-generated grid view that calculate item size according to given props
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
declare class GridView extends UIComponent<GridViewProps, GridViewState> {
    static displayName: string;
    static defaultProps: {
        numColumns: number;
        itemSpacing: number;
    };
    private dimensionsChangeListener;
    state: {
        viewWidth: number;
        numColumns: number;
        itemSize: number;
    };
    static getDerivedStateFromProps(nextProps: GridViewProps, prevState: GridViewState): {
        viewWidth: number;
        numColumns: number | undefined;
    } | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onOrientationChanged: () => void;
    getDefaultViewWidth(): number;
    getGridContainerWidth(): number;
    calcNumberOfColumns(): number;
    calcItemSize(): number;
    getThemeColor(placeColor: string): any;
    renderLastItemOverlay(): JSX.Element | undefined;
    renderItem: (item: GridListItemProps, index: number) => JSX.Element;
    render(): JSX.Element;
}
export default GridView;
