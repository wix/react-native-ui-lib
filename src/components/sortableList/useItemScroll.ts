/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useImperativeHandle, useRef} from 'react';
import {withTiming} from 'react-native-reanimated';
import {ScrollProps} from './types';

interface Props extends ScrollProps {
  swapItemsIfNeeded: () => void;
}

const useItemScroll = (props: Props) => {
  const {scroll, swapItemsIfNeeded} = props;

  // TODO: fix ref type?
  const ref = useRef<any>();

  const onScroll = useCallback((scrollNewValue: number) => {
    scroll.value = scrollNewValue;
    swapItemsIfNeeded();
  },
  [swapItemsIfNeeded]);

  const onScrollEnd = useCallback(() => {
    scroll.value = withTiming(0);
  }, []);

  useImperativeHandle(ref, () => ({
    onScroll,
    onScrollEnd
  }));

  return {ref};
};

export default useItemScroll;
