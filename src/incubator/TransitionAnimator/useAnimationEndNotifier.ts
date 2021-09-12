import {useCallback} from 'react';
import {runOnJS} from 'react-native-reanimated';

export type TransitionAnimationEndType = 'in' | 'out';

export interface AnimationNotifierEndProps {
  /**
   * Callback to the animation end.
   */
  onAnimationEnd?: (animationType: TransitionAnimationEndType) => void;
}

export default function useAnimationEndNotifier(props: AnimationNotifierEndProps) {
  const {onAnimationEnd} = props;

  const onEnterAnimationEnd = useCallback((isFinished: boolean) => {
    'worklet';
    if (onAnimationEnd && isFinished) {
      runOnJS(onAnimationEnd)('in');
    }
  },
  [onAnimationEnd]);

  const onExitAnimationEnd = useCallback((isFinished: boolean) => {
    'worklet';
    if (onAnimationEnd && isFinished) {
      runOnJS(onAnimationEnd)('out');
    }
  },
  [onAnimationEnd]);

  return {onEnterAnimationEnd, onExitAnimationEnd};
}
