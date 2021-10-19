/// <reference types="react" />
import Animated from 'react-native-reanimated';
interface ItemProps<T> {
    item: any;
    index: number;
    positions: Animated.SharedValue<number[]>;
    scrollY: Animated.SharedValue<number>;
    contentHeight: number;
    containerHeight?: number;
    listRef: any;
    itemHeight: number;
    onFinish: (list: T[]) => void;
    renderItem: ({ item, index }: {
        item: T;
        index: number;
    }) => JSX.Element;
    draggableAreaSize?: number;
    draggableAreaSide: 'left' | 'right';
}
declare const Item: ({ draggableAreaSize, draggableAreaSide, item, positions, index, containerHeight, contentHeight, scrollY, listRef, itemHeight, onFinish, renderItem }: ItemProps<any>) => JSX.Element;
export default Item;
