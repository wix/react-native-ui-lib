import React, {Component, useCallback, useRef} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import _ from 'lodash';
import {View, Text, Card, TextField, Button, Constants, TouchableOpacity, Incubator} from 'react-native-ui-lib'; //eslint-disable-line
import Reanimated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  useDerivedValue,
  useAnimatedGestureHandler
} from 'react-native-reanimated';
import {Gesture, GestureDetector, TapGestureHandler} from 'react-native-gesture-handler';
import {FlashList} from '@shopify/flash-list';
import Month from '../../../src/incubator/Calendar/Month';

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

const AnimatedTouchableOpacity = Reanimated.createAnimatedComponent(TouchableOpacity);
// const AnimatedFlatList = Reanimated.createAnimatedComponent(FlashList);

const data = _.times(50, i => i);

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View flex>
        <AnimatedList/>
        {/* <List/> */}
      </View>
    );
  }
}

const AnimatedList = () => {
  const aref = useAnimatedRef<Reanimated.FlatList>();
  const pageIndex = useSharedValue(0);
  // const scrollHandler = useScrollViewOffset(aref);

  useAnimatedStyle(() => {
    // console.log('ethan - scrollHandler', scrollHandler.value);
    return {};
  });

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.item}>
        <Text>{item}</Text>
        {/* <Month year={2023} month={2}/> */}
        <Text>ITEM #{item}</Text>
      </View>
    );
  }, []);

  // const onPress = useCallback(() => {
  //   // 'worklet';
  //   pageIndex.value += 1;
  //   // scrollTo(aref, pageIndex.value * Constants.screenWidth, 0, true);
  //   // aref.current.scrollToOffset({offset: pageIndex.value * Constants.screenWidth});
  // }, []);

  // useAnimatedReaction(() => pageIndex.value,
  //   value => {
  //     console.log('ethan - page index changed', value);
  //     aref.current?.scrollToOffset?.({offset: pageIndex.value * Constants.screenWidth});
  //   });

  const gesture = Gesture.Tap().onBegin(() => {
    // 'worklet';
    pageIndex.value += 1;
    // aref.current.scrollToOffset({offset: pageIndex.value * Constants.screenWidth});
  });

  // const handler = useAnimatedGestureHandler({
  //   onEnd: _ => {
  //     pageIndex.value += 1;
  //   }
  // });

  useDerivedValue(() => {
    // aref.current.scrollToOffset({offset: pageIndex.value * Constants.screenWidth});
    scrollTo(aref, pageIndex.value * Constants.screenWidth, 0, true);
  });

  return (
    <View>
      <GestureDetector gesture={gesture}>
        <View bg-red30 padding-s3>
          <Text>Next (Gesture)</Text>
        </View>
      </GestureDetector>
      {/* <TapGestureHandler onGestureEvent={handler}>
        <View reanimated bg-blue30 padding-s3>
          <Text>Next (Gesture Handler)</Text>
        </View>
      </TapGestureHandler> */}
      {/* <TouchableOpacity onPress={onPress}>
        <View reanimated bg-green30 padding-s3>
          <Text>Next (React)</Text>
        </View>
      </TouchableOpacity> */}
      <AnimatedFlatList ref={aref} horizontal scrollEventThrottle={16} data={data} renderItem={renderItem}/>
    </View>
  );
};

const List = () => {
  const ref = useRef();
  const pageIndex = useRef(0);

  const renderItem = useCallback(({item}) => {
    return (
      <View style={{height: 100, width: Constants.screenWidth, borderWidth: 1}}>
        <Text>ITEM #{item}</Text>
      </View>
    );
  }, []);

  const onPress = useCallback(() => {
    pageIndex.current += 1;
    ref.current.scrollToOffset({offset: pageIndex.current * Constants.screenWidth});
  }, []);

  return (
    <View>
      <Button label="Text" onPress={onPress}/>
      <FlatList ref={ref} horizontal scrollEventThrottle={16} data={data} renderItem={renderItem}/>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 400,
    width: Constants.screenWidth,
    borderWidth: 1
  }
});
