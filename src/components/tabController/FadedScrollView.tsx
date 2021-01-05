import React, {useCallback} from 'react';
import {ViewProps, ScrollView, ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import Fader from '../fader';
import withScrollEnabler, {WithScrollEnablerProps} from '../../commons/withScrollEnabler';
import withScrollReached, {WithScrollReachedProps} from '../../commons/withScrollReached';
import forwardRef, {ForwardRefInjectedProps} from '../../commons/forwardRef';

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
  const showStart = scrollEnablerProps.scrollEnabled && !scrollReachedProps.isScrollAtStart;
  const showEnd = scrollEnablerProps.scrollEnabled && !scrollReachedProps.isScrollAtEnd;

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
        <Fader visible={showStart} position={Fader.position.START} size={FADER_SIZE}/>
        <Fader visible={showEnd} position={Fader.position.END} size={FADER_SIZE}/>
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
