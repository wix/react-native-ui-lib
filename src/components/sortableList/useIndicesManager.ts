/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useCallback} from 'react';
import SortableListContext from './SortableListContext';

const useIndicesManager = () => {
  const {currentByInitialIndices, initialByCurrentIndices} = useContext(SortableListContext);

  const requestIndexChange = useCallback((draggedInitialIndex: number, movingDown: boolean) => {
    'worklet';
    if (!currentByInitialIndices || !initialByCurrentIndices) {
      return false;
    }

    const plusMinusOne = movingDown ? 1 : -1;
    const draggedCurrentIndex = currentByInitialIndices.value[draggedInitialIndex];
    const swapToCurrentIndex = draggedCurrentIndex + plusMinusOne;
    if (swapToCurrentIndex < 0 || swapToCurrentIndex >= initialByCurrentIndices.value.length) {
      return false;
    }

    const swapToInitialIndex = initialByCurrentIndices.value[swapToCurrentIndex];

    currentByInitialIndices.value[draggedInitialIndex] = swapToCurrentIndex;
    currentByInitialIndices.value[swapToInitialIndex] = draggedCurrentIndex;
    initialByCurrentIndices.value[draggedCurrentIndex] = swapToInitialIndex;
    initialByCurrentIndices.value[swapToCurrentIndex] = draggedInitialIndex;

    let newIndices = [...currentByInitialIndices.value];
    newIndices[draggedInitialIndex] = swapToCurrentIndex;
    newIndices[swapToInitialIndex] = draggedCurrentIndex;
    currentByInitialIndices.value = newIndices;

    newIndices = [...initialByCurrentIndices.value];
    newIndices[draggedCurrentIndex] = swapToInitialIndex;
    newIndices[swapToCurrentIndex] = draggedInitialIndex;
    initialByCurrentIndices.value = newIndices;
    return true;
  }, []);

  return {requestIndexChange};
};

export default useIndicesManager;
