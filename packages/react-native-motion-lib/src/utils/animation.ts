import {withSpring, withTiming} from 'react-native-reanimated';
import {type AnimationSpecs, type SpringAnimationSpecs, type TimeAnimationSpecs} from '../types';
import {type Easing, type Spring} from '../tokens';

export function createAnimation(animation: AnimationSpecs, targetValue: number): number {
  if ((animation as SpringAnimationSpecs).spring !== undefined) {
    return withSpring(targetValue, (animation as SpringAnimationSpecs).spring as Spring);
  } else {
    return withTiming(targetValue, {
      duration: (animation as TimeAnimationSpecs).duration,
      easing: (animation as TimeAnimationSpecs).easing as Easing
    });
  }
}
