/* eslint-disable react-hooks/exhaustive-deps */
import React, {PropsWithChildren, useCallback, useContext} from 'react';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  Easing,
  runOnJS,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import {GestureDetector, GestureUpdateEvent, PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import View from '../view';
import SortableListContext from './SortableListContext';
import usePresenter from './usePresenter';
import useDragAfterLongPressGesture from './useDragAfterLongPressGesture';

interface SortableListItemProps {
  index: number;
}

type Props = PropsWithChildren<SortableListItemProps>;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

const SortableListItem = (props: Props) => {
  const {children, index} = props;

  const {itemHeight, onItemLayout, itemsOrder, onChange} = useContext(SortableListContext);
  const {getTranslationByIndexChange, getItemIndexById, getIndexByPosition, getIdByItemIndex} = usePresenter();
  const translateY = useSharedValue(0);
  const tempTranslateY = useSharedValue(0);
  const tempItemsOrder = useSharedValue(itemsOrder.value);

  useAnimatedReaction(() => itemsOrder.value.indexOf(index),
    (newIndex, oldIndex) => {
      if (oldIndex !== null && oldIndex !== undefined && newIndex !== undefined && newIndex !== oldIndex) {
        const translation = getTranslationByIndexChange(newIndex, oldIndex, itemHeight.value);
        translateY.value = withTiming(translateY.value + translation, animationConfig);
      } else if (newIndex === index) {
        translateY.value = withTiming(0, animationConfig);
      }
    });

  const onDragStart = useCallback(() => {
    'worklet';
    tempTranslateY.value = translateY.value;
    tempItemsOrder.value = itemsOrder.value;
  }, []);

  const onDragUpdate = useCallback((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    'worklet';
    translateY.value = tempTranslateY.value + event.translationY;

    // Swapping items
    const oldOrder = getItemIndexById(itemsOrder.value, index);
    const newOrder = getIndexByPosition(translateY.value, itemHeight.value) + index;

    if (oldOrder !== newOrder) {
      const itemIdToSwap = getIdByItemIndex(itemsOrder.value, newOrder);

      if (itemIdToSwap !== undefined) {
        const newItemsOrder = [...itemsOrder.value];
        newItemsOrder[newOrder] = index;
        newItemsOrder[oldOrder] = itemIdToSwap;
        itemsOrder.value = newItemsOrder;
      }
    }
  }, []);

  const onDragEnd = useCallback(() => {
    'worklet';
    const translation = getTranslationByIndexChange(getItemIndexById(itemsOrder.value, index),
      getItemIndexById(tempItemsOrder.value, index),
      itemHeight.value);

    translateY.value = withTiming(tempTranslateY.value + translation, animationConfig);

    if (tempItemsOrder.value.toString() !== itemsOrder.value.toString()) {
      runOnJS(onChange)();
    }
  }, []);

  const {dragAfterLongPressGesture, isFloating} = useDragAfterLongPressGesture({
    onDragStart,
    onDragUpdate,
    onDragEnd
  });

  const draggedAnimatedStyle = useAnimatedStyle(() => {
    const scaleY = withSpring(isFloating.value ? 1.1 : 1);
    const zIndex = isFloating.value ? 100 : withTiming(0, animationConfig);

    return {
      zIndex,
      transform: [{translateY: translateY.value}, {scaleY}]
    };
  });

  return (
    // @ts-expect-error related to children type issue that started on react 18
    <GestureDetector gesture={dragAfterLongPressGesture}>
      <View reanimated style={draggedAnimatedStyle} onLayout={index === 0 ? onItemLayout : undefined}>
        {children}
      </View>
    </GestureDetector>
  );
};

export default SortableListItem;
