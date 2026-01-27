import {Springs} from './tokens';
import {type InterpolationSpecs} from './interpolations';
import {AnimationSpecs, rotationZ, translationX} from './animation';

export type MotionSpecs = {
  animations: AnimationSpecs[];
  interpolation: InterpolationSpecs;
}

export const Motions: Record<string, () => MotionSpecs> = {
  RollInLeft: (leftOffset = -100) => {
    return {
      animations: [ 
        rotationZ(-180, 0),
        translationX(leftOffset, 0)
      ],
      interpolation: {
        spring: Springs.wobbly
      }
    };
  }
};
