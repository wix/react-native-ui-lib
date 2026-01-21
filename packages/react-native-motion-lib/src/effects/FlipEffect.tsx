import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {Springs, type Easing} from '../tokens';
import {AnimationProps, SpringAnimationProps, TimeAnimationProps} from '../types';

type FlipEffectProps = {
  FrontComponent: React.ReactNode;
  BackComponent: React.ReactNode;
  height: number;
  flipped: boolean;
  animation?: AnimationProps;
};

export function FlipEffect({
  FrontComponent,
  BackComponent,
  height,
  flipped = false,
  animation = {spring: Springs.gentle}
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
    if ((animation as SpringAnimationProps).spring !== undefined) {
      rotate.value = withSpring(flipped ? 180 : 0, (animation as SpringAnimationProps).spring);
    } else {
      rotate.value = withTiming(flipped ? 180 : 0, {
        duration: (animation as TimeAnimationProps).duration,
        easing: (animation as TimeAnimationProps).easing as Easing
      });
    }
  }, [flipped, animation, rotate]);
  
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
