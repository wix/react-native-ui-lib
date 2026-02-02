import {Easings, type Spring, type Easing} from './tokens';

// TODO Consider either replacing raw values usage with token names, or introducing a
//   higher-order types that encapsulate tokens from values

export type SpringInterpolationSpecs = {
  type: 'spring';
  spring: Spring;
}

export type TweenInterpolationSpecs = {
  type: 'tween';
  duration: number;
  easingName: string;
}

export type InterpolationSpecs = SpringInterpolationSpecs | TweenInterpolationSpecs;

export function getEasing(easingName: string): Easing | null {
  return easingName ? Easings[easingName] as Easing : null;
}
