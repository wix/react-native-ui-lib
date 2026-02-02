import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';

import {Easings, getEasing, Springs, type InterpolationSpecs} from '../foundation';

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
  interpolation = {type: 'spring', spring: Springs.gentle}
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
    if (interpolation.type === 'spring') {
      rotate.value = withSpring(flipped ? 180 : 0, interpolation.spring);
    } else {
      rotate.value = withTiming(flipped ? 180 : 0, {
        duration: interpolation.duration,
        easing: getEasing(interpolation.easingName) ?? Easings.standard
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
