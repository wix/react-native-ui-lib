import {useCallback} from 'react';
import {runOnJS} from 'react-native-reanimated';

export type TransitionViewAnimationType = 'enter' | 'exit';

export interface AnimationNotifierEndProps {
  /**
   * Callback to the animation end.
   */
  onAnimationEnd?: (animationType: TransitionViewAnimationType) => void;
}

export default function useAnimationEndNotifier(props: AnimationNotifierEndProps) {
  const {onAnimationEnd} = props;

  const onEnterAnimationEnd = useCallback((isFinished?: boolean) => {
    'worklet';
    if (onAnimationEnd && isFinished) {
      runOnJS(onAnimationEnd)('enter');
    }
  },
  [onAnimationEnd]);

  const onExitAnimationEnd = useCallback((isFinished?: boolean) => {
    'worklet';
    if (onAnimationEnd && isFinished) {
      runOnJS(onAnimationEnd)('exit');
    }
  },
  [onAnimationEnd]);

  return {onEnterAnimationEnd, onExitAnimationEnd};
}
