import React, { useState, useCallback } from 'react';
import { Constants } from "../../helpers";
const DEFAULT_THRESHOLD = Constants.isAndroid ? 1 : 0;

const useScrollReached = (props = {}) => {
  const {
    horizontal = false,
    threshold = DEFAULT_THRESHOLD
  } = props;
  const [isScrollAtStart, setScrollAtStart] = useState(true);
  const [isScrollAtEnd, setScrollAtEnd] = useState(false);
  const onScroll = useCallback(event => {
    const {
      nativeEvent: {
        layoutMeasurement: {
          width: layoutWidth,
          height: layoutHeight
        },
        contentOffset: {
          x: offsetX,
          y: offsetY
        },
        contentSize: {
          width: contentWidth,
          height: contentHeight
        }
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
  }, [horizontal, threshold, isScrollAtStart, isScrollAtEnd]);
  return {
    onScroll,
    isScrollAtStart,
    isScrollAtEnd
  };
};

export default useScrollReached;