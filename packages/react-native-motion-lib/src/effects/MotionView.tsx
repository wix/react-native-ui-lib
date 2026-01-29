import React, {useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import {applyMotion, type MotionSpecs, type MotionAnimatedValues} from '../foundation';

export type MotionViewProps = {
  motion: MotionSpecs;
  children?: React.ReactNode;
};

export function MotionView({motion, children}: MotionViewProps) {
  const animatedValues: MotionAnimatedValues = {};
  Object.keys(motion).forEach((key) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    animatedValues[key as keyof MotionSpecs] = useSharedValue(motion[key as keyof MotionSpecs]!.initial);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const style: { [key: string]: any } = {
      transform: []
    };

    applyMotion(motion, style, animatedValues);
    return style;
  });

  useEffect(() => {
    Object.keys(motion).forEach((key) => {
      animatedValues[key as keyof MotionSpecs]!.value = motion[key as keyof MotionSpecs]!.animation;
    });
  }, [motion]);

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}
