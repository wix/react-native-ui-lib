import _ from 'lodash';
import React, {memo, useCallback} from 'react';
// eslint-disable-next-line no-unused-vars
import {FlatList, StyleSheet, LayoutChangeEvent} from 'react-native';
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

  const getData = useCallback((numberOfItems: number) => {
    return [...Array(numberOfItems).keys()];
  }, []);

  const keyExtractor = useCallback((item: number) => {
    return item.toString();
  }, []);

  const renderItem = useCallback(({index}: {index: number}) => {
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
    <FlatList
      {...props}
      style={styles.flatList}
      contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={getData(numberOfItems)}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onContentSizeChange={onContentSizeChange}
      onLayout={onLayout}
      scrollEnabled={props.scrollEnablerProps.scrollEnabled}
    />
  );
};

export default memo(withScrollEnabler(WithScrollEnabler));

const styles = StyleSheet.create({
  flatList: {
    height: 240
  },
  flatListContainer: {
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
