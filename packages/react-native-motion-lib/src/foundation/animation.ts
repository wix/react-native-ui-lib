import {type SharedValue} from 'react-native-reanimated';

export type AnimationSpecs = {
  initialValue: number;
  targetValue: number;
  type: 'scale' | 'translationX' | 'translationY' | 'rotationZ' | 'opacity';
}

export const scale = (initialValue: number, targetValue: number): AnimationSpecs =>
  ({initialValue, targetValue, type: 'scale'});

export const translationX = (initialValue: number, targetValue: number): AnimationSpecs =>
  ({initialValue, targetValue, type: 'translationX'});

export const translationY = (initialValue: number, targetValue: number): AnimationSpecs =>
  ({initialValue, targetValue, type: 'translationY'});

export const rotationZ = (initialValue: number, targetValue: number): AnimationSpecs =>
  ({initialValue, targetValue, type: 'rotationZ'});

export const opacity = (initialValue: number, targetValue: number): AnimationSpecs =>
  ({initialValue, targetValue, type: 'opacity'});

export type Animation = {
  initialValue: number;
  targetValue: number;
  applyAnimationStyle: (style: { [key: string]: any }, animatedValue: SharedValue) => void;
};

export function createAnimation(specs: AnimationSpecs): Animation {
  const animation = {
    initialValue: specs.initialValue,
    targetValue: specs.targetValue,
    applyAnimationStyle: (_style: { [key: string]: any }, _animatedValue: SharedValue) => {}
  };

  switch (specs.type) {
    case 'scale':
      animation.applyAnimationStyle = (style: { [key: string]: any }, animatedValue: SharedValue) => {
        'worklet';
        style.transform.push({scale: animatedValue.value});
      };
      break;
    case 'translationX':
      animation.applyAnimationStyle = (style: { [key: string]: any }, animatedValue: SharedValue) => {
        'worklet';
        style.transform.push({translateX: animatedValue.value});
      };
      break;
    case 'translationY':
      animation.applyAnimationStyle = (style: { [key: string]: any }, animatedValue: SharedValue) => {
        'worklet';
        style.transform.push({translateY: animatedValue.value});
      };
      break;
    case 'rotationZ':
      animation.applyAnimationStyle = (style: { [key: string]: any }, animatedValue: SharedValue) => {
        'worklet';
        style.transform.push({rotate: `${animatedValue.value}deg`});
      };
      break;
    case 'opacity':
      animation.applyAnimationStyle = (style: { [key: string]: any }, animatedValue: SharedValue) => {
        'worklet';
        style.opacity = animatedValue.value;
      };
      break;
  }

  return animation as Animation;
}
