/* eslint-disable react-hooks/exhaustive-deps */
import {useMeasure} from 'hooks';
import {useCallback, useEffect, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

interface ScrollThreshold {
  top: number;
  bottom: number;
}

const useScrollThreshold = () => {
  const scrollThreshold = useSharedValue<ScrollThreshold | undefined>(undefined);
  const contentHeight = useSharedValue<number | undefined>(undefined);
  const maxScroll = useSharedValue(0);
  const [listHeight, setListHeight] = useState<number>(0);
  const [itemHeight, setItemHeight] = useState<number>(0);

  const {ref: measureRef, absMeasurements} = useMeasure();

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setListHeight(event.nativeEvent.layout.height);
  },
  [setListHeight]);

  useEffect(() => {
    if (itemHeight > 0 && absMeasurements !== undefined) {
      scrollThreshold.value = {
        top: absMeasurements.y + itemHeight / 2,
        bottom: listHeight + absMeasurements.y - itemHeight / 2
      };
    }
  }, [listHeight, itemHeight, absMeasurements]);

  const onContentSizeChange = useCallback((_width: number, height: number) => {
    contentHeight.value = height;
    if (absMeasurements) {
      maxScroll.value = height - absMeasurements.height;
    }
  },
  [absMeasurements]);

  useEffect(() => {
    if (contentHeight.value && absMeasurements) {
      maxScroll.value = contentHeight.value - absMeasurements.height;
    }
  }, [absMeasurements]);

  return {
    measureRef,
    onLayout,
    setItemHeight,
    scrollThreshold,
    onContentSizeChange,
    contentHeight,
    maxScroll,
    absMeasurements
  };
};

export default useScrollThreshold;
