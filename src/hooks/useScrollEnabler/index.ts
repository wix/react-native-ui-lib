import {useState, useCallback, useRef} from 'react';
import {LayoutChangeEvent} from 'react-native';

export type ScrollEnablerProps = {
  /**
   * Whether the scroll is horizontal (default is false).
   */
  horizontal?: boolean;
};

export type ScrollEnablerResultProps = {
  /**
   * onContentSizeChange callback (should be set to your onContentSizeChange).
   */
  onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
  /**
   * onLayout callback (should be set to your onLayout).
   */
  onLayout: (event: LayoutChangeEvent) => void;
  /**
   * Whether the scroll should be enabled (should be set to your scrollEnabled).
   */
  scrollEnabled: boolean;
};

const useScrollEnabler = (props: ScrollEnablerProps = {}): ScrollEnablerResultProps => {
  const {horizontal = false} = props;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const contentSize = useRef<number>(0);
  const layoutSize = useRef<number>(0);

  const checkScroll = useCallback(() => {
    const isScrollEnabled = contentSize.current > layoutSize.current;
    if (isScrollEnabled !== scrollEnabled) {
      setScrollEnabled(isScrollEnabled);
    }
  }, [scrollEnabled]);

  const onContentSizeChange = useCallback((contentWidth: number, contentHeight: number) => {
    const size = horizontal ? contentWidth : contentHeight;
    if (size !== contentSize.current) {
      contentSize.current = size;
      if (layoutSize.current > 0) {
        checkScroll();
      }
    }
  },
  [horizontal, checkScroll]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {
      nativeEvent: {
        layout: {width, height}
      }
    } = event;
    const size = horizontal ? width : height;
    if (size !== layoutSize.current) {
      layoutSize.current = size;
      if (contentSize.current > 0) {
        checkScroll();
      }
    }
  },
  [horizontal, checkScroll]);

  return {
    onContentSizeChange,
    onLayout,
    scrollEnabled
  };
};

export default useScrollEnabler;
