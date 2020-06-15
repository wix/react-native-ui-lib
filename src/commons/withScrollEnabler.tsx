import _ from 'lodash';
import React, {useState, useEffect, useCallback} from 'react';
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
    const [contentSize, setContentSize] = useState(0);
    const [layoutSize, setLayoutSize] = useState(0);

    useEffect(() => {
      const isScrollEnabled = contentSize > layoutSize;
      if (isScrollEnabled !== scrollEnabled) {
        setScrollEnabled(isScrollEnabled);
      }
    }, [contentSize, layoutSize]);

    const onContentSizeChange = useCallback(
      (contentWidth: number, contentHeight: number) => {
        const size = props.horizontal ? contentWidth : contentHeight;
        if (size !== contentSize) {
          setContentSize(size);
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
        if (size !== layoutSize) {
          setLayoutSize(size);
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
