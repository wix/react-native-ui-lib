import React, { ReactNode } from 'react';
import Animated from 'react-native-reanimated';
interface ItemProps {
    item: any;
    index: number;
    positions: Animated.SharedValue<number[]>;
    scrollY: Animated.SharedValue<number>;
    contentHeight: number;
    containerHeight?: number;
    scrolViewRef: React.RefObject<Animated.ScrollView>;
    itemHeight: number;
    onFinish: (item: any) => void;
    renderItem: (item: any) => ReactNode;
    dragableAreaSize?: number;
}
declare const Item: ({ dragableAreaSize, item, positions, index, containerHeight, contentHeight, scrollY, scrolViewRef, itemHeight, onFinish, renderItem }: ItemProps) => JSX.Element;
export default Item;
