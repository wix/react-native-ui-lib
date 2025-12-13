import React, {PropsWithChildren, useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import _ from 'lodash';
import {useDidUpdate} from 'hooks';
import usePresenter, {animationConfig} from './usePresenter';
import {SortableItemProps} from './types';
import View from '../view';

function SortableItem(props: PropsWithChildren<SortableItemProps & ReturnType<typeof usePresenter>>) {
  const {
    data,
    id,
    itemsOrder,
    onChange,
    style,
    getItemOrderById,
    getOrderByPosition,
    getIdByItemOrder,
    getTranslationByOrderChange,
    updateItemLayout,
    orderByIndex = false
  } = props;
  const initialIndex = useSharedValue(_.map(data, 'id').indexOf(id));
  const currIndex = useSharedValue(initialIndex.value);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const isDragging = useSharedValue(false);
  const tempItemsOrder = useSharedValue(itemsOrder.value);
  const tempTranslateX = useSharedValue(0);
  const tempTranslateY = useSharedValue(0);

  // const dataManuallyChanged = useSharedValue(false);

  useDidUpdate(() => {
    // dataManuallyChanged.value = true;
    const newItemIndex = _.map(data, 'id').indexOf(id);

    initialIndex.value = newItemIndex;
    currIndex.value = newItemIndex;

    translateX.value = 0;
    translateY.value = 0;
  }, [data]);

  // useAnimatedReaction(() => itemsOrder.value,
  //   (currItemsOrder, prevItemsOrder) => {
  //     // Note: Unfortunately itemsOrder sharedValue is being initialized on each render
  //     // Therefore I added this extra check here that compares current and previous values
  //     // See open issue: https://github.com/software-mansion/react-native-reanimated/issues/3224
  //     if (prevItemsOrder === null || currItemsOrder.join(',') === prevItemsOrder.join(',')) {
  //       return;
  //     } else {
  //       const newOrder = getItemOrderById(currItemsOrder, id);
  //       const prevOrder = getItemOrderById(prevItemsOrder, id);

  //       /* In case the order of the item has returned back to its initial index we reset its position */
  //       if (newOrder === initialIndex.value) {
  //         /* Reset without an animation when the change is due to manual data change */
  //         if (dataManuallyChanged.value) {
  //           translateX.value = 0;
  //           translateY.value = 0;
  //           /* Reset with an animation when the change id due to user reordering */
  //         } else {
  //           translateX.value = withTiming(0, animationConfig);
  //           translateY.value = withTiming(0, animationConfig);
  //         }
  //         dataManuallyChanged.value = false;
  //         /* Handle an order change, animate item to its new position  */
  //       } else if (newOrder !== prevOrder) {
  //         // const translation = getTranslationByOrderChange(newOrder, prevOrder);
  //         const translation = getTranslationByOrderChange(newOrder, initialIndex.value);
  //         translateX.value = withTiming(/* translateX.value +  */translation.x, animationConfig);
  //         translateY.value = withTiming(/* translateY.value +  */translation.y, animationConfig);
  //         // translateX.value = withTiming(0, animationConfig);
  //         // translateY.value = withTiming(0, animationConfig);
  //       }
  //     }
  //   });

  useAnimatedReaction(() => getItemOrderById(itemsOrder.value, id),
    (newOrder, prevOrder) => {
      if (prevOrder === null || newOrder === prevOrder) {
        return;
      }

      currIndex.value = newOrder;
      if (!isDragging.value) {
        const translation = getTranslationByOrderChange(currIndex.value, initialIndex.value);

        translateX.value = withTiming(translation.x, animationConfig);
        translateY.value = withTiming(translation.y, animationConfig);
      }
    },
    []);

  useAnimatedReaction(() => isDragging.value,
    (isDragging, wasDragging) => {
      if (isDragging && !wasDragging) {
        zIndex.value = withTiming(100, animationConfig);
        scale.value = withSpring(1.1);
      } else if (!isDragging && wasDragging) {
        zIndex.value = withTiming(0, animationConfig);
        scale.value = withSpring(1);
      }
    },
    []);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    'worklet';
    const {width, height} = event.nativeEvent.layout;
    updateItemLayout({width, height});
  }, []);

  const dragOnLongPressGesture = Gesture.Pan()
    .activateAfterLongPress(250)
    .onStart(() => {
      isDragging.value = true;
      const translation = getTranslationByOrderChange(currIndex.value, initialIndex.value);
      translateX.value = translation.x;
      translateY.value = translation.y;

      tempTranslateX.value = translateX.value;
      tempTranslateY.value = translateY.value;
      tempItemsOrder.value = itemsOrder.value;
    })
    .onUpdate(event => {
      translateX.value = tempTranslateX.value + event.translationX;
      translateY.value = tempTranslateY.value + event.translationY;

      // Swapping items
      const oldOrder = getItemOrderById(itemsOrder.value, id);
      const newOrder = getOrderByPosition(translateX.value, translateY.value) + initialIndex.value;

      if (oldOrder !== newOrder) {
        const itemIdToSwap = getIdByItemOrder(itemsOrder.value, newOrder);

        if (itemIdToSwap !== undefined) {
          const newItemsOrder = [...itemsOrder.value];
          if (orderByIndex) {
            const shouldMoveOthersDown = newOrder > oldOrder;
            if (shouldMoveOthersDown) {
              for (let i = oldOrder; i < newOrder; i++) {
                newItemsOrder[i] = itemsOrder.value[i + 1];
              }
            } else {
              for (let i = oldOrder; i > newOrder; i--) {
                newItemsOrder[i] = itemsOrder.value[i - 1];
              }
            }
            newItemsOrder[newOrder] = id;
          } else {
            newItemsOrder[newOrder] = id;
            newItemsOrder[oldOrder] = itemIdToSwap;
          }

          itemsOrder.value = newItemsOrder;
        }
      }
    })
    .onEnd(() => {
      const translation = getTranslationByOrderChange(getItemOrderById(itemsOrder.value, id),
        getItemOrderById(tempItemsOrder.value, id));

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
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: Math.round(zIndex.value),
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value}
      ]
    };
  });

  return (
    <View reanimated style={[style, animatedStyle]} onLayout={onLayout}>
      <GestureDetector gesture={dragOnLongPressGesture}>
        <View>{props.children}</View>
      </GestureDetector>
    </View>
  );
}

export default React.memo(SortableItem);
