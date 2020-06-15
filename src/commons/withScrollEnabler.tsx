import _ from 'lodash';
import React, {useState, useEffect, useCallback} from 'react';
// eslint-disable-next-line no-unused-vars
import {FlatListProps, ScrollViewProps} from 'react-native';
import forwardRef, {ForwardRefInjectedProps} from './forwardRef';

export type WithScrollEnablerProps = (FlatListProps<any> | ScrollViewProps) & {
  ref?: any;
};
type PropTypes = ForwardRefInjectedProps & WithScrollEnablerProps;
function withScrollEnabler<PROPS extends WithScrollEnablerProps>(
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
        _.invoke(props, 'onContentSizeChange', contentWidth, contentHeight);
      },
      [props]
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
        _.invoke(props, 'onLayout', event);
      },
      [props]
    );

    return (
      <WrappedComponent
        {...props}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        scrollEnabled={scrollEnabled}
        ref={props.forwardedRef}
      />
    );
  };

  return forwardRef(ScrollEnabler) as any;
}

export default withScrollEnabler;
