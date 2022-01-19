import { ReactElement } from 'react';
import Animated from 'react-native-reanimated';
export declare type ListRenderItemProps<T> = {
    item: T;
    index: number;
};
export declare type ListRenderItem<T> = ({ item, index }: ListRenderItemProps<T>) => ReactElement;
interface ItemProps<T> {
    item: any;
    index: number;
    positions: Animated.SharedValue<number[]>;
    scrollY: Animated.SharedValue<number>;
    contentHeight: number;
    containerHeight?: number;
    listRef: any;
    itemHeight: number;
    onFinishDrag: (list: T[]) => void;
    renderItem: ListRenderItem<T>;
    draggableAreaSize?: number;
    draggableAreaSide: 'left' | 'right';
}
declare const Item: ({ draggableAreaSize, draggableAreaSide, item, positions, index, containerHeight, contentHeight, scrollY, listRef, itemHeight, onFinishDrag, renderItem }: ItemProps<any>) => JSX.Element;
export default Item;
