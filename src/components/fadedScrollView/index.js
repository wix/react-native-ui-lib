import React, { useCallback, useRef, useImperativeHandle } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { ScrollView as GestureScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import Fader from "../fader";
import useScrollEnabler from "../../hooks/useScrollEnabler";
import useScrollReached from "../../hooks/useScrollReached";
import { forwardRef } from "../../commons/new";
const FadedScrollView = props => {
  const {
    children,
    onScroll: propsOnScroll,
    onContentSizeChange: propsOnContentSizeChange,
    onLayout: propsOnLayout,
    horizontal: propsHorizontal,
    showStartFader,
    startFaderProps,
    showEndFader,
    endFaderProps,
    useGesture,
    ...others
  } = props;
  const ScrollView = useGesture ? GestureScrollView : RNScrollView;
  const scrollViewRef = useRef();
  const horizontal = propsHorizontal ?? false;
  const {
    onContentSizeChange,
    onLayout,
    scrollEnabled
  } = useScrollEnabler({
    horizontal
  });
  const {
    onScroll: onScrollReached,
    isScrollAtStart,
    isScrollAtEnd
  } = useScrollReached({
    horizontal,
    threshold: 50
  });
  const showStart = (showStartFader && scrollEnabled && !isScrollAtStart) ?? false;
  const showEnd = (showEndFader && scrollEnabled && !isScrollAtEnd) ?? false;
  const onScroll = useCallback(event => {
    onScrollReached(event);
    propsOnScroll?.(event);
  }, [onScrollReached, propsOnScroll]);
  const _onContentSizeChange = useCallback((w, h) => {
    propsOnContentSizeChange?.(w, h);
    onContentSizeChange?.(w, h);
  }, [propsOnContentSizeChange, onContentSizeChange]);
  const _onLayout = useCallback(event => {
    propsOnLayout?.(event);
    onLayout?.(event);
  }, [propsOnLayout, onLayout]);
  const isScrollEnabled = () => {
    return scrollEnabled;
  };
  useImperativeHandle(props.forwardedRef, () => ({
    // @ts-expect-error
    scrollTo: (...data) => scrollViewRef.current?.scrollTo?.(...data),
    isScrollEnabled
  }));
  if (children) {
    return <GestureHandlerRootView>
        <ScrollView scrollEventThrottle={16} decelerationRate={'fast'} {...others} horizontal={horizontal} scrollEnabled={scrollEnabled} onContentSizeChange={_onContentSizeChange} onLayout={_onLayout} onScroll={onScroll}
      // @ts-expect-error
      ref={scrollViewRef}>
          {children}
        </ScrollView>
        <Fader visible={showStart} position={horizontal ? Fader.position.START : Fader.position.TOP} {...startFaderProps} />
        <Fader visible={showEnd} position={horizontal ? Fader.position.END : Fader.position.BOTTOM} {...endFaderProps} />
      </GestureHandlerRootView>;
  }
  return null;
};
FadedScrollView.displayName = 'IGNORE';
export default forwardRef(FadedScrollView);