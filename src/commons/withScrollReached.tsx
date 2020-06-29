import React, {useState, useCallback} from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  FlatListProps,
  // eslint-disable-next-line no-unused-vars
  ScrollViewProps,
  // eslint-disable-next-line no-unused-vars
  NativeSyntheticEvent,
  // eslint-disable-next-line no-unused-vars
  NativeScrollEvent
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import forwardRef, {ForwardRefInjectedProps} from './forwardRef';

export type ScrollReachedProps = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isScrollAtStart?: boolean;
  isScrollAtEnd?: boolean;
};

declare type SupportedViewsProps = FlatListProps<any> | ScrollViewProps;

export type WithScrollReachedOptionsProps = {
  threshold?: number;
};

export type WithScrollReachedProps = {
  scrollReachedProps: ScrollReachedProps;
  ref?: any;
};

type PropTypes = ForwardRefInjectedProps & SupportedViewsProps;

function withScrollReached<PROPS>(
  WrappedComponent: React.ComponentType<PROPS & WithScrollReachedProps>,
  options: WithScrollReachedOptionsProps = {}
): React.ComponentType<PROPS> {
  const ScrollReachedDetector = (props: PROPS & PropTypes) => {
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
        const threshold = options.threshold || 0;
        const layoutSize = horizontal ? layoutWidth : layoutHeight;
        const offset = horizontal ? offsetX : offsetY;
        const contentSize = horizontal ? contentWidth : contentHeight;
        const closeToStart = offset <= threshold;
        if (closeToStart !== isScrollAtStart) {
          setScrollAtStart(closeToStart);
        }

        const closeToEnd = layoutSize + offset >= contentSize - threshold;
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

  return forwardRef(ScrollReachedDetector);
}

export default withScrollReached;
