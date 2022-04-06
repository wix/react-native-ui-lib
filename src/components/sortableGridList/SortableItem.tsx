import React, {PropsWithChildren, useCallback} from 'react';
import {LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';
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
  style: StyleProp<ViewStyle>;
}

function SortableItem(props: PropsWithChildren<SortableItemProps>) {
  const {
    index,
    itemsOrder,
    onChange,
    style,
    getItemOrderById,
    getOrderByPosition,
    getIdByItemOrder,
    getTranslationByOrderChange,
    updateItemLayout
  } = props;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const isFloating = useSharedValue(false);
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
      isFloating.value = true;
    })
    .onTouchesCancelled(() => {
      if (!isDragging.value) {
        isFloating.value = false;
      }
    })
    .minDuration(250);

  const dragGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_e, state) => {
      if (isFloating.value) {
        isDragging.value = true;
        state.activate();
      } else {
        isDragging.value = false;
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
        isFloating.value = false;
        if (tempItemsOrder.value.toString() !== itemsOrder.value.toString()) {
          runOnJS(onChange)();
        }
      }
    })
    .simultaneousWithExternalGesture(longPressGesture);

  const gesture = Gesture.Race(dragGesture, longPressGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isFloating.value ? 1.1 : 1);
    const zIndex = isFloating.value ? 100 : withTiming(0, animationConfig);

    return {
      zIndex,
      transform: [{translateX: translateX.value}, {translateY: translateY.value}, {scale}]
    };
  });
  return (
    <View reanimated style={[style, animatedStyle]} onLayout={onLayout}>
      <GestureDetector gesture={gesture}>
        <View>{props.children}</View>
      </GestureDetector>
    </View>
  );
}

export default SortableItem;
