import type {Spring, Easing} from './tokens';

export type SpringAnimationProps = {
    spring: Spring;
}

export type TimeAnimationProps = {
    duration: number;
    easing: Easing;
}

export type AnimationProps = SpringAnimationProps | TimeAnimationProps;
