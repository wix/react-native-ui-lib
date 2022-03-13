/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useContext} from 'react';
import {useAnimatedReaction, useSharedValue, withTiming, SharedValue} from 'react-native-reanimated';
import {BaseItemProps} from './types';
import SortableListContext from './SortableListContext';

interface Props extends BaseItemProps {
  isDragged: SharedValue<boolean>;
}

const useAtRestItemsTranslation = (props: Props) => {
  const {index, height, isDragged} = props;

  const {currentByInitialIndices} = useContext(SortableListContext);

  const atRestSwappedTranslation = useSharedValue(0);

  const getSwappedTranslation = (currentIndex: number) => {
    'worklet';
    return (currentIndex - index) * height;
  };

  useAnimatedReaction(() => {
    return currentByInitialIndices?.value[index];
  },
  (currentIndex: number | undefined, prevIndex: number | undefined | null) => {
    if (currentIndex !== undefined && prevIndex !== null && currentIndex !== prevIndex) {
      if (!isDragged.value) {
        atRestSwappedTranslation.value = withTiming(getSwappedTranslation(currentIndex));
      }
    }
  });

  const onDragEnd = useCallback(() => {
    'worklet';
    if (currentByInitialIndices) {
      // Update the dragged item's (which will now rest) translation to it's new place.
      const restLocation = getSwappedTranslation(currentByInitialIndices.value[index]);
      atRestSwappedTranslation.value = withTiming(restLocation, {duration: 200}); // TODO: ANIMATION_END_DURATION
    }
  }, [height]);

  return {atRestSwappedTranslation, onDragEnd};
};

export default useAtRestItemsTranslation;
