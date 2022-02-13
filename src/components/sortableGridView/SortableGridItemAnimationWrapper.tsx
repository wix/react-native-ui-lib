import React from 'react';
import {ViewStyle} from 'react-native';
import Animated, {AnimatedStyleProp, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Constants} from 'react-native-ui-lib';
import {ItemsOrder} from '.';
import {getPositionByOrder} from './config';

const ABSOLUTE_ITEM: AnimatedStyleProp<ViewStyle> = {
  position: 'absolute',
  top: 0,
  left: 0
};

interface SortableGridItemAnimationWrapperProps {
    children: React.ReactNode;
    id: string;
    itemSize: number;
    itemsOrder: Animated.SharedValue<ItemsOrder>
    // If numOfColumns could be cleaned that'd be awesome
    numOfColumns: number;
}

const SortableGridItemAnimationWrapper: React.FC<SortableGridItemAnimationWrapperProps> = (props) => {
  const {id, itemSize, numOfColumns, itemsOrder} = props;
  const screenHeight = Constants.screenHeight;
  const contentHeight = (Object.keys(itemsOrder.value).length / numOfColumns) * itemSize;
  const itemPosition = getPositionByOrder(itemsOrder.value[id], numOfColumns);

  const translateX = useSharedValue(itemPosition.x);
  const translateY = useSharedValue(itemPosition.y);

  const style = useAnimatedStyle(() => {
    return {
      ...ABSOLUTE_ITEM,
      width: itemSize,
      height: itemSize,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value}
      ]
    };
  });
  return (
    <Animated.View style={style}>
      {props.children}
    </Animated.View>
  );
};

export default SortableGridItemAnimationWrapper;

