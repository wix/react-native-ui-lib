import {SharedValue, withSequence, withSpring} from 'react-native-reanimated';

import {Springs} from './tokens';

export type Behavior = {
  scale?: {
    initial: number;
    animation: number;
  };
  translationY?: {
    initial: number;
    animation: number;
  };
  translationX?: {
    initial: number;
    animation: number;
  };
  rotationZ?: {
    initial: number;
    animation: number;
  };
  opacity?: {
    initial: number;
    animation: number;
  };
};

export const Behaviors = {
  BounceUp: (height: number): Behavior => ({
    translationY: {
      initial: 0,
      animation: withSequence(withSpring(-height, Springs.gentle),
        withSpring(0, Springs.wobbly))
    }
  }),

  RollInLeft: (startOffset: number): Behavior => ({
    translationX: {
      initial: -startOffset,
      animation: withSpring(0, Springs.gentle)
    },
    rotationZ: {
      initial: -180,
      animation: withSpring(0, Springs.wobbly)
    }
  })
};

export type BehaviorAnimatedValues = {
    [key in keyof Behavior]?: SharedValue<number>;
  };

// TODO Improve performance here by auto-applying the styling modification method
//   as a method associated with each transformation type (e.g. translationX, translationY, rotationZ)
export function applyBehavior(behavior: Behavior,
  style: { [key: string]: any },
  animatedValues: BehaviorAnimatedValues): void {
  'worklet';

  Object.keys(behavior).forEach((key) => {
    switch (key) {
      case 'scale':
        style.transform.push({scale: animatedValues[key]!.value});
        break;
      case 'translationX':
        style.transform.push({translateX: animatedValues[key]!.value});
        break;
      case 'translationY':
        style.transform.push({translateY: animatedValues[key]!.value});
        break;
      case 'rotationZ':
        style.transform.push({rotate: `${animatedValues[key]!.value}deg`});
        break;
      case 'opacity':
        style.opacity = animatedValues[key]!.value;
        break;
    }
  });
}
