/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useCallback} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import type {HiddenLocation} from '../hooks/useHiddenLocation';
import {PanningDirections, PanningDirectionsEnum} from '../panView';
import useAnimationEndNotifier, {
  AnimationNotifierEndProps,
  TransitionViewAnimationType
} from './useAnimationEndNotifier';
const TransitionViewDirectionEnum = PanningDirectionsEnum;
type TransitionViewDirection = PanningDirections;
export {TransitionViewAnimationType, TransitionViewDirectionEnum, TransitionViewDirection};
import {AnimationDetails, AnimationType, AnimationConfig, ENTER_ANIMATION_CONFIG} from '../AnimationUtils';

const EXIT_ANIMATION_CONFIG = {duration: 300};

interface Delay {
  enter?: number;
  exit?: number;
}

export interface AnimatedTransitionProps extends AnimationNotifierEndProps {
  /**
   * Callback to the animation start.
   */
  onAnimationStart?: (animationType: TransitionViewAnimationType) => void;
  /**
   * If this is given there will be an enter animation from this direction.
   */
  enterFrom?: TransitionViewDirection;
  /**
   * If this is given there will be an exit animation to this direction.
   */
  exitTo?: TransitionViewDirection;
  /**
   * Delay the enter \ exit animation.
   */
  delay?: Delay;
  hiddenLocation: HiddenLocation;
}

export default function useAnimatedTransition(props: AnimatedTransitionProps) {
  const {hiddenLocation, enterFrom, exitTo, onAnimationStart, onAnimationEnd, delay} = props;

  const getLocation = (direction?: TransitionViewDirection) => {
    return {
      x:
        //@ts-expect-error
        direction && [TransitionViewDirectionEnum.LEFT, TransitionViewDirectionEnum.RIGHT].includes(direction)
          ? hiddenLocation[direction]
          : 0,
      y:
        //@ts-expect-error
        direction && [TransitionViewDirectionEnum.UP, TransitionViewDirectionEnum.DOWN].includes(direction)
          ? hiddenLocation[direction]
          : 0
    };
  };

  const animationDetails = useSharedValue<AnimationDetails>({to: getLocation(enterFrom)});
  const {onEnterAnimationEnd, onExitAnimationEnd} = useAnimationEndNotifier({onAnimationEnd});
  const isMounted = useSharedValue(false);

  useEffect(() => {
    if (hiddenLocation.wasMeasured && enterFrom) {
      if (!isMounted.value) {
        isMounted.value = true;
      }
    }
  }, [hiddenLocation]);

  const translateTo = useCallback((to: {x: number; y: number},
    animationType: AnimationType,
    animationConfig: AnimationConfig,
    animationDirection: TransitionViewDirection,
    animationCallback: (isFinished?: boolean) => void,
    // eslint-disable-next-line max-params
    delay = 0) => {
    'worklet';
    // @ts-expect-error
    if ([TransitionViewDirectionEnum.LEFT, TransitionViewDirectionEnum.RIGHT].includes(animationDirection)) {
      animationDetails.value = {
        to: {x: to.x, y: 0},
        prev: {x: animationDetails.value.to.x, y: 0},
        animationType,
        animationConfig,
        animationCallback,
        delay
      };
      // @ts-expect-error
    } else if ([TransitionViewDirectionEnum.UP, TransitionViewDirectionEnum.DOWN].includes(animationDirection)) {
      animationDetails.value = {
        to: {x: 0, y: to.y},
        prev: {x: 0, y: animationDetails.value.to.y},
        animationType,
        animationConfig,
        animationCallback,
        delay
      };
    }
  },
  []);

  const animateIn = useCallback(() => {
    'worklet';
    if (enterFrom) {
      onAnimationStart?.('enter');
      translateTo({x: 0, y: 0}, 'withSpring', ENTER_ANIMATION_CONFIG, enterFrom, onEnterAnimationEnd, delay?.enter);
    }
  }, [onEnterAnimationEnd, delay?.enter]);

  const animateOut = useCallback(() => {
    'worklet';
    if (exitTo) {
      onAnimationStart?.('exit');
      translateTo(getLocation(exitTo), 'withTiming', EXIT_ANIMATION_CONFIG, exitTo, onExitAnimationEnd, delay?.exit);
    }
  }, [hiddenLocation, exitTo, onExitAnimationEnd, delay?.exit]);

  const reset = useCallback(() => {
    animationDetails.value = {to: getLocation(exitTo)};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {animateIn, animateOut, animationDetails, isMounted, reset};
}
