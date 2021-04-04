import _ from 'lodash';
import {RefObject, useCallback, useRef} from 'react';
import {ScrollView, FlatList, LayoutChangeEvent} from 'react-native';
import {Constants} from '../../helpers';

export type ScrollToSupportedViews = ScrollView | FlatList;

export type ScrollToProps<T extends ScrollToSupportedViews> = {
  /**
   * A reference to the ScrollView (or FlatList) which the items are in
   */
  scrollViewRef?: RefObject<T>;
  /**
   * Is the scroll view horizontal (default is true)
   */
  horizontal?: boolean;
};

export type ScrollToResultProps<T extends ScrollToSupportedViews> = {
  /**
   * A reference to the ScrollView (or FlatList) which the items are in (from the props or a created one)
   */
  scrollViewRef: RefObject<T>;
  /**
   * scrollTo callback.
   * offset - the x or y to scroll to.
   * animated - should the scroll be animated (default is true)
   */
  scrollTo: (offset: number, animated?: boolean) => void;
  /**
   * onContentSizeChange callback (should be set to your onContentSizeChange).
   * Needed for RTL support on Android.
   */
  onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
  /**
   * onLayout callback (should be set to your onLayout).
   * Needed for RTL support on Android.
   */
  onLayout: (event: LayoutChangeEvent) => void;
};

const useScrollTo = <T extends ScrollToSupportedViews>(props: ScrollToProps<T>): ScrollToResultProps<T> => {
  const {scrollViewRef: propsScrollViewRef, horizontal = true} = props;
  const newScrollViewRef = useRef<T>(null);
  const scrollViewRef = propsScrollViewRef || newScrollViewRef;
  const contentSize = useRef<number | undefined>(undefined);
  const containerSize = useRef<number | undefined>(undefined);

  const onContentSizeChange = useCallback((contentWidth: number, contentHeight: number) => {
    contentSize.current = horizontal ? contentWidth : contentHeight;
  },
  [horizontal]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {
      nativeEvent: {
        layout: {width, height}
      }
    } = event;
    containerSize.current = horizontal ? width : height;
  },
  [horizontal]);

  const scrollTo = useCallback((offset: number, animated = true) => {
    if (
      horizontal &&
        Constants.isRTL &&
        Constants.isAndroid &&
        !_.isUndefined(contentSize.current) &&
        !_.isUndefined(containerSize.current)
    ) {
      const scrollingWidth = Math.max(0, contentSize.current - containerSize.current);
      offset = scrollingWidth - offset;
    }

    // @ts-ignore
    if (_.isFunction(scrollViewRef.current.scrollToOffset)) {
      // @ts-ignore
      scrollViewRef.current.scrollToOffset({offset, animated});
      // @ts-ignore
    } else if (_.isFunction(scrollViewRef.current.scrollTo)) {
      const scrollToXY = horizontal ? {x: offset} : {y: offset};
      // @ts-ignore
      scrollViewRef.current.scrollTo({...scrollToXY, animated});
    }
  },
  [scrollViewRef, horizontal]);

  return {
    scrollViewRef,
    scrollTo,
    onContentSizeChange,
    onLayout
  };
};

export default useScrollTo;
