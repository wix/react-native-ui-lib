import React, {useEffect} from 'react';
import Animated, {SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {createAnimation} from '../utils/animation';
import {type AnimationSpecs} from '../types';

export type Animation = {
  initialValue: number;
  targetValue: number;
  applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => void;
};

export type AnimationStackProps = {
  animations: Animation[];
  animationSpecs: AnimationSpecs;
  isAnimated: boolean;
  children?: React.ReactNode;
};

export function createScaleAnimation(init: number, target: number): Animation {
  return {
    initialValue: init,
    targetValue: target,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.transform.push({scale: animatedValue.value});
    }
  };
}

export function createTranslationXAnimation(init: number, target: number): Animation {
  return {
    initialValue: init,
    targetValue: target,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.transform.push({translateX: animatedValue.value});
    }
  };
}

export function createTranslationYAnimation(init: number, target: number): Animation {
  return {
    initialValue: init,
    targetValue: target,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.transform.push({translateY: animatedValue.value});
    }
  };
}

export function createRotationZAnimation(init: number, target: number): Animation {
  return {
    initialValue: init,
    targetValue: target,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.transform.push({rotate: `${animatedValue.value}deg`});
    }
  };
}

export function createOpacityAnimation(init: number, target: number): Animation {
  return {
    initialValue: init,
    targetValue: target,
    applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => {
      'worklet';
      style.opacity = animatedValue.value;
    }
  };
}

export function AnimationStack({animations, animationSpecs, isAnimated, children}: AnimationStackProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animatedValues = animations.map((anim) => useSharedValue(anim.initialValue));

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
    animations.forEach((anim, index) => {
      const targetValue = isAnimated ? anim.targetValue : anim.initialValue;
      animatedValues[index].value = createAnimation(animationSpecs, targetValue);
    });
  }, [isAnimated, animationSpecs, animations, animatedValues]);

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}
