import React from 'react';
import {type ViewStyle} from 'react-native';
import {View, Text, Button} from 'react-native-ui-lib';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, useDerivedValue} from 'react-native-reanimated';
import { Easings } from './tokens';

export function CardFlip() {
  const duration = 1500;
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  // Use derived value to compute zIndex based on rotation angle
  // When rotation < 90: front is on top (zIndex 1), back is behind (zIndex 0)
  // When rotation >= 90: back is on top (zIndex 1), front is behind (zIndex 0)
  const zIndexFront = useDerivedValue(() => (rotate.value < 90 ? 1 : 0));
  const zIndexBack = useDerivedValue(() => (rotate.value >= 90 ? 1 : 0));

  const animStyleF = useAnimatedStyle(() => ({
    transform: [
      {scaleX: scale.value},
      {scaleY: scale.value},
      {rotateY: `${rotate.value}deg`},
    ],
    zIndex: zIndexFront.value,
  }));
  const animStyleB = useAnimatedStyle(() => ({
    transform: [
      {scaleX: scale.value},
      {scaleY: scale.value},
      {rotateY: `${rotate.value}deg`},
    ],
    zIndex: zIndexBack.value,
  }));

  // useAnimatedReaction(
  //   () => rotate.value,
  //   (value, prev) => {
  //     if (prev < 90 && value >= 90) {
  //       runOnJS(setFrontOrBack)('back');
  //     } else if (prev > 90 && value <= 90) {
  //       runOnJS(setFrontOrBack)('front');
  //     }
  //   }
  // )

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
      <View center height={100} style={{marginVertical: 50}}>
        <Animated.View
          style={[ animStyleF, { ...cardStyle, backgroundColor: 'hsl(54, 100.00%, 57.50%)' } ]}
          >
          <Text center>Front</Text>
        </Animated.View>

        <Animated.View
          style={[ animStyleB, { ...cardStyle, backgroundColor: 'hsl(207, 66.50%, 44.50%)' } ]}
          >
          <Text center white>Back</Text>
        </Animated.View>
      </View>
      <Button marginB-s4 label="animate!" style={{alignSelf: 'center'}} onPress={() => {
        rotate.value = withTiming(rotate.value === 0 ? 180 : 0, {duration});
        scale.value = scale.value === 1 ?
          withTiming(1.5, { duration, easing: Easings.backInOut }) :
          withTiming(1, { duration, easing: Easings.backInOut });
      }} />
    </>
  );
}
