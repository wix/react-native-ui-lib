import React, {Component, useState} from 'react';
import {View, Gradient, Button, MyColorPicker, GradientTypes} from 'react-native-ui-lib';
import Animated, {useSharedValue} from 'react-native-reanimated';
import MyGradient from './Gradient';

export default () => {
  const color = useSharedValue<tinycolor.ColorFormats.HSLA>({h: 300, s: 1, l: 0.5, a: 1});
  return (
    <View flex bg-grey80 padding-20 gap-80>
      <View height={50} gap-50>
        <MyGradient color={color} numberOfSteps={100} type={GradientTypes.SATURATION}/>
      </View>
      <View height={50} gap-50>
        <Gradient numberOfSteps={100} color={color.value} type={GradientTypes.SATURATION}/>
      </View>
      <Button
        label="Change color"
        onPress={() => {
          color.value = {h: Math.floor(Math.random() * 350), s: 1, l: 0.5, a: 1};
        }}
      />
    </View>
  );
};
