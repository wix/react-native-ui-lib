import _ from 'lodash';
import React, {useState, useCallback, useRef} from 'react';
// eslint-disable-next-line no-unused-vars
import {FlatListProps, ScrollViewProps, LayoutChangeEvent} from 'react-native';
import forwardRef, {ForwardRefInjectedProps} from './forwardRef';

export type ScrollEnablerProps = {
  onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
  onLayout: (event: LayoutChangeEvent) => void;
  scrollEnabled: boolean;
};

type SupportedViews = FlatListProps<any> | ScrollViewProps;

export type WithScrollEnablerProps = SupportedViews & {
  scrollEnablerProps: ScrollEnablerProps;
  ref?: any;
};
type PropTypes = ForwardRefInjectedProps & SupportedViews;
function withScrollEnabler<PROPS extends SupportedViews>(
  WrappedComponent: React.ComponentType<WithScrollEnablerProps>
): React.ComponentType<PROPS> {
  const ScrollEnabler = (props: PropTypes) => {
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const contentSize = useRef(0);
    const layoutSize = useRef(0);

    const checkScroll = useCallback(() => {
      const isScrollEnabled = contentSize.current > layoutSize.current;
      if (isScrollEnabled !== scrollEnabled) {
        setScrollEnabled(isScrollEnabled);
      }
    }, []);

    const onContentSizeChange = useCallback(
      (contentWidth: number, contentHeight: number) => {
        const size = props.horizontal ? contentWidth : contentHeight;
        if (size !== contentSize.current) {
          contentSize.current = size;
          if (layoutSize.current > 0) {
            checkScroll();
          }
        }
      },
      [props.horizontal]
    );

    const onLayout = useCallback(
      (event) => {
        const {
          nativeEvent: {
            layout: {width, height}
          }
        } = event;
        const size = props.horizontal ? width : height;
        if (size !== layoutSize.current) {
          layoutSize.current = size;
          if (contentSize.current > 0) {
            checkScroll();
          }
        }
      },
      [props.horizontal]
    );

    return (
      <WrappedComponent
        {...props}
        scrollEnablerProps={{onLayout, scrollEnabled, onContentSizeChange}}
        ref={props.forwardedRef}
      />
    );
  };

  return forwardRef(ScrollEnabler) as any;
}

export default withScrollEnabler;
