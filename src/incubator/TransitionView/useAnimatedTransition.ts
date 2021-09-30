/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useCallback} from 'react';
import {runOnJS} from 'react-native-reanimated';
import {Direction, HiddenLocation} from './useHiddenLocation';
import useAnimatedTranslator from './useAnimatedTranslator';
import useAnimationEndNotifier, {
  AnimationNotifierEndProps,
  TransitionViewAnimationType
} from './useAnimationEndNotifier';

export interface AnimatedTransitionProps extends AnimationNotifierEndProps {
  /**
   * Callback to the animation start.
   */
  onAnimationStart?: (animationType: TransitionViewAnimationType) => void;
  /**
   * If this is given there will be an enter animation from this direction.
   */
  enterFrom?: Direction;
  /**
   * If this is given there will be an exit animation to this direction.
   */
  exitTo?: Direction;
}

type Props = AnimatedTransitionProps & {
  hiddenLocation: HiddenLocation;
};

export default function useAnimatedTransition(props: Props) {
  const {hiddenLocation, enterFrom, exitTo, onAnimationStart, onAnimationEnd} = props;

  const {init, animate, animatedStyle} = useAnimatedTranslator({initialVisibility: !enterFrom});
  const {onEnterAnimationEnd, onExitAnimationEnd} = useAnimationEndNotifier({onAnimationEnd});

  const getLocation = (direction?: Direction) => {
    return {
      x: direction && ['left', 'right'].includes(direction) ? hiddenLocation[direction] : 0,
      y: direction && ['top', 'bottom'].includes(direction) ? hiddenLocation[direction] : 0
    };
  };

  useEffect(() => {
    if (!hiddenLocation.isDefault && enterFrom) {
      const location = getLocation(enterFrom);
      init(location, enterFrom, enter);
    }
  }, [hiddenLocation.isDefault]);

  const enter = useCallback(() => {
    'worklet';
    if (enterFrom) {
      if (onAnimationStart) {
        runOnJS(onAnimationStart)('enter');
      }

      animate({x: 0, y: 0}, enterFrom, onEnterAnimationEnd);
    }
  }, [onEnterAnimationEnd]);

  const exit = useCallback(() => {
    'worklet';
    if (exitTo) {
      if (onAnimationStart) {
        runOnJS(onAnimationStart)('exit');
      }

      animate(getLocation(exitTo), exitTo, onExitAnimationEnd);
    }
  }, [hiddenLocation, exitTo, onExitAnimationEnd]);

  return {exit, animatedStyle};
}
