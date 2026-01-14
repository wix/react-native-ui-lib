import React from 'react';
import {type ViewStyle} from 'react-native';
import {View, Text, Button} from 'react-native-ui-lib';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, useDerivedValue} from 'react-native-reanimated';

export function CardFlip() {
  const duration = 500;
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const zIndexFront = useSharedValue(1);
  const zIndexBack = useSharedValue(0);

  // Round zIndex values to integers to avoid precision errors
  // zIndex must be an integer, but withTiming produces floats during animation
  const zIndexFrontRounded = useDerivedValue(() => Math.round(zIndexFront.value));
  const zIndexBackRounded = useDerivedValue(() => Math.round(zIndexBack.value));

  const animStyleF = useAnimatedStyle(() => ({
    transform: [
      {scaleX: scale.value},
      {scaleY: scale.value},
      {rotateY: `${rotate.value}deg`},
    ],
    zIndex: zIndexFrontRounded.value,
  }));
  const animStyleB = useAnimatedStyle(() => ({
    transform: [
      {scaleX: scale.value}, // Scale down to appear behind
      {scaleY: scale.value},
      {rotateY: `${rotate.value}deg`},
    ],
    zIndex: zIndexBackRounded.value,
  }));
  const cardStyle: ViewStyle = {
    position: 'absolute' as const,
    width: 150,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  };

  return (
    <>
      <View center marginB-s4 style={{height: 100}}>
        <Animated.View
          style={[ animStyleF, { ...cardStyle, backgroundColor: 'cyan' } ]}
          >
          <Text center>Front</Text>
        </Animated.View>

        <Animated.View
          style={[ animStyleB, { ...cardStyle, backgroundColor: 'blue' } ]}
          >
          <Text center white>Back</Text>
        </Animated.View>
      </View>
      <Button marginB-s4 label="animate!" style={{alignSelf: 'center'}} onPress={() => {
        scale.value = scale.value === 1 ?
          withTiming(1.5, { duration: 500 }) :
          withTiming(1, { duration: 500 });

        rotate.value = withTiming(rotate.value === 0 ? 180 : 0, {duration});
        // Swap zIndex to flip which card is on top
        zIndexFront.value = withTiming(zIndexFront.value === 1 ? 0 : 1, {duration});
        zIndexBack.value = withTiming(zIndexBack.value === 0 ? 1 : 0, {duration});
      }} />
    </>
  );
}
