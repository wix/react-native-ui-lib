import React from 'react';
import { FlatListProps } from 'react-native';
import Animated from 'react-native-reanimated';
export declare type AnimatedFlatListProps<ItemT> = Animated.AnimateProps<FlatListProps<ItemT>>;
declare const AnimatedFlatList: <ItemT>(props: AnimatedFlatListProps<ItemT>) => React.ReactElement;
export default AnimatedFlatList;
