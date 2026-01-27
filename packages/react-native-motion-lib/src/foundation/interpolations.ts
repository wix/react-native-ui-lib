import {withSpring, withTiming} from 'react-native-reanimated';

import type {Spring, Easing} from './tokens';

export type SpringInterpolationSpecs = {
    spring: Spring;
}

export type TimeInterpolationSpecs = {
    duration: number;
    easing: Easing;
}

export type InterpolationSpecs = SpringInterpolationSpecs | TimeInterpolationSpecs;

export function createInterpolation(interpolation: InterpolationSpecs, targetValue: number): number {
  if ((interpolation as SpringInterpolationSpecs).spring !== undefined) {
    return withSpring(targetValue, (interpolation as SpringInterpolationSpecs).spring);
  } else {
    return withTiming(targetValue, {
      duration: (interpolation as TimeInterpolationSpecs).duration,
      easing: (interpolation as TimeInterpolationSpecs).easing as Easing
    });
  }
}
