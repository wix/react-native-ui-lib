import _ from 'lodash';
import React, {useState, useEffect, useCallback, useRef} from 'react';
// eslint-disable-next-line no-unused-vars
import {FlatListProps} from 'react-native';
import {Constants} from 'react-native-ui-lib';
import forwardRef from './forwardRef';

function withScrollEnabler<PROPS extends FlatListProps<any>>(WrappedComponent: React.ComponentType<FlatListProps<any>>): React.ComponentType<PROPS> {
  const ScrollEnabler = (props: FlatListProps<any>) => {
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [contentSize, setContentSize] = useState(0);
    const [layoutSize, setLayoutSize] = useState(0);

    const scrollViewRef = useRef<FlatListProps<any>>(null);

    useEffect(() => {
      const {forwardedRef} = props;
      if (_.isFunction(forwardedRef)) {
        forwardedRef(scrollViewRef);
      } else if (_.isObject(forwardedRef)) {
        forwardedRef.current = scrollViewRef;
      }
    }, [scrollViewRef]);

    useEffect(() => {
      const isScrollEnabled = contentSize > layoutSize;
      if (isScrollEnabled !== scrollEnabled) {
        setScrollEnabled(isScrollEnabled);
        if (Constants.isAndroid && scrollViewRef.current && scrollViewRef.current) {
          if (_.isFunction(scrollViewRef.current.scrollTo)) {
            // ListView
            scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
          } else if (_.isFunction(scrollViewRef.current.scrollToIndex)) {
            // FlatList
            scrollViewRef.current.scrollToIndex({index: 0, animated: false});
          }
        }
      }
    }, [contentSize, layoutSize]);

    const onContentSizeChange = useCallback((contentWidth: number, contentHeight: number) => {
      const size = props.horizontal ? contentWidth : contentHeight;
      if (size !== contentSize) {
        setContentSize(size);
      }
      _.invoke(props, 'onContentSizeChange', contentWidth, contentHeight);
    },
    [props]);

    const onLayout = useCallback((event) => {
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
    [props]);

    return (
      <WrappedComponent
        {...props}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        scrollEnabled={scrollEnabled}
        ref={scrollViewRef}
      />
    );
  };

  return forwardRef(ScrollEnabler) as any;
}

export default withScrollEnabler;
