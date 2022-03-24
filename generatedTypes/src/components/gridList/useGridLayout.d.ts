import { GridListBaseProps } from './types';
export declare const DEFAULT_NUM_COLUMNS = 3;
export declare const DEFAULT_ITEM_SPACINGS: number;
declare const useGridLayout: (props: GridListBaseProps) => {
    itemContainerStyle: {
        width: number;
        marginRight: number;
        marginBottom: number;
    };
    numberOfColumns: number;
    itemSize: number;
};
export default useGridLayout;
