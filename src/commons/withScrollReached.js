import React, { useState, useCallback } from 'react';
import forwardRef from "./forwardRef"; //@ts-ignore

import hoistStatics from 'hoist-non-react-statics';
import { Constants } from "../helpers";
const DEFAULT_THRESHOLD = Constants.isAndroid ? 1 : 0;
/**
 * @description: Add scroll reached which notifies on reaching start \ end of ScrollView \ FlatList
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WithScrollReachedScreen.tsx
 * @notes: Send `props.scrollReachedProps.onScroll` to your onScroll and receive via props.scrollReachedProps.isScrollAtStart props.scrollReachedProps.isScrollAtEnd
 */

function withScrollReached(WrappedComponent, options = {}) {
  const ScrollReachedDetector = props => {
    // The scroll starts at the start, from what I've tested this works fine
    const [isScrollAtStart, setScrollAtStart] = useState(true);
    const [isScrollAtEnd, setScrollAtEnd] = useState(false);
    const onScroll = useCallback(event => {
      const {
        nativeEvent: {
          layoutMeasurement: {
            width: layoutWidth,
            height: layoutHeight
          },
          contentOffset: {
            x: offsetX,
            y: offsetY
          },
          contentSize: {
            width: contentWidth,
            height: contentHeight
          }
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
    }, [isScrollAtStart, isScrollAtEnd]);
    return <WrappedComponent {...props} scrollReachedProps={{
      onScroll,
      isScrollAtStart,
      isScrollAtEnd
    }} ref={props.forwardedRef} />;
  };

  hoistStatics(ScrollReachedDetector, WrappedComponent);
  ScrollReachedDetector.displayName = WrappedComponent.displayName; //@ts-ignore

  ScrollReachedDetector.propTypes = WrappedComponent.propTypes; //@ts-ignore

  ScrollReachedDetector.defaultProps = WrappedComponent.defaultProps;
  return forwardRef(ScrollReachedDetector);
}

export default withScrollReached;