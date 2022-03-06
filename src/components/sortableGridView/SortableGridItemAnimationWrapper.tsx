import React, {useCallback, useEffect} from 'react';
import {LayoutChangeEvent /* , StyleSheet, ViewStyle */} from 'react-native';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {
  // AnimatedStyleProp,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  // scrollTo,
  runOnJS
} from 'react-native-reanimated';
// import Constants from '../../commons/Constants';
import {animationConfig, /* DEFAULT_MARGIN, */ ItemsOrder} from './config';

// const ABSOLUTE_ITEM: AnimatedStyleProp<ViewStyle> = {
//   position: 'absolute',
//   top: 0,
//   left: 0
// };

interface SortableGridItemAnimationWrapperProps {
  children: React.ReactNode;
  id: string;
  index: number;
  // itemSize: number;
  // numOfColumns: number;
  itemsOrder: Animated.SharedValue<ItemsOrder>;
  onItemLayout: (index: number, layout: {x: number; y: number}) => void;
  // scrollViewRef: React.RefObject<Animated.ScrollView>;
  // scrollY: Animated.SharedValue<number>;
  getPositionByOrder: (newOrder: number, oldOrder: number) => {x: number; y: number};
  getOrderByPosition: (x: number, y: number) => number;
  onChange: () => void;
  // itemSpacing?: number;
}

const SortableGridItemAnimationWrapper: React.FC<SortableGridItemAnimationWrapperProps> = props => {
  const {
    id,
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

      console.log('ethan - useAnimatedReaction', index, prevOrder, newOrder)
      if (prevOrder && newOrder !== prevOrder) {
        const translation = getPositionByOrder(newOrder, prevOrder);

        console.log('ethan - reaction',
          ' index:',
          index,
          ' prevOrder:',
          prevOrder,
          ' newOrder:',
          newOrder,
          ' translation:',
          translation);

        translateX.value = withTiming(translateX.value + translation.x, animationConfig);
        translateY.value = withTiming(translateY.value + translation.y, animationConfig);
      } else if (newOrder === index) {
        translateX.value = withTiming(0, animationConfig);
        translateY.value = withTiming(0, animationConfig);
      }
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

      // Swapping items
      // const oldOrder = itemsOrder.value[index];
      const oldOrder = getItemOrderById(index);
      const newOrder = getOrderByPosition(translateX.value, translateY.value) + index;

      console.log('ethan - orders', oldOrder, newOrder);

      if (oldOrder !== newOrder) {
        // const itemIdToSwap = Object.keys(itemsOrder.value).find(itemId => itemsOrder.value[itemId] === newOrder);
        // const itemIdToSwap = itemsOrder.value[newOrder];
        const itemIdToSwap = getIdByItemOrder(newOrder);

        console.log('ethan - time to swap with', itemIdToSwap);

        if (itemIdToSwap) {
          // const newItemsOrder = Object.assign({}, itemsOrder.value);
          const newItemsOrder = [...itemsOrder.value];
          // newItemsOrder[index] = newOrder;
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
    onEnd: () => {
      // const translation = getPositionByOrder(itemsOrder.value[index], index);
      translateX.value = withTiming(translateX.value, animationConfig, () => {
        shouldFrontItem.value = false;
      });
      translateY.value = withTiming(translateY.value, animationConfig);
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
    <Animated.View style={[animatedStyle]} onLayout={onLayout}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={
            [
              /* StyleSheet.absoluteFill, */
              /* {margin: itemSpacing ?? DEFAULT_MARGIN * 2} */
            ]
          }
        >
          {props.children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default SortableGridItemAnimationWrapper;
