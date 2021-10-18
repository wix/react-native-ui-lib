import React, { ReactNode } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { runOnJS, scrollTo, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { getOrder, getPosition } from './Config';

const { height } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

interface ItemProps {
  item: any;
  index: number;
  positions: Animated.SharedValue<number[]>;
  scrollY: Animated.SharedValue<number>;
  contentHeight: number;
  containerHeight?: number;
  scrolViewRef: React.RefObject<Animated.ScrollView>;
  itemHeight: number;
  onFinish: (item: any) => void;
  renderItem: (item: any) => ReactNode;
  dragableAreaSize?: number;
  dragableAreaSide: 'left' | 'right';
}

const Item = ({ dragableAreaSize, dragableAreaSide, item, positions, index, containerHeight = height - 80, contentHeight, scrollY, scrolViewRef, itemHeight, onFinish, renderItem }: ItemProps) => {
  const topAnimatedValue = useSharedValue(positions.value[index] * itemHeight);
  const zIndex = useSharedValue(0);

  useAnimatedReaction(() => positions.value[index], newOrder => {
    const newPosition = getPosition(newOrder, itemHeight);
    topAnimatedValue.value = withTiming(newPosition);
  });

  const itemStyle = useAnimatedStyle(() => {
    return isAndroid ?
      {
        top: topAnimatedValue.value,
        zIndex: zIndex.value,
        elevation: zIndex.value,
        shadowColor: 'black'
      }
      :
      {
        top: topAnimatedValue.value,
        zIndex: zIndex.value,
        elevation: zIndex.value,
        shadowColor: 'black',
        shadowOffset: { width: zIndex.value, height: 0.5 * zIndex.value },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * zIndex.value
      };
  });

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { y: number, order: number }>({
    onStart: (event, ctx) => {
      ctx.y = topAnimatedValue.value;
      zIndex.value = 3;
    },
    onActive: (event, ctx) => {
      const newPosition = ctx.y + event.translationY;
      topAnimatedValue.value = newPosition;

      const oldOrder = positions.value[index];
      const newOrder = getOrder(newPosition, itemHeight);
      if (oldOrder !== newOrder) {
        positions.value[index] = newOrder;
        const idToSwap = Object.keys(positions.value).find((key: any) => positions.value[key] === newOrder);
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[idToSwap] = oldOrder;
          newPositions[index] = newOrder;
          positions.value = newPositions;
          ctx.order = newOrder;
        }
      }

      const lowerBound = scrollY.value;
      const upperBound = lowerBound + containerHeight - itemHeight;
      const maxScroll = contentHeight - containerHeight;

      if (newPosition < lowerBound) {
        const leftToScrollUp = -scrollY.value;
        const diff = Math.max(leftToScrollUp, newPosition - lowerBound);
        scrollY.value += diff;
        ctx.y += diff;
        topAnimatedValue.value = ctx.y + event.translationY;
        scrollTo(scrolViewRef, 0, scrollY.value, false);
      }
      if (newPosition > upperBound) {
        const leftToScrollDown = maxScroll - scrollY.value;
        const diff = Math.min(leftToScrollDown, newPosition - upperBound);
        scrollY.value += diff;
        ctx.y += diff;
        topAnimatedValue.value = ctx.y + event.translationY;
        scrollTo(scrolViewRef, 0, scrollY.value, false);
      }
    },
    onEnd: (event, ctx) => {
      const newOrder = getOrder(ctx.y + event.translationY, itemHeight);
      let newPosition = getPosition(newOrder, itemHeight);
      if (newPosition < 0) newPosition = 0;
      if (newPosition > contentHeight - itemHeight) newPosition = contentHeight - itemHeight;
      topAnimatedValue.value = withTiming(newPosition, { duration: 200 }, () => runOnJS(onFinish)(positions.value));
      zIndex.value = 0;
    },
  });

  return (
    <Animated.View style={[styles.item, itemStyle]}>
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {
          dragableAreaSize && dragableAreaSize > 0 ?
            <React.Fragment>
              <Animated.View style={{ flex: 1, width: '100%' }}>{renderItem(item)}</Animated.View>
              <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[StyleSheet.absoluteFill, { width: dragableAreaSize }, dragableAreaSide === 'left' ? { right: 'auto' } : { left: 'auto' }]} />
              </PanGestureHandler>
            </React.Fragment>
            :
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={{ flex: 1, width: '100%' }}>{renderItem(item)}</Animated.View>
            </PanGestureHandler>
        }
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    width: '100%',
  }
});

export default Item;
