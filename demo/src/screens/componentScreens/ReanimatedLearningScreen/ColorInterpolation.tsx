import React from 'react';
import {View, Button} from 'react-native-ui-lib';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, interpolateColor} from 'react-native-reanimated';

export function ColorInterpolation() {
  const color = useSharedValue(0);
  const colorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      color.value,
      [0, 1],
      ['red', 'blue'],
      'LAB'
    ),
  }));
  
  return (
    <View center>
      <Animated.View style={[colorStyle, { width: 150, height: 150, borderRadius: 180 }]} />
      <Button label="animate!" marginT-s4 style={{alignSelf: 'center'}} onPress={() => {
        color.value = withTiming(color.value === 0 ? 1 : 0, { duration: 1000 });
      }} />
    </View>
  );
}
