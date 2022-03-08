import Animated from 'react-native-reanimated';
export declare const WINDOW_WIDTH: number;
export declare const DEFAULT_NO_OF_COLUMNS = 3;
export declare const getItemSize: (numOfColumns: number, viewWidth: number) => number;
export declare const animationConfig: {
    easing: Animated.EasingFunction;
    duration: number;
};
export declare type ItemsLayouts = ({
    x: number;
    y: number;
} | undefined)[];
export declare type ItemsOrder = number[];
export declare const useSortableGridConfig: (itemsLayouts: Animated.SharedValue<ItemsLayouts>, itemSize: number, numOfColumns: number) => {
    updateItemLayout: (index: number, layout: {
        x: number;
        y: number;
    }) => void;
    getPositionByOrder: (newOrder: number, oldOrder: number) => {
        x: number;
        y: number;
    };
    getOrderByPosition: (positionX: number, positionY: number) => number;
    getItemOrderById: (itemsOrder: ItemsOrder, itemId: number) => number;
    getIdByItemOrder: (itemsOrder: ItemsOrder, orderIndex: number) => number;
};
