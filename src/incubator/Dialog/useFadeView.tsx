/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {useSharedValue, withTiming, useAnimatedStyle} from 'react-native-reanimated';
import {Colors} from '../../style';
import View from '../../components/view';
import {ModalProps} from '../../components/modal';
import {TransitionViewAnimationType} from './useAnimatedTransition';
import {DialogProps} from './types';

const DEFAULT_OVERLAY_BACKGROUND_COLORS = Colors.rgba(Colors.grey20, 0.65);

export type AnimationType = TransitionViewAnimationType;

export type FadeViewProps = Pick<DialogProps, 'visible' | 'testID'> & Pick<ModalProps, 'overlayBackgroundColor'>;

const useFadeView = (props: FadeViewProps) => {
  const {visible, overlayBackgroundColor = DEFAULT_OVERLAY_BACKGROUND_COLORS, testID} = props;
  const fadeOpacity = useSharedValue<0 | 1>(visible ? 1 : 0);

  const reset = useCallback(() => {
    fadeOpacity.value = 0;
  }, []);

  const fade = useCallback((type: AnimationType) => {
    'worklet';
    const newValue = type === 'enter' ? 1 : 0;
    if (fadeOpacity.value !== newValue) {
      fadeOpacity.value = newValue;
    }
  }, []);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadeOpacity.value, {duration: 300}),
      backgroundColor: overlayBackgroundColor
    };
  }, [overlayBackgroundColor]);

  const FadeView = <View testID={testID} absF reanimated style={fadeStyle} pointerEvents="none"/>;

  return {FadeView, reset, fade};
};

export default useFadeView;
