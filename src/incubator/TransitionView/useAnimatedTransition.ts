/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useCallback} from 'react';
import {runOnJS, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {HiddenLocation} from '../hooks/useHiddenLocation';
import {PanningDirections, PanningDirectionsEnum, DEFAULT_ANIMATION_CONFIG} from '../panView';
import useAnimationEndNotifier, {
  AnimationNotifierEndProps,
  TransitionViewAnimationType
} from './useAnimationEndNotifier';
const TransitionViewDirectionEnum = PanningDirectionsEnum;
type TransitionViewDirection = PanningDirections;
export {TransitionViewAnimationType, TransitionViewDirectionEnum, TransitionViewDirection};

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
  hiddenLocation: HiddenLocation;
  onInitPosition: () => void;
}

export default function useAnimatedTransition(props: AnimatedTransitionProps) {
  const {hiddenLocation, onInitPosition, enterFrom, exitTo, onAnimationStart, onAnimationEnd} = props;

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

  const initPosition = useCallback((to: {x: number; y: number},
    animationDirection: TransitionViewDirection,
    callback: (isFinished?: boolean) => void) => {
    'worklet';
    // @ts-expect-error
    if ([TransitionViewDirectionEnum.LEFT, TransitionViewDirectionEnum.RIGHT].includes(animationDirection)) {
      translationX.value = withTiming(to.x, {duration: 0}, callback);
      // @ts-expect-error
    } else if ([TransitionViewDirectionEnum.UP, TransitionViewDirectionEnum.DOWN].includes(animationDirection)) {
      translationY.value = withTiming(to.y, {duration: 0}, callback);
    }

    onInitPosition();
  },
  [onInitPosition]);

  useEffect(() => {
    if (!hiddenLocation.wasMeasured && enterFrom) {
      const location = getLocation(enterFrom);
      initPosition(location, enterFrom, animateIn);
    }
  }, [hiddenLocation.wasMeasured]);

  const translateTo = useCallback((to: {x: number; y: number},
    animationDirection: TransitionViewDirection,
    callback: (isFinished?: boolean) => void) => {
    'worklet';
    // @ts-expect-error
    if ([TransitionViewDirectionEnum.LEFT, TransitionViewDirectionEnum.RIGHT].includes(animationDirection)) {
      translationX.value = withSpring(to.x, DEFAULT_ANIMATION_CONFIG, callback);
      // @ts-expect-error
    } else if ([TransitionViewDirectionEnum.UP, TransitionViewDirectionEnum.DOWN].includes(animationDirection)) {
      translationY.value = withSpring(to.y, DEFAULT_ANIMATION_CONFIG, callback);
    }
  },
  []);

  const animateIn = useCallback(() => {
    'worklet';
    if (enterFrom) {
      if (onAnimationStart) {
        runOnJS(onAnimationStart)('enter');
      }

      translateTo({x: 0, y: 0}, enterFrom, onEnterAnimationEnd);
    }
  }, [onEnterAnimationEnd]);

  const animateOut = useCallback(() => {
    'worklet';
    if (exitTo) {
      if (onAnimationStart) {
        runOnJS(onAnimationStart)('exit');
      }

      translateTo(getLocation(exitTo), exitTo, onExitAnimationEnd);
    }
  }, [hiddenLocation, exitTo, onExitAnimationEnd]);

  return {animateIn, animateOut, translation: {x: translationX, y: translationY}};
}
