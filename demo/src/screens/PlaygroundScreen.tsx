import React, {Component, useState} from 'react';
import {View, ColorPicker, Gradient, Button, GradientTypes} from 'react-native-ui-lib';

export default () => {
  const [colors, setColors] = useState(['#ddaaaa', '#badddd']);
  return (
    <View flex bg-grey80 padding-20 gap-80>
      <ColorPicker colors={colors} initialColor={colors[0]} onSubmit={color => setColors(prev => [...prev, color])}/>
    </View>
  );
};
