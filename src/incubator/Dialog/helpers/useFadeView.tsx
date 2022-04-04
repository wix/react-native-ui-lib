/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {useSharedValue, withTiming, useAnimatedStyle} from 'react-native-reanimated';
import {Colors} from 'style';
import View from '../../../components/view';
import {ModalProps} from '../../../components/modal';
import {TransitionViewAnimationType} from '../../TransitionView';
import {ImperativeDialogProps} from '../types';

const DEFAULT_OVERLAY_BACKGROUND_COLORS = Colors.rgba(Colors.grey20, 0.65);

export type AnimationType = TransitionViewAnimationType;

export type FadeViewProps = Pick<ImperativeDialogProps, 'initialVisibility' | 'testID'> &
  Pick<ModalProps, 'overlayBackgroundColor'>;

export interface FadeViewMethods {
  hideNow: () => void;
}

const useFadeView = (props: FadeViewProps) => {
  const {initialVisibility, overlayBackgroundColor = DEFAULT_OVERLAY_BACKGROUND_COLORS, testID} = props;
  const fadeOpacity = useSharedValue<number>(Number(initialVisibility));

  const hideNow = useCallback(() => {
    fadeOpacity.value = 0;
  }, []);

  const fade = useCallback((type: AnimationType) => {
    fadeOpacity.value = withTiming(Number(type === 'enter'), {duration: 300});
  }, []);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeOpacity.value,
      backgroundColor: overlayBackgroundColor
    };
  }, [overlayBackgroundColor]);

  const FadeView = <View testID={testID} absF reanimated style={fadeStyle} pointerEvents="none"/>;

  return {FadeView, hideNow, fade};
};

export default useFadeView;
