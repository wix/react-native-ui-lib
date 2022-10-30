/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useCallback} from 'react';
import {
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  WithTimingConfig,
  WithSpringConfig
} from 'react-native-reanimated';
import type {HiddenLocation} from '../hooks/useHiddenLocation';
import {PanningDirections, PanningDirectionsEnum, DEFAULT_ANIMATION_CONFIG} from '../panView';
import useAnimationEndNotifier, {
  AnimationNotifierEndProps,
  TransitionViewAnimationType
} from './useAnimationEndNotifier';
const TransitionViewDirectionEnum = PanningDirectionsEnum;
type TransitionViewDirection = PanningDirections;
export {TransitionViewAnimationType, TransitionViewDirectionEnum, TransitionViewDirection};

const ENTER_ANIMATION_CONFIG = DEFAULT_ANIMATION_CONFIG;
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
  onInitPosition: () => void;
}

export default function useAnimatedTransition(props: AnimatedTransitionProps) {
  const {hiddenLocation, onInitPosition, enterFrom, exitTo, onAnimationStart, onAnimationEnd, delay} = props;

  // Has to start at {0, 0} with {opacity: 0} so layout can be measured
  const translationX = useSharedValue<number>(0);
  const translationY = useSharedValue<number>(0);
  const {onEnterAnimationEnd, onExitAnimationEnd} = useAnimationEndNotifier({onAnimationEnd});

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

  const initPosition = useCallback(() => {
    'worklet';
    const to = getLocation(enterFrom);
    // @ts-expect-error
    if ([TransitionViewDirectionEnum.LEFT, TransitionViewDirectionEnum.RIGHT].includes(enterFrom)) {
      translationX.value = withTiming(to.x, {duration: 0}, animateIn);
      // @ts-expect-error
    } else if ([TransitionViewDirectionEnum.UP, TransitionViewDirectionEnum.DOWN].includes(enterFrom)) {
      translationY.value = withTiming(to.y, {duration: 0}, animateIn);
    }

    onInitPosition();
  }, [onInitPosition]);

  useEffect(() => {
    if (hiddenLocation.wasMeasured && enterFrom) {
      initPosition();
    }
  }, [hiddenLocation]);

  const translateTo = useCallback((to: {x: number; y: number},
    animation: typeof withTiming | typeof withSpring,
    animationConfig: WithTimingConfig | WithSpringConfig,
    animationDirection: TransitionViewDirection,
    callback: (isFinished?: boolean) => void,
    delay = 0) => {
    'worklet';
    // @ts-expect-error
    if ([TransitionViewDirectionEnum.LEFT, TransitionViewDirectionEnum.RIGHT].includes(animationDirection)) {
      translationX.value = withDelay(delay, animation(to.x, animationConfig, callback));
      // @ts-expect-error
    } else if ([TransitionViewDirectionEnum.UP, TransitionViewDirectionEnum.DOWN].includes(animationDirection)) {
      translationY.value = withDelay(delay, animation(to.y, animationConfig, callback));
    }
  },
  []);

  const animateIn = useCallback(() => {
    'worklet';
    if (enterFrom) {
      if (onAnimationStart) {
        runOnJS(onAnimationStart)('enter');
      }

      translateTo({x: 0, y: 0}, withSpring, ENTER_ANIMATION_CONFIG, enterFrom, onEnterAnimationEnd, delay?.enter);
    }
  }, [onEnterAnimationEnd, delay?.enter]);

  const animateOut = useCallback(() => {
    'worklet';
    if (exitTo) {
      if (onAnimationStart) {
        runOnJS(onAnimationStart)('exit');
      }

      translateTo(getLocation(exitTo), withTiming, EXIT_ANIMATION_CONFIG, exitTo, onExitAnimationEnd, delay?.exit);
    }
  }, [hiddenLocation, exitTo, onExitAnimationEnd, delay?.exit]);

  return {animateIn, animateOut, translation: {x: translationX, y: translationY}};
}
