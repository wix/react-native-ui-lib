import React from 'react';
import {FlatListProps} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

// @ts-expect-error
export type AnimatedFlatListProps<ItemT> = Animated.AnimateProps<FlatListProps<ItemT>>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as <ItemT>(
  props: AnimatedFlatListProps<ItemT>
) => React.ReactElement;

export default AnimatedFlatList;
