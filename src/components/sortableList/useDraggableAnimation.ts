/* eslint-disable react-hooks/exhaustive-deps */
import {useSharedValue, useAnimatedStyle, useAnimatedReaction, withTiming, runOnJS} from 'react-native-reanimated';
import useDragAfterLongPressGesture from './useDragAfterLongPressGesture';
import {BaseItemProps, ANIMATION_END_DURATION} from './types';
import useSwapItems from './useSwapItems';
import useAtRestItemsTranslation from './useAtRestItemsTranslation';
import useItemScroll from './useItemScroll';
import SortableListContext from './SortableListContext';
import {useCallback, useContext} from 'react';

const useDraggableAnimation = (props: BaseItemProps) => {
  const {height, index} = props;

  const isDragged = useSharedValue<boolean>(false);
  const drag = useSharedValue<number>(0);
  const scroll = useSharedValue(0);
  const zIndex = useSharedValue<number>(0);

  const {scrollWhileDragging, onDragStateChange, onDrag} = useContext(SortableListContext);

  const {
    onDragUpdate: swap_onDragUpdate,
    onDragEnd: swap_onDragEnd,
    swapItemsIfNeeded
  } = useSwapItems({index, height, drag, scroll});
  const {ref} = useItemScroll({scroll, swapItemsIfNeeded});
  const {atRestSwappedTranslation, onDragEnd: atRest_onDragEnd} = useAtRestItemsTranslation({index, height, isDragged});

  const onDragStart = useCallback(() => {
    'worklet';
    if (onDragStateChange) {
      runOnJS(onDragStateChange)(index);
    }

    drag.value = 0;
  }, [onDragStateChange]);

  const onDragUpdate = useCallback(event => {
    'worklet';
    if (scrollWhileDragging) {
      onDrag?.(event.absoluteY, ref.current);
    }

    drag.value = event.translationY;
    swap_onDragUpdate(event);
  },
  [onDrag, swap_onDragUpdate]);

  const onDragEnd = useCallback(() => {
    'worklet';
    drag.value = withTiming(0, {duration: ANIMATION_END_DURATION});
    swap_onDragEnd();
    atRest_onDragEnd();
    if (onDragStateChange) {
      runOnJS(onDragStateChange)(undefined);
    }
  }, [onDragStateChange, swap_onDragEnd, atRest_onDragEnd]);

  const {dragAfterLongPressGesture, showDraggedAnimation} = useDragAfterLongPressGesture({
    isDragged,
    onDragStart,
    onDragUpdate,
    onDragEnd
  });

  useAnimatedReaction(() => {
    return showDraggedAnimation.value;
  },
  (isDragged, wasDragged) => {
    if (wasDragged !== null && isDragged !== wasDragged) {
      if (isDragged) {
        zIndex.value = withTiming(999, {duration: 100});
      } else {
        zIndex.value = withTiming(0, {duration: ANIMATION_END_DURATION});
      }
    }
  });

  const draggedAnimatedStyle = useAnimatedStyle(() => {
    const translateY = drag.value + scroll.value + atRestSwappedTranslation.value;
    return {
      transform: [{translateY}],
      zIndex: zIndex.value
    };
  });

  return {dragAfterLongPressGesture, draggedAnimatedStyle, isDragged: showDraggedAnimation};
};

export default useDraggableAnimation;
