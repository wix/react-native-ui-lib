import type {Spring, Easing} from './tokens';

export type SpringAnimationSpecs = {
    spring: Spring;
}

export type TimeAnimationSpecs = {
    duration: number;
    easing: Easing;
}

export type AnimationSpecs = SpringAnimationSpecs | TimeAnimationSpecs;
