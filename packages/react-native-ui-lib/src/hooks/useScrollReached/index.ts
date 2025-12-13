import {useState, useCallback} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {Constants} from '../../commons/new';

export type ScrollEnablerProps = {
  /**
   * Whether the scroll is horizontal (default is false).
   */
  horizontal?: boolean;
  /**
   * Allows to be notified prior to actually reaching the start \ end of the scroll (by the threshold).
   * Should be a positive value.
   */
  threshold?: number;
};

export type ScrollEnablerResultProps = {
  /**
   * onScroll callback (should be set to your onScroll).
   */
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /**
   * Is the scroll at the start (or equal\smaller than the threshold if one was given)
   */
  isScrollAtStart?: boolean;
  /**
   * Is the scroll at the end (or equal\greater than the threshold if one was given)
   */
  isScrollAtEnd?: boolean;
};

const DEFAULT_THRESHOLD = Constants.isAndroid ? 1 : 0;

const useScrollReached = (props: ScrollEnablerProps = {}): ScrollEnablerResultProps => {
  const {horizontal = false, threshold = DEFAULT_THRESHOLD} = props;
  const [isScrollAtStart, setScrollAtStart] = useState(true);
  const [isScrollAtEnd, setScrollAtEnd] = useState(false);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: {
        layoutMeasurement: {width: layoutWidth, height: layoutHeight},
        contentOffset: {x: offsetX, y: offsetY},
        contentSize: {width: contentWidth, height: contentHeight}
      }
    } = event;

    const layoutSize = horizontal ? layoutWidth : layoutHeight;
    let offset = horizontal ? offsetX : offsetY;
    const contentSize = horizontal ? contentWidth : contentHeight;
    if (horizontal && Constants.isRTL && Constants.isAndroid) {
      const scrollingWidth = Math.max(0, contentSize - layoutSize);
      offset = scrollingWidth - offset;
    }

    const closeToStart = offset <= threshold;
    if (closeToStart !== isScrollAtStart) {
      setScrollAtStart(closeToStart);
    }

    const closeToEnd = layoutSize + offset >= contentSize - threshold;
    if (closeToEnd !== isScrollAtEnd) {
      setScrollAtEnd(closeToEnd);
    }
  },
  [horizontal, threshold, isScrollAtStart, isScrollAtEnd]);

  return {onScroll, isScrollAtStart, isScrollAtEnd};
};

export default useScrollReached;
