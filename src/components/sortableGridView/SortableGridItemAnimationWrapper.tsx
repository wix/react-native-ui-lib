import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {AnimatedStyleProp, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Constants} from 'react-native-ui-lib';
import {ItemsOrder} from '.';
import {animationConfig, getOrderByPosition, getPositionByOrder} from './config';

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
  // @TODO: fetch config getters (getPositionByOrder, getOrderByPosition) with set numOfColumns and itemSize per render.
  const itemPosition = getPositionByOrder(itemsOrder.value[id], numOfColumns, itemSize);

  const translateX = useSharedValue(itemPosition.x);
  const translateY = useSharedValue(itemPosition.y);
  const shouldScaleItem = useSharedValue(false);
  const shouldFrontItem = useSharedValue(false);

  useAnimatedReaction(() => itemsOrder.value[id], (newOrder) => {
    const newPosition = getPositionByOrder(newOrder, numOfColumns, itemSize);
    translateX.value = withTiming(newPosition.x, animationConfig);
    translateY.value = withTiming(newPosition.y, animationConfig);
  });

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {x: number; y: number}>({
    onStart: (_, context) => {
      context.x = translateX.value;
      context.y = translateY.value;
      shouldScaleItem.value = true;
      shouldFrontItem.value = true;
    },
    onActive: ({translationX, translationY}, context) => {
      translateX.value = context.x + translationX;
      translateY.value = context.y + translationY;

      const oldOrder = itemsOrder.value[id];
      const newOrder = getOrderByPosition(translateX.value, translateY.value, numOfColumns, itemSize);
      if (oldOrder !== newOrder) {
        const itemIdToSwap = Object.keys(itemsOrder.value).find((itemId) => itemsOrder.value[itemId] === newOrder);
        if (itemIdToSwap) {
          // @TODO: check if I can use Object.assign instead (hermes ?)
          const newItemsOrder = JSON.parse(JSON.stringify(itemsOrder.value));
          newItemsOrder[id] = newOrder;
          newItemsOrder[itemIdToSwap] = oldOrder;
          itemsOrder.value = newItemsOrder;
        }
      }
    },
    onEnd: () => {
      const destination = getPositionByOrder(itemsOrder.value[id], numOfColumns, itemSize);
      // @TODO: current bug is when value of withTiming is the same as current translate value the callback does not call
      // Should've been fixed in https://github.com/software-mansion/react-native-reanimated/pull/2211
      // this results in making 2 different animation values for scale and zIndex
      translateX.value = withTiming(destination.x, animationConfig, () => shouldFrontItem.value = false);
      translateY.value = withTiming(destination.y, animationConfig);
    },
    onFinish: () => {
      shouldScaleItem.value = false;
    }
  });

  const style = useAnimatedStyle(() => {
    const scale = shouldScaleItem.value ? 1.1 : 1;
    const zIndex = shouldFrontItem.value ? 100 : 0;
    return {
      ...ABSOLUTE_ITEM,
      width: itemSize,
      height: itemSize,
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale}
      ]
    };
  });
  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {props.children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default SortableGridItemAnimationWrapper;

