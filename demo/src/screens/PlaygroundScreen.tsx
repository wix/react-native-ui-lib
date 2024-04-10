import React, {Component} from 'react';
import {View, Text, Card, Incubator, TextField, Button} from 'react-native-ui-lib';
import {useSharedValue} from 'react-native-reanimated';

export default () => {
  const value = useSharedValue(0);
  return (
    <View bg-grey80 flex padding-20 gap-40>
      <Incubator.Slider
        syncedSlider
        syncingValue={value}
        onValueChange={(sliderValue: number) => {
          'worklet';
          value.value = sliderValue;
        }}
        useWorkletHandler
      />
      <Incubator.Slider
        syncingValue={value}
        syncedSlider
        onValueChange={(sliderValue: number) => {
          'worklet';
          value.value = sliderValue;
        }}
        useWorkletHandler
      />
    </View>
  );
};
