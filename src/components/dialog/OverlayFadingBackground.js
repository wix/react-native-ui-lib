import _pt from "prop-types";
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import View from "../view";
import { Animated } from 'react-native';

const OverlayFadingBackground = ({
  testID,
  dialogVisibility,
  modalVisibility,
  overlayBackgroundColor,
  onFadeDone: propsOnFadeDone,
  fadeOut
}) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);
  const onFadeDone = useCallback(() => {
    isAnimating.current = false;
    propsOnFadeDone?.();
  }, [propsOnFadeDone]);
  const animateFading = useCallback(toValue => {
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
  return <View testID={testID} absF animated style={style} pointerEvents="none" />;
};

OverlayFadingBackground.propTypes = {
  testID: _pt.string,
  dialogVisibility: _pt.bool,
  modalVisibility: _pt.bool,
  overlayBackgroundColor: _pt.string,
  onFadeDone: _pt.func,
  fadeOut: _pt.bool
};
OverlayFadingBackground.displayName = 'IGNORE';
export default OverlayFadingBackground;