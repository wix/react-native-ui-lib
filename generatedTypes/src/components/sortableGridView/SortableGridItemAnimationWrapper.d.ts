import React from 'react';
import Animated from 'react-native-reanimated';
import { ItemsOrder } from './config';
interface SortableGridItemAnimationWrapperProps {
    children: React.ReactNode;
    id: string;
    itemSize: number;
    numOfColumns: number;
    itemsOrder: Animated.SharedValue<ItemsOrder>;
    scrollViewRef: React.RefObject<Animated.ScrollView>;
    scrollY: Animated.SharedValue<number>;
    getPositionByOrder: (order: number) => {
        x: number;
        y: number;
    };
    getOrderByPosition: (x: number, y: number) => number;
    itemSpacing?: number;
}
declare const SortableGridItemAnimationWrapper: React.FC<SortableGridItemAnimationWrapperProps>;
export default SortableGridItemAnimationWrapper;
