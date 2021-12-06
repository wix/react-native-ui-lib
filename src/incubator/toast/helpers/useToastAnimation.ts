import {useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {HapticService, HapticType} from 'services';
import {ToastPreset, ToastProps} from '../types';

interface UseToastAnimationProps extends Pick<ToastProps, 'visible' | 'preset' | 'position' | 'onAnimationEnd'> {
  toastHeight: number;
  playAccessibilityFeatures: () => void;
  setTimer: () => void;
}

export default ({
  visible,
  preset,
  position,
  toastHeight,
  onAnimationEnd,
  setTimer,
  playAccessibilityFeatures
}: UseToastAnimationProps) => {
  const toastAnimatedValue = useRef<Animated.Value>(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState<boolean>();

  const _onAnimationEnd = () => {
    if (visible) {
      setTimer();
    } else {
      setIsAnimating(false);
    }

    playAccessibilityFeatures();
    onAnimationEnd?.(visible);
  };

  const toggleToast = (show = false, {delay}: {delay?: number} = {}) => {
    Animated.timing(toastAnimatedValue.current, {
      toValue: Number(show),
      duration: 300,
      delay,
      easing: Easing.bezier(0.215, 0.61, 0.355, 1),
      useNativeDriver: true
    }).start(_onAnimationEnd);

    if (preset === ToastPreset.FAILURE && show) {
      HapticService.triggerHaptic(HapticType.impactMedium, 'Toast');
    }

    setIsAnimating(true);
  };

  const toastOpacity = toastAnimatedValue.current.interpolate({
    inputRange: [0, 0.01, 1],
    outputRange: [0, 1, 1]
  });

  const isTop = position === 'top';
  const positionMultiplier = isTop ? -1 : 1;
  const toastTranslateY = toastAnimatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [positionMultiplier * toastHeight, 0]
  });

  return {isAnimating, toggleToast, toastOpacity, toastTranslateY};
};
