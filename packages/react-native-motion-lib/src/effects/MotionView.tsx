import React, {useEffect} from 'react';
import Animated, {SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import {createAnimation, createInterpolation, type MotionSpecs} from '../foundation';

export type MotionWrapperProps = {
  motion: MotionSpecs;
  isAnimated: boolean;
  children?: React.ReactNode;
};

export function View({motion, isAnimated, children}: MotionWrapperProps) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animatedValues = motion.animations.map((anim) => useSharedValue(anim.initialValue));
  const animations = motion.animations.map((anim) => createAnimation(anim));

  const animatedStyle = useAnimatedStyle(() => {
    const style: { [key: string]: any } = {
      transform: []
    };

    animations.forEach((anim, index) => {
      anim.applyAnimationStyle(style, animatedValues[index] as SharedValue);
    });
    return style;
  });

  useEffect(() => {
    motion.animations.forEach((anim, index) => {
      const targetValue = isAnimated ? anim.targetValue : anim.initialValue;
      animatedValues[index].value = createInterpolation(motion.interpolation, targetValue);
    });
  }, [isAnimated, motion.interpolation, motion.animations, animatedValues]);

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}
