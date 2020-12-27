import React, {useCallback} from 'react';
import {ViewProps, ScrollView, ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import Fader from '../fader';
import withScrollEnabler, {WithScrollEnablerProps} from '../../commons/withScrollEnabler';
import withScrollReached, {WithScrollReachedProps} from '../../commons/withScrollReached';
import forwardRef, {ForwardRefInjectedProps} from '../../commons/forwardRef';
import {Constants} from '../../helpers';

export type FadedScrollViewProps = ViewProps &
  ScrollViewProps & {
    children?: React.ReactNode | React.ReactNode[];
  };

type ScrollReachedProps = FadedScrollViewProps & WithScrollReachedProps;
type ScrollEnabledProps = ScrollReachedProps & WithScrollEnablerProps;
type Props = ScrollEnabledProps & ForwardRefInjectedProps;

const FADER_SIZE = 76;

const FadedScrollView = (props: Props) => {
  const {scrollEnablerProps, scrollReachedProps, children, onScroll: propsOnScroll, ...other} = props;
  const showLeft =
    scrollEnablerProps.scrollEnabled &&
    (Constants.isRTL ? !scrollReachedProps.isScrollAtEnd : !scrollReachedProps.isScrollAtStart);
  const leftPosition = Constants.isRTL ? Fader.position.RIGHT : Fader.position.LEFT;
  const showRight =
    scrollEnablerProps.scrollEnabled &&
    (Constants.isRTL ? !scrollReachedProps.isScrollAtStart : !scrollReachedProps.isScrollAtEnd);
  const rightPosition = Constants.isRTL ? Fader.position.LEFT : Fader.position.RIGHT;

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollReachedProps.onScroll(event);
      propsOnScroll?.(event);
  },
  [scrollReachedProps.onScroll, propsOnScroll]);

  if (children) {
    return (
      <>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          {...other}
          scrollEnabled={scrollEnablerProps.scrollEnabled}
          onContentSizeChange={scrollEnablerProps.onContentSizeChange}
          onLayout={scrollEnablerProps.onLayout}
          onScroll={onScroll}
          ref={props.forwardedRef}
        >
          {children}
        </ScrollView>
        <Fader visible={showLeft} position={leftPosition} size={FADER_SIZE} supportRTL/>
        <Fader visible={showRight} position={rightPosition} size={FADER_SIZE} supportRTL/>
      </>
    );
  }

  return null;
};

// TODO: fix withScrollEnabler props (add <>)
export default withScrollReached<FadedScrollViewProps>(withScrollEnabler(forwardRef<Props>(FadedScrollView)), {
  horizontal: true,
  threshold: 50
});
