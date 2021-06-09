import React, { useState, useCallback, useRef } from 'react';
import forwardRef from "./forwardRef"; //@ts-ignore

import hoistStatics from 'hoist-non-react-statics';

function withScrollEnabler(WrappedComponent) {
  const ScrollEnabler = props => {
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const contentSize = useRef(0);
    const layoutSize = useRef(0);
    const checkScroll = useCallback(() => {
      const isScrollEnabled = contentSize.current > layoutSize.current;

      if (isScrollEnabled !== scrollEnabled) {
        setScrollEnabled(isScrollEnabled);
      }
    }, [scrollEnabled]);
    const onContentSizeChange = useCallback((contentWidth, contentHeight) => {
      const size = props.horizontal ? contentWidth : contentHeight;

      if (size !== contentSize.current) {
        contentSize.current = size;

        if (layoutSize.current > 0) {
          checkScroll();
        }
      }
    }, [props.horizontal, checkScroll]);
    const onLayout = useCallback(event => {
      const {
        nativeEvent: {
          layout: {
            width,
            height
          }
        }
      } = event;
      const size = props.horizontal ? width : height;

      if (size !== layoutSize.current) {
        layoutSize.current = size;

        if (contentSize.current > 0) {
          checkScroll();
        }
      }
    }, [props.horizontal, checkScroll]);
    return <WrappedComponent {...props} scrollEnablerProps={{
      onLayout,
      scrollEnabled,
      onContentSizeChange
    }} ref={props.forwardedRef} />;
  };

  hoistStatics(ScrollEnabler, WrappedComponent);
  ScrollEnabler.displayName = WrappedComponent.displayName; //@ts-ignore

  ScrollEnabler.propTypes = WrappedComponent.propTypes; //@ts-ignore

  ScrollEnabler.defaultProps = WrappedComponent.defaultProps;
  return forwardRef(ScrollEnabler);
}

export default withScrollEnabler;