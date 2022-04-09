export declare const WINDOW_WIDTH: number;
export declare const DEFAULT_NO_OF_COLUMNS = 3;
export declare const getItemSize: (numOfColumns: number, viewWidth: number) => number;
export declare const animationConfig: {
    easing: (value: number) => number;
    duration: number;
};
export declare type ItemsLayouts = ({
    width: number;
    height: number;
} | undefined)[];
export declare type ItemsOrder = number[];
declare const usePresenter: (itemsSize: number, numOfColumns: number, itemSpacing: number) => {
    updateItemLayout: (index: number, layout: {
        width: number;
        height: number;
    }) => void;
    getTranslationByOrderChange: (newOrder: number, oldOrder: number) => {
        x: number;
        y: number;
    };
    getOrderByPosition: (positionX: number, positionY: number) => number;
    getItemOrderById: (itemsOrder: ItemsOrder, itemId: number) => number;
    getIdByItemOrder: (itemsOrder: ItemsOrder, orderIndex: number) => number;
};
export default usePresenter;
