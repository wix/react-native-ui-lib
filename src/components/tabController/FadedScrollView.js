import _pt from "prop-types";
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import Fader from "../fader";
import useScrollEnabler from "../../hooks/useScrollEnabler";
import useScrollReached from "../../hooks/useScrollReached";
import forwardRef from "../../commons/forwardRef";
const FADER_SIZE = 76;

const FadedScrollView = props => {
  const {
    children,
    onScroll: propsOnScroll,
    onContentSizeChange: propsOnContentSizeChange,
    onLayout: propsOnLayout,
    ...other
  } = props;
  const {
    onContentSizeChange,
    onLayout,
    scrollEnabled
  } = useScrollEnabler({
    horizontal: true
  });
  const {
    onScroll: onScrollReached,
    isScrollAtStart,
    isScrollAtEnd
  } = useScrollReached({
    horizontal: true,
    threshold: 50
  });
  const showStart = scrollEnabled && !isScrollAtStart;
  const showEnd = scrollEnabled && !isScrollAtEnd;
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

  if (children) {
    return <>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16} decelerationRate={'fast'} {...other} scrollEnabled={scrollEnabled} onContentSizeChange={_onContentSizeChange} onLayout={_onLayout} onScroll={onScroll} ref={props.forwardedRef}>
          {children}
        </ScrollView>
        <Fader visible={showStart} position={Fader.position.START} size={FADER_SIZE} />
        <Fader visible={showEnd} position={Fader.position.END} size={FADER_SIZE} />
      </>;
  }

  return null;
};

FadedScrollView.propTypes = {
  children: _pt.oneOfType([_pt.node, _pt.arrayOf(_pt.node)])
};
FadedScrollView.displayName = 'IGNORE';
export default forwardRef(FadedScrollView);