import React, {useState, useCallback} from 'react';
import {FlatListProps, ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import forwardRef, {ForwardRefInjectedProps} from './forwardRef';
import hoistStatics from 'hoist-non-react-statics';
import Constants from './Constants';

type ScrollReachedProps = {
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
function withScrollReached<PROPS, STATICS = {}>(WrappedComponent: React.ComponentType<PROPS & WithScrollReachedProps>,
  options: WithScrollReachedOptionsProps = {}): React.ComponentType<PROPS> & STATICS {
  const ScrollReachedDetector: React.FunctionComponent<PROPS & PropTypes> = (props: PROPS & PropTypes) => {
    // The scroll starts at the start, from what I've tested this works fine
    const [isScrollAtStart, setScrollAtStart] = useState(true);
    const [isScrollAtEnd, setScrollAtEnd] = useState(false);
    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
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
      let offset = horizontal ? offsetX : offsetY;
      const contentSize = horizontal ? contentWidth : contentHeight;
      if (horizontal && Constants.isRTL && Constants.isAndroid) {
        const scrollingWidth = Math.max(0, contentSize - layoutSize);
        offset = scrollingWidth - offset;
      }

      const closeToStart = offset <= threshold;
      if (closeToStart !== isScrollAtStart) {
        setScrollAtStart(closeToStart);
      }

      const closeToEnd = layoutSize + offset >= contentSize - threshold;
      if (closeToEnd !== isScrollAtEnd) {
        setScrollAtEnd(closeToEnd);
      }
    },
    [isScrollAtStart, isScrollAtEnd]);

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
  //@ts-ignore
  ScrollReachedDetector.propTypes = WrappedComponent.propTypes;
  //@ts-ignore
  ScrollReachedDetector.defaultProps = WrappedComponent.defaultProps;
  return forwardRef<PROPS & PropTypes>(ScrollReachedDetector) as any;
}

export default withScrollReached;
