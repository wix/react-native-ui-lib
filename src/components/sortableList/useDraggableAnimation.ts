/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useContext} from 'react';
import {useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS} from 'react-native-reanimated';
import {GestureUpdateEvent, PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import useDragAfterLongPressGesture from './useDragAfterLongPressGesture';
import {BaseItemProps, ANIMATION_END_DURATION} from './types';
import useSwapItems from './useSwapItems';
import useAtRestItemsTranslation from './useAtRestItemsTranslation';
import SortableListContext from './SortableListContext';

const useDraggableAnimation = (props: BaseItemProps) => {
  const {height, index} = props;

  const isDragged = useSharedValue<boolean>(false);
  const drag = useSharedValue<number>(0);
  const atRestSwappedTranslation = useSharedValue(0);
  const scroll = useSharedValue(0);

  const {onDragStateChange} = useContext(SortableListContext);

  const {onDragUpdate: swap_onDragUpdate, onDragEnd: swap_onDragEnd} = useSwapItems({
    index,
    height,
    drag,
    atRestSwappedTranslation
  });
  const {onDragEnd: atRest_onDragEnd} = useAtRestItemsTranslation({index, height, isDragged, atRestSwappedTranslation});

  const onDragStart = useCallback(() => {
    'worklet';
    if (onDragStateChange) {
      runOnJS(onDragStateChange)(index);
    }

    drag.value = 0;
  }, [onDragStateChange]);

  const onDragUpdate = useCallback((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    'worklet';
    drag.value = event.translationY;
    swap_onDragUpdate(event);
  },
  [swap_onDragUpdate]);

  const onDragEnd = useCallback(() => {
    'worklet';
    drag.value = withTiming(0, {duration: ANIMATION_END_DURATION});
    swap_onDragEnd();
    atRest_onDragEnd();
    if (onDragStateChange) {
      runOnJS(onDragStateChange)(undefined);
    }
  }, [onDragStateChange, swap_onDragEnd, atRest_onDragEnd]);

  const {dragAfterLongPressGesture, isFloating} = useDragAfterLongPressGesture({
    isDragged,
    onDragStart,
    onDragUpdate,
    onDragEnd
  });

  const draggedAnimatedStyle = useAnimatedStyle(() => {
    const scaleY = withSpring(isFloating.value ? 1.1 : 1);
    const zIndex = isFloating.value ? 100 : 0;
    const translateY = drag.value + scroll.value + atRestSwappedTranslation.value;
    return {
      zIndex,
      transform: [{translateY}, {scaleY}]
    };
  });

  return {dragAfterLongPressGesture, draggedAnimatedStyle};
};

export default useDraggableAnimation;
