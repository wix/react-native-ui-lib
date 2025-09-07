import { useRef, useCallback, useState } from 'react';
import { Animated } from 'react-native';
import { useDidUpdate } from "../../../hooks";
const ANIMATION_DURATION = 170;
export default function useHintVisibility(visible) {
  const [hintUnmounted, setHintUnmounted] = useState(!visible);
  const visibleAnimated = useRef(new Animated.Value(Number(!!visible)));
  useDidUpdate(() => {
    animateHint();
  }, [visible]);
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
    visibilityProgress: visibleAnimated.current,
    animateHint
  };
}