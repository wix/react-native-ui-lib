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
//@ts-ignore
import hoistStatics from 'hoist-non-react-statics';
import {Constants} from '../helpers';

export type ScrollReachedProps = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /**
   * Is the scroll at the start (or equal\smaller than the threshold if one was given)
   */
  isScrollAtStart?: boolean;
  /**
   * Is the scroll at the end (or equal\greater than the threshold if one was given)
   */
  isScrollAtEnd?: boolean;
};

declare type SupportedViewsProps = FlatListProps<any> | ScrollViewProps;

export type WithScrollReachedOptionsProps = {
  /**
   * Whether the scroll is horizontal.
   */
  horizontal?: boolean;
  /**
   * Allows to be notified prior to actually reaching the start \ end of the scroll (by the threshold).
   * Should be a positive value.
   */
  threshold?: number;
};

export type WithScrollReachedProps = {
  scrollReachedProps: ScrollReachedProps;
  ref?: any;
};

type PropTypes = ForwardRefInjectedProps & SupportedViewsProps;

const DEFAULT_THRESHOLD = Constants.isAndroid ? 1 : 0;

/**
 * @description: Add scroll reached which notifies on reaching start \ end of ScrollView \ FlatList
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WithScrollReachedScreen.tsx
 * @notes: Send `props.scrollReachedProps.onScroll` to your onScroll and receive via props.scrollReachedProps.isScrollAtStart props.scrollReachedProps.isScrollAtEnd
 */
function withScrollReached<PROPS, STATICS = {}>(
  WrappedComponent: React.ComponentType<PROPS & WithScrollReachedProps>,
  options: WithScrollReachedOptionsProps = {}
): React.ComponentType<PROPS> & STATICS {
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

        const horizontal = options.horizontal;
        const threshold = options.threshold || DEFAULT_THRESHOLD;
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
      [isScrollAtStart, isScrollAtEnd]
    );

    return (
      <WrappedComponent
        {...props}
        scrollReachedProps={{onScroll, isScrollAtStart, isScrollAtEnd}}
        ref={props.forwardedRef}
      />
    );
  };

  hoistStatics(ScrollReachedDetector, WrappedComponent);
  ScrollReachedDetector.displayName = WrappedComponent.displayName;
  ScrollReachedDetector.propTypes = WrappedComponent.propTypes;
  ScrollReachedDetector.defaultProps = WrappedComponent.defaultProps;
  return forwardRef(ScrollReachedDetector) as any;
}

export default withScrollReached;
