import React, {useRef, useEffect, useCallback, useMemo} from 'react';
import View from '../view';
import {Animated} from 'react-native';

interface Props {
  dialogVisibility: boolean;
  modalVisibility: boolean;
  overlayBackgroundColor: string;
}

export default ({
  dialogVisibility,
  modalVisibility,
  overlayBackgroundColor
}: Props) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!dialogVisibility) {
      animateFading(0);
    }
  }, [dialogVisibility]);

  useEffect(() => {
    if (modalVisibility) {
      animateFading(1);
    }
  }, [modalVisibility]);

  const animateFading = useCallback((toValue) => {
    Animated.timing(fadeAnimation, {
      toValue,
      duration: 400,
      useNativeDriver: true
    }).start();
  }, []);

  const style = useMemo(() => {
    return {
      opacity: fadeAnimation,
      backgroundColor: overlayBackgroundColor
    };
  }, [overlayBackgroundColor]);

  return <View absF animated style={style} pointerEvents="none"/>;
};
