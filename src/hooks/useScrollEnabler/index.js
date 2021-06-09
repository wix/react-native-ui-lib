import React, { useState, useCallback, useRef } from 'react';

const useScrollEnabler = (props = {}) => {
  const {
    horizontal = false
  } = props;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const contentSize = useRef(0);
  const layoutSize = useRef(0);
  const checkScroll = useCallback(() => {
    const isScrollEnabled = contentSize.current > layoutSize.current;

    if (isScrollEnabled !== scrollEnabled) {
      setScrollEnabled(isScrollEnabled);
    }
  }, [scrollEnabled]);
  const onContentSizeChange = useCallback((contentWidth, contentHeight) => {
    const size = horizontal ? contentWidth : contentHeight;

    if (size !== contentSize.current) {
      contentSize.current = size;

      if (layoutSize.current > 0) {
        checkScroll();
      }
    }
  }, [horizontal, checkScroll]);
  const onLayout = useCallback(event => {
    const {
      nativeEvent: {
        layout: {
          width,
          height
        }
      }
    } = event;
    const size = horizontal ? width : height;

    if (size !== layoutSize.current) {
      layoutSize.current = size;

      if (contentSize.current > 0) {
        checkScroll();
      }
    }
  }, [horizontal, checkScroll]);
  return {
    onContentSizeChange,
    onLayout,
    scrollEnabled
  };
};

export default useScrollEnabler;