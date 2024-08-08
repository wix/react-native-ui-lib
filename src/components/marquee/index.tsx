import React, {useCallback, useEffect, useState} from 'react';
import {LayoutChangeEvent, LayoutRectangle, StyleSheet} from 'react-native';
import {useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing} from 'react-native-reanimated';
import View from '../view';
import Text from '../text';
import {MarqueeDirections, MarqueeProps} from './types';

const DEFAULT_DURATION = 3000;
const DEFAULT_DURATION_PER_WORD = 250;

function Marquee(props: MarqueeProps) {
  const {label, labelStyle, direction = MarqueeDirections.LEFT, duration, numberOfReps = -1, containerStyle} = props;

  const calcDuration = () => {
    const numOfWords = label.split(' ').length;
    return DEFAULT_DURATION + DEFAULT_DURATION_PER_WORD * numOfWords;
  };

  const isHorizontal = direction === MarqueeDirections.LEFT || direction === MarqueeDirections.RIGHT;
  const fixedDuration = duration || (isHorizontal ? calcDuration() : DEFAULT_DURATION);

  const [viewLayout, setViewLayout] = useState<LayoutRectangle | undefined>(undefined);
  const [textLayout, setTextLayout] = useState<LayoutRectangle | undefined>(undefined);

  const offset = useSharedValue<number | undefined>(undefined);

  let initialOffset = 0;
  let axisX = false;
  let axisY = false;

  if (isHorizontal) {
    axisX = true;
  } else {
    axisY = true;
  }

  const onLayoutView = useCallback((event: LayoutChangeEvent) => {
    setViewLayout(event.nativeEvent.layout);
  }, []);

  const onLayoutText = useCallback((event: LayoutChangeEvent) => {
    setTextLayout(event.nativeEvent.layout);
  }, []);

  const startAnimation = (fromValue: number, toValue: number, backToValue: number) => {
    initialOffset = fromValue;
    offset.value = initialOffset;

    offset.value = withRepeat(withTiming(toValue, {duration: fixedDuration, easing: Easing.linear}),
      numberOfReps,
      false,
      finished => {
        if (finished) {
          offset.value = initialOffset;
          offset.value = withTiming(backToValue, {duration: fixedDuration, easing: Easing.linear});
        }
      });
  };

  useEffect(() => {
    if (viewLayout && textLayout) {
      switch (direction) {
        case MarqueeDirections.RIGHT:
          startAnimation(-textLayout.width, viewLayout.width, 0);
          break;
        case MarqueeDirections.LEFT:
          startAnimation(viewLayout?.width, -textLayout.width, viewLayout.width - textLayout.width);
          break;
        case MarqueeDirections.UP:
          startAnimation(viewLayout.height, -textLayout.height, viewLayout.height - textLayout.height);
          break;
        case MarqueeDirections.DOWN:
          startAnimation(-textLayout.height, viewLayout.height, 0);
          break;
      }
    }
  }, [viewLayout, textLayout]);

  const translateStyle = useAnimatedStyle(() => {
    if (offset.value) {
      return {
        transform: [{translateX: axisX ? offset.value : 0}, {translateY: axisY ? offset.value : 0}],
        position: 'absolute',
        width: !isHorizontal || textLayout?.width ? textLayout?.width : '400%'
      };
    }
    return {position: 'absolute', width: !isHorizontal || textLayout?.width ? textLayout?.width : '400%'};
  });

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayoutView}>
      <View reanimated style={[translateStyle]}>
        <Text style={[styles.text, labelStyle]} onLayout={onLayoutText}>
          {label}
        </Text>
      </View>
      <Text style={[styles.text, labelStyle, styles.hiddenText]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export {MarqueeProps, MarqueeDirections};

export default Marquee;

const styles = StyleSheet.create({
  container: {overflow: 'hidden'},
  text: {alignSelf: 'center'},
  hiddenText: {color: 'transparent'}
});
