import React, {useCallback, useImperativeHandle} from 'react';
import {
  ViewProps,
  ScrollView,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent
} from 'react-native';
import Fader from '../fader';
import useScrollEnabler from '../../hooks/useScrollEnabler';
import useScrollReached from '../../hooks/useScrollReached';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';

export type FadedScrollViewProps = ViewProps &
  ScrollViewProps & {
    children?: React.ReactNode | React.ReactNode[];
  };

type Props = FadedScrollViewProps & ForwardRefInjectedProps;
interface Statics {
  scrollTo(
    y?: number | {x?: number | undefined; y?: number | undefined; animated?: boolean | undefined},
    x?: number,
    animated?: boolean
  ): void;
  isScrollEnabled: () => boolean;
}

const FADER_SIZE = 76;

const FadedScrollView = (props: Props) => {
  const {
    children,
    onScroll: propsOnScroll,
    onContentSizeChange: propsOnContentSizeChange,
    onLayout: propsOnLayout,
    ...others
  } = props;
  const scrollViewRef = React.createRef<ScrollView>();
  const {onContentSizeChange, onLayout, scrollEnabled} = useScrollEnabler({horizontal: true});
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

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScrollReached(event);
    propsOnScroll?.(event);
  },
  [onScrollReached, propsOnScroll]);

  const _onContentSizeChange = useCallback((w: number, h: number) => {
    propsOnContentSizeChange?.(w, h);
    onContentSizeChange?.(w, h);
  },
  [propsOnContentSizeChange, onContentSizeChange]);

  const _onLayout = useCallback((event: LayoutChangeEvent) => {
    propsOnLayout?.(event);
    onLayout?.(event);
  },
  [propsOnLayout, onLayout]);

  const isScrollEnabled = () => {
    return scrollEnabled;
  };

  useImperativeHandle(props.forwardedRef, () => ({
    scrollTo: (...data: any) => scrollViewRef.current?.scrollTo?.(...data),
    isScrollEnabled
  }));

  if (children) {
    return (
      <>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          {...others}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={_onContentSizeChange}
          onLayout={_onLayout}
          onScroll={onScroll}
          ref={scrollViewRef}
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

FadedScrollView.displayName = 'IGNORE';
export default forwardRef<React.ComponentPropsWithRef<typeof FadedScrollView>, Statics>(FadedScrollView);
