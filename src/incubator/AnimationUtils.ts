import {
  AnimationCallback,
  SharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
  withTiming,
  WithTimingConfig
} from 'react-native-reanimated';

export const DEFAULT_ANIMATION_VELOCITY = 300;
export const ENTER_ANIMATION_CONFIG = {velocity: DEFAULT_ANIMATION_VELOCITY, damping: 18, stiffness: 100, mass: 0.4};
export const SPRING_BACK_ANIMATION_CONFIG = {
  velocity: DEFAULT_ANIMATION_VELOCITY,
  damping: 20,
  stiffness: 300,
  mass: 0.8
};

export type AnimationType = 'withTiming' | 'withSpring';
export type AnimationConfig = WithTimingConfig | WithSpringConfig;

export interface AnimationDetails {
  to: {x: number; y: number};
  prev?: {x: number; y: number};
  delay?: number;
  animationType?: AnimationType;
  animationConfig?: AnimationConfig;
  animationCallback?: AnimationCallback;
}

function _getAnimation(animationDetails: SharedValue<AnimationDetails>, direction: 'x' | 'y') {
  'worklet';
  if (animationDetails.value.to[direction] === animationDetails.value.prev?.[direction]) {
    return;
  } else if (!animationDetails.value.animationType) {
    return animationDetails.value.to[direction];
  }

  const animationFunction = animationDetails.value.animationType === 'withTiming' ? withTiming : withSpring;
  const animation = animationFunction(animationDetails.value.to[direction],
    animationDetails.value.animationConfig,
    animationDetails.value.animationCallback);
  if (animationDetails.value.delay) {
    return withDelay(animationDetails.value.delay, animation);
  }

  return animation;
}

export function getAnimation(animationDetails: SharedValue<AnimationDetails>) {
  'worklet';
  return {x: _getAnimation(animationDetails, 'x'), y: _getAnimation(animationDetails, 'y')};
}
