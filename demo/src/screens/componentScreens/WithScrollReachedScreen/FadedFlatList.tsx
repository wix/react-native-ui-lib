import _ from 'lodash';
import React, {memo, useCallback} from 'react';
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import {
  Colors,
  Text,
  View,
  Image,
  withScrollReached,
  WithScrollReachedProps
} from 'react-native-ui-lib';

const FADE_OUT_HEIGHT = 100;
const fadeImage = require('../../../assets/images/FadeOut.png');
const WithScrollReached = (props: WithScrollReachedProps) => {
  const getData = useCallback(() => {
    return [...Array(3).keys()];
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

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      _.invoke(props, 'onScroll', event);
      _.invoke(props, 'scrollReachedProps.onScroll', event);
    },
    [props.onScroll, props.scrollReachedProps.onScroll]
  );

  const renderFade = useCallback(() => {
    if (
      (_.isUndefined(props.scrollEnabled) || props.scrollEnabled) &&
      !props.scrollReachedProps.isScrollAtEnd
    ) {
      return (
        <Image
          style={styles.fadeOutImage}
          testID={`${props.testID}.fadeOut`}
          source={fadeImage}
        />
      );
    }
  }, [
    props.scrollEnabled,
    props.scrollReachedProps.isScrollAtEnd,
    props.testID
  ]);

  return (
    <View>
      <FlatList
        {...props}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        data={getData()}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={onScroll}
      />
      {renderFade()}
    </View>
  );
};

export default memo(withScrollReached(WithScrollReached));

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
  },
  fadeOutImage: {
    position: 'absolute',
    bottom: 0,
    height: FADE_OUT_HEIGHT,
    width: '100%'
  }
});
