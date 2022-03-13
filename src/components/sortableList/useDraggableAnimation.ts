import {useSharedValue, useAnimatedStyle, useAnimatedReaction, withTiming} from 'react-native-reanimated';
import useDragAfterLongPressGesture from './useDragAfterLongPressGesture';
import {BaseItemProps} from './types';
import useSwapItems from './useSwapItems';
import useAtRestItemsTranslation from './useAtRestItemsTranslation';
import useItemScroll from './useItemScroll';

const ANIMATION_END_DURATION = 200;
const ANIMATION_SCALE_FACTOR = 1.2;

const useDraggableAnimation = (props: BaseItemProps) => {
  const {height, index} = props;

  const isDragged = useSharedValue<boolean>(false);
  const drag = useSharedValue<number>(0);
  const scroll = useSharedValue(0);
  const scaleY = useSharedValue<number>(1);
  const zIndex = useSharedValue<number>(0);

  const {onDragUpdate, onDragEnd: swapOnDragEnd, swapItemsIfNeeded} = useSwapItems({index, height, drag, scroll});
  const {ref} = useItemScroll({scroll, swapItemsIfNeeded});
  const {atRestSwappedTranslation, onDragEnd: atRestOnDragEnd} = useAtRestItemsTranslation({index, height, isDragged});

  const {dragAfterLongPressGesture, showDraggedAnimation} = useDragAfterLongPressGesture({
    index,
    isDragged,
    ref,
    onDragStart: () => {
      'worklet';
      drag.value = 0;
    },
    onDragUpdate: event => {
      'worklet';
      drag.value = event.translationY;
      onDragUpdate(event);
    },
    onDragEnd: () => {
      'worklet';
      drag.value = withTiming(0, {duration: ANIMATION_END_DURATION});
      swapOnDragEnd();
      atRestOnDragEnd();
    }
  });

  useAnimatedReaction(() => {
    return showDraggedAnimation.value;
  },
  (isDragged, wasDragged) => {
    if (wasDragged !== null && isDragged !== wasDragged) {
      if (isDragged) {
        scaleY.value = withTiming(ANIMATION_SCALE_FACTOR, {duration: 100});
        zIndex.value = withTiming(999, {duration: 100});
      } else {
        scaleY.value = withTiming(1, {duration: ANIMATION_END_DURATION});
        zIndex.value = withTiming(0, {duration: ANIMATION_END_DURATION});
      }
    }
  });

  const draggedAnimatedStyle = useAnimatedStyle(() => {
    const translateY = (drag.value + scroll.value) / ANIMATION_SCALE_FACTOR + atRestSwappedTranslation.value;
    return {
      transform: [{scaleY: scaleY.value}, {translateY}],
      zIndex: zIndex.value
    };
  });

  return {dragAfterLongPressGesture, draggedAnimatedStyle};
};

export default useDraggableAnimation;
