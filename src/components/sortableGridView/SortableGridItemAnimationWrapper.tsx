import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {AnimatedStyleProp, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Constants} from 'react-native-ui-lib';
import {ItemsOrder} from '.';
import {animationConfig, getPositionByOrder} from './config';

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
  const isGestureActive = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {x: number; y: number}>({
    onStart: (_, context) => {
      context.x = translateX.value;
      context.y = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({translationX, translationY}, context) => {
      translateX.value = context.x + translationX;
      translateY.value = context.y + translationY;
    },
    onEnd: () => {
      const destination = getPositionByOrder(itemsOrder.value[id], numOfColumns, itemSize);
      // @TODO: current bug is when value of withTiming is the same as current tranlaste value the callback does not call
      // Should've been fixed in https://github.com/software-mansion/react-native-reanimated/pull/2211
      translateX.value = withTiming(destination.x, animationConfig, () => isGestureActive.value = false);
      translateY.value = withTiming(destination.y, animationConfig, () => isGestureActive.value = false);
    }
  });

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    // const scale = isGestureActive.value ? 1.1 : 1;
    return {
      ...ABSOLUTE_ITEM,
      width: itemSize,
      height: itemSize,
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        // {scale}
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

