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
    updateItemLayout
  } = props;
  const initialIndex = useSharedValue(_.map(data, 'id').indexOf(id));
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const isFloating = useSharedValue(false);
  const isDragging = useSharedValue(false);
  const tempItemsOrder = useSharedValue(itemsOrder.value);
  const tempTranslateX = useSharedValue(0);
  const tempTranslateY = useSharedValue(0);

  const dataManuallyChanged = useSharedValue(false);

  useDidUpdate(() => {
    dataManuallyChanged.value = true;
    initialIndex.value = _.map(data, 'id').indexOf(id);
  }, [data]);

  useAnimatedReaction(() => itemsOrder.value,
    (currItemsOrder, prevItemsOrder) => {
      // Note: Unfortunately itemsOrder sharedValue is being initialized on each render
      // Therefore I added this extra check here that compares current and previous values
      // See open issue: https://github.com/software-mansion/react-native-reanimated/issues/3224
      if (prevItemsOrder === null || currItemsOrder.join(',') === prevItemsOrder.join(',')) {
        return;
      } else {
        const newOrder = getItemOrderById(currItemsOrder, id);
        const prevOrder = getItemOrderById(prevItemsOrder, id);

        /* In case the order of the item has returned back to its initial index we reset its position */
        if (newOrder === initialIndex.value) {
          /* Reset without an animation when the change is due to manual data change */
          if (dataManuallyChanged.value) {
            translateX.value = 0;
            translateY.value = 0;
          /* Reset with an animation when the change id due to user reordering */
          } else {
            translateX.value = withTiming(0, animationConfig);
            translateY.value = withTiming(0, animationConfig);
          }
          dataManuallyChanged.value = false;
        /* Handle an order change, animate item to its new position  */
        } else if (newOrder !== prevOrder) {
          const translation = getTranslationByOrderChange(newOrder, prevOrder);
          translateX.value = withTiming(translateX.value + translation.x, animationConfig);
          translateY.value = withTiming(translateY.value + translation.y, animationConfig);
        }
      }
    });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    'worklet';
    const {width, height} = event.nativeEvent.layout;
    updateItemLayout({width, height});
  }, []);

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
      const oldOrder = getItemOrderById(itemsOrder.value, id);
      const newOrder = getOrderByPosition(translateX.value, translateY.value) + initialIndex.value;

      if (oldOrder !== newOrder) {
        const itemIdToSwap = getIdByItemOrder(itemsOrder.value, newOrder);

        if (itemIdToSwap !== undefined) {
          const newItemsOrder = [...itemsOrder.value];
          newItemsOrder[newOrder] = id;
          newItemsOrder[oldOrder] = itemIdToSwap;
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
      {/* @ts-expect-error related to children type issue that started on react 18 */}
      <GestureDetector gesture={gesture}>
        <View>{props.children}</View>
      </GestureDetector>
    </View>
  );
}

export default React.memo(SortableItem);
