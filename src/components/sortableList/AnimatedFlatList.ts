import React from 'react';
import {FlatListProps} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export type AnimatedFlatListProps<ItemT> = Animated.AnimateProps<
  // @ts-expect-error TODO:
  FlatListProps<ItemT> & {
    ref: React.Ref<FlatList<ItemT>>;
    simultaneousHandlers?: React.Ref<any> | React.Ref<any>[];
  }
>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as unknown as <ItemT>(
  props: AnimatedFlatListProps<ItemT>
) => React.ReactElement;

export default AnimatedFlatList;
