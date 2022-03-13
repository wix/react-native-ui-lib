import React from 'react';
import { FlatListProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
export declare type AnimatedFlatListProps<ItemT> = Animated.AnimateProps<FlatListProps<ItemT> & {
    ref: React.Ref<FlatList<ItemT>>;
    simultaneousHandlers?: React.Ref<any> | React.Ref<any>[];
}>;
declare const AnimatedFlatList: <ItemT>(props: AnimatedFlatListProps<ItemT>) => React.ReactElement;
export default AnimatedFlatList;
