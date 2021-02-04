import React, {useCallback} from 'react';
import {ViewProps, ScrollView, ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import Fader from '../fader';
import useScrollEnabler from '../../hooks/useScrollEnabler';
import useScrollReached from '../../hooks/useScrollReached';
import forwardRef, {ForwardRefInjectedProps} from '../../commons/forwardRef';

export type FadedScrollViewProps = ViewProps &
  ScrollViewProps & {
    children?: React.ReactNode | React.ReactNode[];
  };

type Props = FadedScrollViewProps & ForwardRefInjectedProps;

const FADER_SIZE = 76;

const FadedScrollView = (props: Props) => {
  const {children, onScroll: propsOnScroll, ...other} = props;
  const {onContentSizeChange, onLayout, scrollEnabled} = useScrollEnabler({horizontal: true});
  const {onScroll: onScrollReached, isScrollAtStart, isScrollAtEnd} = useScrollReached({
    horizontal: true,
    threshold: 50
  });

  const showStart = scrollEnabled && !isScrollAtStart;
  const showEnd = scrollEnabled && !isScrollAtEnd;

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScrollReached(event);
      propsOnScroll?.(event);
  },
  [onScrollReached, propsOnScroll]);

  if (children) {
    return (
      <>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          {...other}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={onContentSizeChange}
          onLayout={onLayout}
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

export default forwardRef<Props>(FadedScrollView);
