import _ from 'lodash';
import React, {memo, useCallback} from 'react';
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  LayoutChangeEvent
} from 'react-native';
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
    useCallback(
      (props: WithScrollEnablerProps) => {
        const getData = useCallback(
          (numberOfItems: number) => {
            return [...Array(numberOfItems).keys()];
          },
          [numberOfItems]
        );

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
          [
            props.onContentSizeChange,
            props.scrollEnablerProps.onContentSizeChange
          ]
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
      },
      [numberOfItems]
    )
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
