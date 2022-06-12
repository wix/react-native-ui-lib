/* eslint-disable react-hooks/exhaustive-deps */
import {map} from 'lodash';
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
import {Shadows, Colors} from '../../style';
import {useDidUpdate} from 'hooks';
import SortableListContext from './SortableListContext';
import usePresenter from './usePresenter';
import useDragAfterLongPressGesture from './useDragAfterLongPressGesture';

export interface SortableListItemProps {
  index: number;
}

type Props = PropsWithChildren<SortableListItemProps>;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

const SortableListItem = (props: Props) => {
  const {children, index} = props;

  const {data, itemHeight, onItemLayout, itemsOrder, onChange, enableHaptic} =
    useContext(SortableListContext);
  const {getTranslationByIndexChange, getItemIndexById, getIndexByPosition, getIdByItemIndex} = usePresenter();
  const id: string = data[index].id;
  const initialIndex = useSharedValue<number>(map(data, 'id').indexOf(id));
  const translateY = useSharedValue<number>(0);
  const tempTranslateY = useSharedValue<number>(0);
  const tempItemsOrder = useSharedValue<string[]>(itemsOrder.value);
  const dataManuallyChanged = useSharedValue<boolean>(false);

  useDidUpdate(() => {
    dataManuallyChanged.value = true;
    initialIndex.value = map(data, 'id').indexOf(id);
  }, [data]);

  useAnimatedReaction(() => itemsOrder.value,
    (currItemsOrder, prevItemsOrder) => {
      // Note: Unfortunately itemsOrder sharedValue is being initialized on each render
      // Therefore I added this extra check here that compares current and previous values
      // See open issue: https://github.com/software-mansion/react-native-reanimated/issues/3224
      if (prevItemsOrder === null || currItemsOrder.join(',') === prevItemsOrder.join(',')) {
        return;
      } else {
        const newIndex = getItemIndexById(currItemsOrder, id);
        const oldIndex = getItemIndexById(prevItemsOrder, id);

        /* In case the order of the item has returned back to its initial index we reset its position */
        if (newIndex === initialIndex.value) {
          /* Reset without an animation when the change is due to manual data change */
          if (dataManuallyChanged.value) {
            translateY.value = 0;
            dataManuallyChanged.value = false;
            /* Reset with an animation when the change id due to user reordering */
          } else {
            translateY.value = withTiming(0, animationConfig);
          }
          /* Handle an order change, animate item to its new position  */
        } else if (newIndex !== oldIndex) {
          const translation = getTranslationByIndexChange(newIndex, oldIndex, itemHeight.value);
          translateY.value = withTiming(translateY.value + translation, animationConfig);
        }
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
    const newIndex = getIndexByPosition(translateY.value, itemHeight.value) + initialIndex.value;
    const oldIndex = getItemIndexById(itemsOrder.value, id);

    if (newIndex !== oldIndex) {
      const itemIdToSwap = getIdByItemIndex(itemsOrder.value, newIndex);

      if (itemIdToSwap !== undefined) {
        const newItemsOrder = [...itemsOrder.value];
        newItemsOrder[newIndex] = id;
        newItemsOrder[oldIndex] = itemIdToSwap;
        itemsOrder.value = newItemsOrder;
      }
    }
  }, []);

  const onDragEnd = useCallback(() => {
    'worklet';
    const translation = getTranslationByIndexChange(getItemIndexById(itemsOrder.value, id),
      getItemIndexById(tempItemsOrder.value, id),
      itemHeight.value);

    translateY.value = withTiming(tempTranslateY.value + translation, animationConfig, () => {
      if (tempItemsOrder.value.toString() !== itemsOrder.value.toString()) {
        runOnJS(onChange)();
      }
    });
  }, []);

  const {dragAfterLongPressGesture, isFloating} = useDragAfterLongPressGesture({
    onDragStart,
    onDragUpdate,
    onDragEnd,
    hapticComponentName: enableHaptic ? 'SortableList' : null
  });

  const draggedAnimatedStyle = useAnimatedStyle(() => {
    const scaleY = withSpring(isFloating.value ? 1.1 : 1);
    const zIndex = isFloating.value ? 100 : withTiming(0, animationConfig);
    const opacity = isFloating.value ? 0.95 : 1;
    const shadow = isFloating.value
      ? {
        ...Shadows.sh30.bottom,
        ...Shadows.sh30.top
      }
      : {
        shadowColor: Colors.transparent,
        elevation: 0
      };

    return {
      backgroundColor: Colors.$backgroundDefault, // required for elevation to work in Android
      zIndex,
      transform: [{translateY: translateY.value}, {scaleY}],
      opacity,
      ...shadow
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

export default React.memo(SortableListItem);
