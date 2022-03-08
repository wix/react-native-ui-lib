import React, {useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {
  // AnimatedStyleProp,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

import {animationConfig, ItemsOrder} from './config';

// const ABSOLUTE_ITEM: AnimatedStyleProp<ViewStyle> = {
//   position: 'absolute',
//   top: 0,
//   left: 0
// };

interface SortableGridItemAnimationWrapperProps {
  children: React.ReactNode;
  // id: string;
  index: number;
  // itemSize: number;
  // numOfColumns: number;
  itemsOrder: Animated.SharedValue<ItemsOrder>;
  onItemLayout: (index: number, layout: {x: number; y: number}) => void;
  // scrollViewRef: React.RefObject<Animated.ScrollView>;
  // scrollY: Animated.SharedValue<number>;
  getPositionByOrder: (newOrder: number, oldOrder: number) => {x: number; y: number};
  getOrderByPosition: (x: number, y: number) => number;
  getIdByItemOrder: (itemsOrder: ItemsOrder, itemOrder: number) => number;
  getItemOrderById: (itemsOrder: ItemsOrder, itemId: number) => number;
  onChange: () => void;
  // itemSpacing?: number;
}

const SortableGridItemAnimationWrapper: React.FC<SortableGridItemAnimationWrapperProps> = props => {
  const {
    itemsOrder,
    getPositionByOrder,
    getOrderByPosition,
    getIdByItemOrder,
    getItemOrderById,
    index,
    onItemLayout,
    onChange
  } = props;

  // const screenHeight = Constants.screenHeight;
  // const contentHeight = (Object.keys(itemsOrder.value).length / numOfColumns) * itemSize;
  // const itemPosition = getPositionByOrder(itemsOrder.value[id]);

  const translateX = useSharedValue(0 /* itemPosition.x */);
  const translateY = useSharedValue(0 /* itemPosition.y */);
  const shouldScaleItem = useSharedValue(false);
  const shouldFrontItem = useSharedValue(false);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    'worklet';
    const {x, y} = event.nativeEvent.layout;
    onItemLayout(index, {x, y});
  }, []);

  // useAnimatedReaction(() => itemsOrder.value[index],
  useAnimatedReaction(() => itemsOrder.value.indexOf(index), // Note: It doesn't work with the getItemOrderById util
    (newOrder, prevOrder) => {
      if (prevOrder !== null && newOrder !== prevOrder) {
        const translation = getPositionByOrder(newOrder, prevOrder);

        translateX.value = withTiming(translateX.value + translation.x, animationConfig);
        translateY.value = withTiming(translateY.value + translation.y, animationConfig);
      } else if (newOrder === index) {
        translateX.value = withTiming(0, animationConfig);
        translateY.value = withTiming(0, animationConfig);
      }
    });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number; originalItemsOrder: number[]}
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
      context.y = translateY.value;
      shouldScaleItem.value = true;
      shouldFrontItem.value = true;
      context.originalItemsOrder = [...itemsOrder.value];
    },
    onActive: ({translationX, translationY}, context) => {
      translateX.value = context.x + translationX;
      translateY.value = context.y + translationY;

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

      // Handle scrolling
      /* const lowerBound = scrollY.value;
      const upperBound = scrollY.value + screenHeight - itemSize * 1.5;
      const maxScrollValue = contentHeight - screenHeight;
      const leftToScroll = maxScrollValue - scrollY.value;
      if (translateY.value < lowerBound) {
        const diff = Math.min(lowerBound - translateY.value, lowerBound);
        scrollY.value -= diff;
        context.y -= diff;
        translateY.value = context.y + translationY;
        scrollTo(scrollViewRef, 0, scrollY.value, false);
      }
      if (translateY.value > upperBound) {
        const diff = Math.min(translateY.value - upperBound, leftToScroll);
        scrollY.value += diff;
        context.y += diff;
        translateY.value = context.y + translationY;
        scrollTo(scrollViewRef, 0, scrollY.value, false);
      } */
    },
    onEnd: (_, context) => {
      const translation = getPositionByOrder(getItemOrderById(itemsOrder.value, index),
        getItemOrderById(context.originalItemsOrder, index));

      translateX.value = withTiming(context.x + translation.x, animationConfig, () => {
        shouldFrontItem.value = false;
      });
      translateY.value = withTiming(context.y + translation.y, animationConfig);
    },
    onFinish: () => {
      shouldScaleItem.value = false;
      runOnJS(onChange)();
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(shouldScaleItem.value ? 1.1 : 1);
    const zIndex = shouldFrontItem.value ? 100 : 0;

    return {
      // width: itemSize,
      // height: itemSize,
      zIndex,
      transform: [{translateX: translateX.value}, {translateY: translateY.value}, {scale}]
    };
  });

  return (
    <Animated.View style={animatedStyle} onLayout={onLayout}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View>{props.children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default SortableGridItemAnimationWrapper;
