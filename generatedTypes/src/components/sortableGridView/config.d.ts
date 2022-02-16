export declare const DEFAULT_MARGIN: number;
export declare const DEFAULT_NO_OF_COLUMNS = 3;
export declare const getItemSize: (numOfColumns: number, viewWidth?: number | undefined) => number;
export declare const animationConfig: {
    easing: (value: number) => number;
    duration: number;
};
export declare type ItemsOrder = {
    [id: string]: number;
};
export declare const useSortableGridConfig: (itemSize: number, numOfColumns: number) => {
    getPositionByOrder: (order: number) => {
        x: number;
        y: number;
    };
    getOrderByPosition: (positionX: number, positionY: number) => number;
};
