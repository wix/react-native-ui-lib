/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {GestureUpdateEvent, PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import {BaseItemProps, ScrollProps} from './types';

import useIndicesManager from './useIndicesManager';

interface Props extends BaseItemProps, ScrollProps {
  drag: SharedValue<number>;
  atRestSwappedTranslation: SharedValue<number>;
}

const useSwapItems = (props: Props) => {
  const {index, height, drag, scroll, atRestSwappedTranslation} = props;

  const {requestIndexChange} = useIndicesManager();

  const velocity = useSharedValue(0);
  const draggedSwappedTranslation = useSharedValue<number>(0);

  const swapItemsIfNeeded = useCallback(() => {
    'worklet';
    const threshold = height / 2;
    if (
      velocity.value > 0 &&
      drag.value + scroll.value + atRestSwappedTranslation.value - draggedSwappedTranslation.value > threshold
    ) {
      if (requestIndexChange(index, true)) {
        draggedSwappedTranslation.value += height;
      }
    } else if (
      velocity.value < 0 &&
      drag.value + scroll.value + atRestSwappedTranslation.value - draggedSwappedTranslation.value < -threshold
    ) {
      if (requestIndexChange(index, false)) {
        draggedSwappedTranslation.value -= height;
      }
    }
  }, [height, requestIndexChange]);

  const onDragUpdate = useCallback((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    'worklet';
    velocity.value = event.velocityY;
    swapItemsIfNeeded();
  },
  [swapItemsIfNeeded]);

  const onDragEnd = useCallback(() => {
    'worklet';
    velocity.value = 0;
  }, []);

  return {onDragUpdate, onDragEnd, swapItemsIfNeeded};
};

export default useSwapItems;
