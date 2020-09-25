import _ from 'lodash';
import React, {memo, useCallback} from 'react';
// eslint-disable-next-line no-unused-vars
import {ScrollView, StyleSheet, LayoutChangeEvent} from 'react-native';
import {
  Colors,
  Text,
  View,
  withScrollEnabler,
  // eslint-disable-next-line no-unused-vars
  WithScrollEnablerProps
} from 'react-native-ui-lib';

export type AutoLockScrollViewProps = WithScrollEnablerProps & {
  horizontal?: boolean;
  numberOfItems: number;
  onContentSizeChange: (contentWidth: number, contentHeight: number) => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

const WithScrollEnabler = (props: AutoLockScrollViewProps) => {
  const numberOfItems = props.numberOfItems;
  const renderItem = useCallback((index: number) => {
    return (
      <View key={index} style={styles.item}>
        <Text>{index + 1}</Text>
      </View>
    );
  }, []);

  const onContentSizeChange = useCallback(
    (contentWidth: number, contentHeight: number) => {
      _.invoke(props, 'onContentSizeChange', contentWidth, contentHeight);
      _.invoke(
        props,
        'scrollEnablerProps.onContentSizeChange',
        contentWidth,
        contentHeight
      );
    },
    [props.onContentSizeChange, props.scrollEnablerProps.onContentSizeChange]
  );

  const onLayout = useCallback(
    (nativeEvent: LayoutChangeEvent) => {
      _.invoke(props, 'onLayout', nativeEvent);
      _.invoke(props, 'scrollEnablerProps.onLayout', nativeEvent);
    },
    [props.onLayout, props.scrollEnablerProps.onLayout]
  );

  return (
    <ScrollView
      {...props}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={onContentSizeChange}
      onLayout={onLayout}
      scrollEnabled={props.scrollEnablerProps.scrollEnabled}
    >
      {_.times(numberOfItems, renderItem)}
    </ScrollView>
  );
};

export default memo(withScrollEnabler(WithScrollEnabler));

const styles = StyleSheet.create({
  scrollView: {
    height: 240
  },
  scrollViewContainer: {
    alignItems: 'center'
  },
  item: {
    width: 100,
    height: 100,
    margin: 9,
    backgroundColor: Colors.grey40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
