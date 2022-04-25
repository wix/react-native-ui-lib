import React, {useRef, useEffect, useCallback, useMemo} from 'react';
import View from '../view';
import {Animated} from 'react-native';

interface Props {
  testID?: string;
  dialogVisibility?: boolean;
  modalVisibility?: boolean;
  overlayBackgroundColor?: string;
  onFadeDone?: () => void;
  fadeOut?: boolean;
}

const OverlayFadingBackground = ({
  testID,
  dialogVisibility,
  modalVisibility,
  overlayBackgroundColor,
  onFadeDone: propsOnFadeDone,
  fadeOut
}: Props) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  const onFadeDone = useCallback(() => {
    isAnimating.current = false;
    propsOnFadeDone?.();
  }, [propsOnFadeDone]);

  const animateFading = useCallback((toValue: number) => {
    isAnimating.current = true;
    Animated.timing(fadeAnimation, {
      toValue,
      duration: 400,
      useNativeDriver: true
    }).start(onFadeDone);
  }, [fadeAnimation, onFadeDone]);

  useEffect(() => {
    if (!isAnimating.current && (!dialogVisibility || fadeOut)) {
      animateFading(0);
    }
  }, [dialogVisibility, animateFading, fadeOut]);

  useEffect(() => {
    if (modalVisibility) {
      animateFading(1);
    }
  }, [modalVisibility, animateFading]);

  const style = useMemo(() => {
    return {
      opacity: fadeAnimation,
      backgroundColor: overlayBackgroundColor
    };
  }, [overlayBackgroundColor, fadeAnimation]);

  return <View testID={testID} absF animated style={style} pointerEvents="none"/>;
};

OverlayFadingBackground.displayName = 'IGNORE';

export default OverlayFadingBackground;
