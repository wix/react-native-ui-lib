import React, {Component} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, useWorkletCallback} from 'react-native-reanimated';
import {View, Text as UIText, Card, TextField, Button, Incubator, ColorSliderGroup} from 'react-native-ui-lib';

const Text = Animated.createAnimatedComponent(UIText);
export default () => {
  const value = useSharedValue<Record<'h' | 's' | 'l' | 'a', number>>({h: 100, s: 0.5, l: 0.5, a: 1});
  const textStyle = useAnimatedStyle(() => ({
    color: `hsla(${value.value.h}, ${value.value.s * 100}%, ${value.value.l * 100}%, ${value.value.a})`
  }));
  const onValueChange = useWorkletCallback((color: Record<'h' | 's' | 'l' | 'a', number>) => {
    value.value = color;
  });
  return (
    <View bg-grey80 flex padding-40>
      <Text style={textStyle}>
        Color Slider Group
      </Text>
      <ColorSliderGroup initialColor={{h: 100, s: 0.5, l: 0.5, a: 1}} onValueChange={onValueChange}/>
    </View>
  );
};
