import React, {PropsWithChildren, useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import usePresenter, {ItemsOrder, animationConfig} from './usePresenter';
import View from '../view';

interface SortableItemProps extends ReturnType<typeof usePresenter> {
  index: number;
  itemsOrder: Animated.SharedValue<ItemsOrder>;
  onChange: () => void;
}

function SortableItem(props: PropsWithChildren<SortableItemProps>) {
  const {
    index,
    itemsOrder,
    onChange,
    getItemOrderById,
    getOrderByPosition,
    getIdByItemOrder,
    getTranslationByOrderChange,
    updateItemLayout
  } = props;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const isDragging = useSharedValue(false);
  const tempItemsOrder = useSharedValue(itemsOrder.value);
  const tempTranslateX = useSharedValue(0);
  const tempTranslateY = useSharedValue(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    'worklet';
    const {width, height} = event.nativeEvent.layout;
    updateItemLayout(index, {width, height});
  }, []);

  useAnimatedReaction(() => itemsOrder.value.indexOf(index), // Note: It doesn't work with the getItemOrderById util
    (newOrder, prevOrder) => {
      if (prevOrder !== null && newOrder !== prevOrder) {
        const translation = getTranslationByOrderChange(newOrder, prevOrder);
        translateX.value = withTiming(translateX.value + translation.x, animationConfig);
        translateY.value = withTiming(translateY.value + translation.y, animationConfig);
      } else if (newOrder === index) {
        translateX.value = withTiming(0, animationConfig);
        translateY.value = withTiming(0, animationConfig);
      }
    });

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      isDragging.value = true;
    })
    .minDuration(250);

  const dragGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_e, state) => {
      if (isDragging.value) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onStart(() => {
      tempTranslateX.value = translateX.value;
      tempTranslateY.value = translateY.value;
      tempItemsOrder.value = itemsOrder.value;
    })
    .onUpdate(event => {
      translateX.value = tempTranslateX.value + event.translationX;
      translateY.value = tempTranslateY.value + event.translationY;

      // Swapping items
      const oldOrder = getItemOrderById(itemsOrder.value, index);
      const newOrder = getOrderByPosition(translateX.value, translateY.value) + index;

      if (oldOrder !== newOrder) {
        const itemIdToSwap = getIdByItemOrder(itemsOrder.value, newOrder);

        if (itemIdToSwap !== undefined) {
          const newItemsOrder = [...itemsOrder.value];
          newItemsOrder[newOrder] = index;
          newItemsOrder[oldOrder] = itemIdToSwap;
          itemsOrder.value = newItemsOrder;
        }
      }
    })
    .onEnd(() => {
      const translation = getTranslationByOrderChange(getItemOrderById(itemsOrder.value, index),
        getItemOrderById(tempItemsOrder.value, index));

      translateX.value = withTiming(tempTranslateX.value + translation.x, animationConfig);
      translateY.value = withTiming(tempTranslateY.value + translation.y, animationConfig);
    })
    .onFinalize(() => {
      if (isDragging.value) {
        isDragging.value = false;
        if (tempItemsOrder.value.toString() !== itemsOrder.value.toString()) {
          runOnJS(onChange)();
        }
      }
    })
    .simultaneousWithExternalGesture(longPressGesture);

  const gesture = Gesture.Race(dragGesture, longPressGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isDragging.value ? 1.1 : 1);
    const zIndex = isDragging.value ? 100 : 0;

    return {
      zIndex,
      transform: [{translateX: translateX.value}, {translateY: translateY.value}, {scale}]
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <View reanimated style={animatedStyle} onLayout={onLayout}>
        {props.children}
      </View>
    </GestureDetector>
  );
}

export default SortableItem;
