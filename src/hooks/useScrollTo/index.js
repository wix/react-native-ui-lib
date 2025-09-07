import _isFunction from "lodash/isFunction";
import { useCallback, useRef } from 'react';
const useScrollTo = props => {
  const {
    scrollViewRef: propsScrollViewRef,
    horizontal = true
  } = props;
  const newScrollViewRef = useRef(null);
  const scrollViewRef = propsScrollViewRef || newScrollViewRef;
  const contentSize = useRef(undefined);
  const containerSize = useRef(undefined);
  const onContentSizeChange = useCallback((contentWidth, contentHeight) => {
    contentSize.current = horizontal ? contentWidth : contentHeight;
  }, [horizontal]);
  const onLayout = useCallback(event => {
    const {
      nativeEvent: {
        layout: {
          width,
          height
        }
      }
    } = event;
    containerSize.current = horizontal ? width : height;
  }, [horizontal]);
  const scrollTo = useCallback((offset, animated = true) => {
    // Fix that was for Android RTL. Scrolling is now aligned between IOS and Android and offset is ok.
    /* if (
      horizontal &&
        Constants.isRTL &&
        Constants.isAndroid &&
        !_.isUndefined(contentSize.current) &&
        !_.isUndefined(containerSize.current)
    ) {
      const scrollingWidth = Math.max(0, contentSize.current - containerSize.current);
      offset = scrollingWidth - offset;
    } */

    // @ts-ignore
    if (_isFunction(scrollViewRef.current?.scrollToOffset)) {
      // @ts-ignore
      scrollViewRef.current.scrollToOffset({
        offset,
        animated
      });
      // @ts-ignore
    } else if (_isFunction(scrollViewRef.current?.scrollTo)) {
      const scrollToXY = horizontal ? {
        x: offset
      } : {
        y: offset
      };
      // @ts-ignore
      scrollViewRef.current.scrollTo({
        ...scrollToXY,
        animated
      });
    }
  }, [scrollViewRef, horizontal]);
  return {
    scrollViewRef,
    scrollTo,
    onContentSizeChange,
    onLayout
  };
};
export default useScrollTo;