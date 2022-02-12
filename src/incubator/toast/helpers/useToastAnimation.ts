import {useRef, useState, useMemo} from 'react';
import {Animated, Easing} from 'react-native';
import {HapticService, HapticType} from 'services';
import {ToastProps} from '../types';

type UseToastAnimationProps = Pick<ToastProps, 'visible' | 'position' | 'onAnimationEnd' | 'enableHapticFeedback'> & {
  toastHeight?: number;
  playAccessibilityFeatures: () => void;
  setTimer: () => void;
};

export default ({
  visible,
  position,
  toastHeight = 500,
  onAnimationEnd,
  enableHapticFeedback,
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

    if (enableHapticFeedback && show) {
      HapticService.triggerHaptic(HapticType.impactMedium, 'Toast');
    }

    setIsAnimating(true);
  };

  const toastOpacity = toastAnimatedValue.current.interpolate({
    inputRange: [0, 0.01, 1],
    outputRange: [0, 1, 1]
  });

  const opacityStyle = useMemo(() => {
    return {opacity: toastOpacity};
  }, []);

  const isTop = position === 'top';
  const positionMultiplier = isTop ? -1 : 1;
  const toastTranslateY = toastAnimatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [positionMultiplier * toastHeight, 0]
  });

  const translateStyle = useMemo(() => {
    return {transform: [{translateY: toastTranslateY}]};
  }, [toastHeight]);

  return {isAnimating, toggleToast, opacityStyle, translateStyle};
};
