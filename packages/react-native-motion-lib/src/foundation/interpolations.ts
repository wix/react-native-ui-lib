import {Easings, type Spring, type Easing} from './tokens';

export type SpringInterpolationSpecs = {
  type: 'spring';
  spring: Spring;
}

export type TimeInterpolationSpecs = {
  type: 'timing';
  duration: number;
  easingName: string;
}

export type InterpolationSpecs = SpringInterpolationSpecs | TimeInterpolationSpecs;

export function getEasing(easingName: string): Easing | null {
  return easingName ? Easings[easingName] as Easing : null;
}
