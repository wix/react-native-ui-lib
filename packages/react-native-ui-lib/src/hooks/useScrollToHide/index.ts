import {useState, useCallback, useRef} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

export type ScrollToHideProps = {
  /**
   * The threshold (in pixels) to ignore small scroll movements before updating visibility.
   * Defaults to 0 (immediate reaction).
   */
  scrollingThreshold?: number;
};

export type ScrollToHideResult = {
  /**
   * onScroll callback (should be passed to your ScrollView/FlatList onScroll prop).
   */
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /**
   * Whether the footer should be visible based on scroll direction.
   */
  visible: boolean;
};

/**
 * @description: A hook that tracks scroll direction to toggle visibility (e.g., for hiding a footer on scroll).
 * @example: const {onScroll, visible} = useScrollToHide();
 */
const useScrollToHide = (props: ScrollToHideProps = {}): ScrollToHideResult => {
  const {scrollingThreshold = 0} = props;
  const [visible, setVisible] = useState(true);
  const prevContentOffset = useRef(0);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {
        nativeEvent: {
          contentOffset: {y: currentOffset},
          contentSize: {height: contentHeight},
          layoutMeasurement: {height: layoutHeight}
        }
      } = event;

      // Ignore bounces (iOS)
      if (currentOffset < 0 || currentOffset > contentHeight - layoutHeight) {
        return;
      }

      const diff = currentOffset - prevContentOffset.current;

      if (Math.abs(diff) > scrollingThreshold) {
        if (diff > 0 && visible) {
          // Scrolling Down -> Hide
          setVisible(false);
        } else if (diff < 0 && !visible) {
          // Scrolling Up -> Show
          setVisible(true);
        }
        prevContentOffset.current = currentOffset;
      }
    },
    [visible, scrollingThreshold]
  );

  return {
    onScroll,
    visible
  };
};

export default useScrollToHide;

