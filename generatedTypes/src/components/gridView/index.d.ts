/// <reference types="react" />
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
     * Number of items to show in a row
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
     */
    keepItemSize?: boolean;
}
interface State {
    viewWidth: number;
    numColumns: number;
}
declare type ExistProps = GridViewProps & State;
/**
 * @description: A auto-generated grid view that calculate item size according to given props
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
declare class GridView extends UIComponent<GridViewProps, State> {
    static displayName: string;
    static defaultProps: {
        numColumns: number;
        itemSpacing: number;
    };
    private itemSize?;
    private dimensionsChangeListener;
    constructor(props: ExistProps);
    static getDerivedStateFromProps(nextProps: ExistProps, prevState: State): {
        viewWidth: number;
        numColumns: number | undefined;
    } | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onOrientationChanged: () => void;
    shouldUpdateItemSize(): boolean;
    getDefaultViewWidth(): number;
    getCalculatedNumOfColumns(): number;
    getItemSize(): number | undefined;
    getThemeColor(placeColor: string): any;
    renderLastItemOverlay(): JSX.Element | undefined;
    renderItem: (item: GridListItemProps, index: number) => JSX.Element;
    render(): JSX.Element;
}
export default GridView;
