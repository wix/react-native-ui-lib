import {SharedValue, withSequence, withSpring, withTiming} from 'react-native-reanimated';

import {Easings, Springs} from './tokens';
import {getEasing, InterpolationSpecs} from './interpolations';

export type MotionSpecs = {
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

export const Motions = {
  BounceUp: (height: number): MotionSpecs => ({
    translationY: {
      initial: 0,
      animation: withSequence(withSpring(-height, Springs.gentle),
        withSpring(0, Springs.wobbly))
    }
  }),

  RollInLeft: (startOffset: number): MotionSpecs => ({
    translationX: {
      initial: -startOffset,
      animation: withSpring(0, Springs.gentle)
    },
    rotationZ: {
      initial: -180,
      animation: withSpring(0, Springs.wobbly)
    }
  }),

  SlideInUp: (offset: number): MotionSpecs => ({
    translationY: {
      initial: offset,
      animation: withSpring(0, Springs.gentle)
    },
    opacity: {
      initial: 0,
      animation: withTiming(1, {duration: 350, easing: Easings.accelerate})
    }
  })
};

export class Builder {
  private motion: MotionSpecs = {};
  private createAnimation: (target: number) => number;

  constructor(interpolation: InterpolationSpecs) {
    if ('duration' in interpolation) {
      this.createAnimation = (target: number) => withTiming(target, {
        duration: interpolation.duration,
        easing: getEasing(interpolation.easingName) ?? Easings.standard
      });
    } else {
      this.createAnimation = (target: number) => withSpring(target, interpolation.spring);
    }
  }

  public withScale(initial: number, final: number): Builder {
    this.motion.scale = {initial, animation: this.createAnimation(final)};
    return this;
  }

  public withTranslationX(initial: number, final: number): Builder {
    this.motion.translationX = {initial, animation: this.createAnimation(final)};
    return this;
  }

  public withTranslationY(initial: number, final: number): Builder {
    this.motion.translationY = {initial, animation: this.createAnimation(final)};
    return this;
  }

  public withRotationZ(initial: number, final: number): Builder {
    this.motion.rotationZ = {initial, animation: this.createAnimation(final)};
    return this;
  }

  public withOpacity(initial: number, final: number): Builder {
    this.motion.opacity = {initial, animation: this.createAnimation(final)};
    return this;
  }

  public build(): MotionSpecs {
    return this.motion;
  }
}

export type MotionAnimatedValues = {
  [key in keyof MotionSpecs]?: SharedValue<number>;
};

// TODO Improve performance here by auto-applying the styling modification method
//   as a method associated with each motion key (e.g. scale, translationX)
export function applyMotion(motion: MotionSpecs,
  style: { [key: string]: any },
  animatedValues: MotionAnimatedValues): void {
  'worklet';

  Object.keys(motion).forEach((key) => {
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
