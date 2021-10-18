export declare const ITEM_HEIGHT = 100;
export declare const animationConfig: {
    easing: (easing: (value: number) => number) => (value: number) => number;
    duration: number;
};
export declare const getPosition: (order: number, itemHeight: number) => number;
export declare const getOrder: (y: number, itemHeight: number) => number;
