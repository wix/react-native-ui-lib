import React, {useState, useCallback} from 'react';
import {
  FlatListProps,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import forwardRef, {ForwardRefInjectedProps} from './forwardRef';

export type ScrollReachedProps = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isScrollAtStart?: boolean;
  isScrollAtEnd?: boolean;
};

type SupportedViews = FlatListProps<any> | ScrollViewProps;

export type WithScrollReachedProps = SupportedViews & {
  scrollReachedProps: ScrollReachedProps;
  ref?: any;
};
type PropTypes = ForwardRefInjectedProps & SupportedViews;
function withScrollReached<PROPS extends SupportedViews>(
  WrappedComponent: React.ComponentType<WithScrollReachedProps>
): React.ComponentType<PROPS> {
  const ScrollReachedDetector = (props: PropTypes) => {
    // The scroll starts at the start, from what I've tested this works fine 
    const [isScrollAtStart, setScrollAtStart] = useState(true);
    const [isScrollAtEnd, setScrollAtEnd] = useState(false);
    const onScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {
          nativeEvent: {
            layoutMeasurement: {width: layoutWidth, height: layoutHeight},
            contentOffset: {x: offsetX, y: offsetY},
            contentSize: {width: contentWidth, height: contentHeight}
          }
        } = event;

        const horizontal = props.horizontal;
        const layoutSize = horizontal ? layoutWidth : layoutHeight;
        const offset = horizontal ? offsetX : offsetY;
        const contentSize = horizontal ? contentWidth : contentHeight;
        const closeToStart = offset <= 0;
        if (closeToStart !== isScrollAtStart) {
          setScrollAtStart(closeToStart);
        }

        const closeToEnd = layoutSize + offset >= contentSize - 0;
        if (closeToEnd !== isScrollAtEnd) {
          setScrollAtEnd(closeToEnd);
        }
      },
      [props.horizontal, isScrollAtStart, isScrollAtEnd]
    );

    return (
      <WrappedComponent
        {...props}
        scrollReachedProps={{onScroll, isScrollAtStart, isScrollAtEnd}}
        ref={props.forwardedRef}
      />
    );
  };

  return forwardRef(ScrollReachedDetector) as any;
}

export default withScrollReached;
