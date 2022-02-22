import React, {useCallback, useRef, useImperativeHandle} from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent
} from 'react-native';
import Fader, {FaderProps} from '../fader';
import useScrollEnabler from '../../hooks/useScrollEnabler';
import useScrollReached from '../../hooks/useScrollReached';
import {forwardRef, ForwardRefInjectedProps} from '../../commons/new';
import {ScrollView as GestureScrollView} from 'react-native-gesture-handler';

export type FadedScrollViewProps = ScrollViewProps & {
  /**
   * Show a fader at the start of the scroll
   */
  showStartFader?: boolean;
  /**
   * Additional props for the start fader
   */
  startFaderProps?: Omit<FaderProps, 'visible' | 'position'>;
  /**
   * Show a fader at the end of the scroll
   */
  showEndFader?: boolean;
  /**
   * Additional props for the end fader
   */
  endFaderProps?: Omit<FaderProps, 'visible' | 'position'>;
  /**
   * Use the react-native-gesture-handler version, useful when using react-native-reanimated
   */
  useGesture?: boolean;
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

const FadedScrollView = (props: Props) => {
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
  const scrollViewRef = useRef<typeof ScrollView>();
  const horizontal = propsHorizontal ?? false;
  const {onContentSizeChange, onLayout, scrollEnabled} = useScrollEnabler({horizontal});
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
    // @ts-expect-error
    scrollTo: (...data: any) => scrollViewRef.current?.scrollTo?.(...data),
    isScrollEnabled
  }));

  if (children) {
    return (
      <>
        <ScrollView
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          {...others}
          horizontal={horizontal}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={_onContentSizeChange}
          onLayout={_onLayout}
          onScroll={onScroll}
          // @ts-expect-error
          ref={scrollViewRef}
        >
          {children}
        </ScrollView>
        <Fader
          visible={showStart}
          position={horizontal ? Fader.position.START : Fader.position.TOP}
          {...startFaderProps}
        />
        <Fader
          visible={showEnd}
          position={horizontal ? Fader.position.END : Fader.position.BOTTOM}
          {...endFaderProps}
        />
      </>
    );
  }

  return null;
};

FadedScrollView.displayName = 'IGNORE';
// @ts-expect-error
export default forwardRef<FadedScrollViewProps, Statics>(FadedScrollView);
