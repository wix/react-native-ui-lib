import _ from 'lodash';
import {RefObject, useCallback, useRef} from 'react';
import {ScrollView, FlatList} from 'react-native';

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
   * scrollToOffset - the x or y to scroll to.
   * animated - should the scroll be animated (default is true)
   */
  scrollTo: (scrollToOffset: number, animated?: boolean) => void;
};

const useScrollTo = <T extends ScrollToSupportedViews>(props: ScrollToProps<T>): ScrollToResultProps<T> => {
  const {scrollViewRef: propsScrollViewRef, horizontal = true} = props;
  const newScrollViewRef = useRef<T>(null);
  const scrollViewRef = propsScrollViewRef || newScrollViewRef;

  const scrollTo = useCallback((scrollTo: number, animated = true) => {
    // @ts-ignore
    if (_.isFunction(scrollViewRef.current.scrollToOffset)) {
      // @ts-ignore
      scrollViewRef.current.scrollToOffset({offset: scrollTo, animated});
      // @ts-ignore
    } else if (_.isFunction(scrollViewRef.current.scrollTo)) {
      const scrollToXY = horizontal ? {x: scrollTo} : {y: scrollTo};
      // @ts-ignore
      scrollViewRef.current.scrollTo({...scrollToXY, animated});
    }
  },
  [scrollViewRef, horizontal]);

  return {
    scrollViewRef,
    scrollTo
  };
};

export default useScrollTo;
