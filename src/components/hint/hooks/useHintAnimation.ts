import {useRef, useCallback, useState} from 'react';
import {Animated} from 'react-native';

const ANIMATION_DURATION = 170;

export default function useHintAnimation(visible?: boolean) {
  const [hintUnmounted, setHintUnmounted] = useState(!visible);
  const visibleAnimated = useRef(new Animated.Value(Number(!!visible)));

  const toggleAnimationEndedToRemoveHint = useCallback(() => {
    setHintUnmounted(!visible);
  }, [visible]);

  const animateHint = useCallback(() => {
    Animated.timing(visibleAnimated.current, {
      toValue: Number(!!visible),
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start(toggleAnimationEndedToRemoveHint);
  }, [visible, toggleAnimationEndedToRemoveHint]);

  return {
    hintUnmounted,
    visibleAnimated: visibleAnimated.current,
    animateHint
  };
}
