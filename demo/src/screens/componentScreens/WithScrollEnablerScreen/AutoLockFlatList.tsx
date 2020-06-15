import _ from 'lodash';
import React, {memo} from 'react';
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  LayoutChangeEvent
} from 'react-native';
import memoize from 'memoize-one';
import {
  Colors,
  Text,
  View,
  withScrollEnabler,
  WithScrollEnablerProps
} from 'react-native-ui-lib';

export type AutoLockScrollViewProps = FlatListProps<number> & {
  numberOfItems: number;
};

const AutoLockFlatList = (props: AutoLockScrollViewProps) => {
  const numberOfItems = props.numberOfItems;

  const WithScrollEnabler = withScrollEnabler(
    (props: WithScrollEnablerProps) => {
      const getData = memoize((numberOfItems: number) => {
        return [...Array(numberOfItems).keys()];
      });

      function keyExtractor(item: number) {
        return item.toString();
      }
      function renderItem({index}: {index: number}) {
        return (
          <View key={index} style={styles.item}>
            <Text>{index + 1}</Text>
          </View>
        );
      }

      function onContentSizeChange(
        contentWidth: number,
        contentHeight: number
      ) {
        _.invoke(props, 'onContentSizeChange', contentWidth, contentHeight);
        _.invoke(
          props,
          'scrollEnablerProps.onContentSizeChange',
          contentWidth,
          contentHeight
        );
      }

      function onLayout(nativeEvent: LayoutChangeEvent) {
        _.invoke(props, 'onLayout', nativeEvent);
        _.invoke(props, 'scrollEnablerProps.onLayout', nativeEvent);
      }

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
    }
  );

  return <WithScrollEnabler {...props} />;
};

export default memo(AutoLockFlatList);

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
