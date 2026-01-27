import React, {useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import {applyBehavior, Behavior, BehaviorAnimatedValues} from '../foundation';

export type BehaviorViewProps = {
  behavior: Behavior;
  children?: React.ReactNode;
};

export function View({behavior, children}: BehaviorViewProps) {
  const animatedValues: BehaviorAnimatedValues = {};
  Object.keys(behavior).forEach((key) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    animatedValues[key as keyof Behavior] = useSharedValue(behavior[key as keyof Behavior]!.initial);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const style: { [key: string]: any } = {
      transform: []
    };

    applyBehavior(behavior, style, animatedValues);
    return style;
  });

  useEffect(() => {
    Object.keys(behavior).forEach((key) => {
      animatedValues[key as keyof Behavior]!.value = behavior[key as keyof Behavior]!.animation;
    });
  }, [behavior]);

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}
