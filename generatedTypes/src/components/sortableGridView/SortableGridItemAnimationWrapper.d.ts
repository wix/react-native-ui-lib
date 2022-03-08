import React from 'react';
import Animated from 'react-native-reanimated';
import { ItemsOrder } from './config';
interface SortableGridItemAnimationWrapperProps {
    children: React.ReactNode;
    index: number;
    itemsOrder: Animated.SharedValue<ItemsOrder>;
    onItemLayout: (index: number, layout: {
        x: number;
        y: number;
    }) => void;
    getPositionByOrder: (newOrder: number, oldOrder: number) => {
        x: number;
        y: number;
    };
    getOrderByPosition: (x: number, y: number) => number;
    getIdByItemOrder: (itemsOrder: ItemsOrder, itemOrder: number) => number;
    getItemOrderById: (itemsOrder: ItemsOrder, itemId: number) => number;
    onChange: () => void;
}
declare const SortableGridItemAnimationWrapper: React.FC<SortableGridItemAnimationWrapperProps>;
export default SortableGridItemAnimationWrapper;
