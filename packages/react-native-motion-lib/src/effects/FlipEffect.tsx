import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';

import {Springs, type InterpolationSpecs, type SpringInterpolationSpecs, type TimeInterpolationSpecs} from '../foundation';

type FlipEffectProps = {
  FrontComponent: React.ReactNode;
  BackComponent: React.ReactNode;
  height: number;
  flipped: boolean;
  interpolation?: InterpolationSpecs;
};

export function FlipEffect({
  FrontComponent,
  BackComponent,
  height,
  flipped = false,
  interpolation = {spring: Springs.gentle}
}: FlipEffectProps) {
  const rotate = useSharedValue(0);
  const zIndexFront = useDerivedValue(() => (rotate.value < 90 ? 1 : 0));
  const zIndexBack = useDerivedValue(() => (rotate.value >= 90 ? 1 : 0));

  const animStyleF = useAnimatedStyle(() => ({
    transform: [
      {rotateY: `${rotate.value}deg`}
    ],
    zIndex: zIndexFront.value
  }));
  const animStyleB = useAnimatedStyle(() => ({
    transform: [
      {rotateY: `${rotate.value + 180}deg`}
    ],
    zIndex: zIndexBack.value
  }));

  useEffect(() => {
    if ((interpolation as SpringInterpolationSpecs).spring !== undefined) {
      rotate.value = withSpring(flipped ? 180 : 0, (interpolation as SpringInterpolationSpecs).spring);
    } else {
      rotate.value = withTiming(flipped ? 180 : 0, {
        duration: (interpolation as TimeInterpolationSpecs).duration,
        easing: (interpolation as TimeInterpolationSpecs).easing
      });
    }
  }, [flipped, interpolation, rotate]);
  
  return (
    <View style={{alignItems: 'center', height}} >
      <Animated.View style={[animStyleF, {position: 'absolute' as const}]}>
        {FrontComponent}
      </Animated.View>

      <Animated.View style={[animStyleB, {position: 'absolute' as const}]}>
        {BackComponent}
      </Animated.View>
    </View>
  );
}
