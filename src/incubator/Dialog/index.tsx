import React, {PropsWithChildren, useMemo, useCallback} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useSharedValue, withTiming, useAnimatedStyle} from 'react-native-reanimated';
import TransitionView, {TransitionViewAnimationType} from '../TransitionView';
import PanView from '../panView';
import {PanningDirections, PanningDirectionsEnum} from '../panView/panningUtil';
import View from '../../components/view';
import Modal, {ModalProps} from '../../components/modal';
import {AlignmentModifiers} from '../../commons/modifiers';
type DialogDirections = PanningDirections;
const DialogDirectionsEnum = PanningDirectionsEnum;
export {DialogDirections, DialogDirectionsEnum};

interface _DialogProps extends AlignmentModifiers {
  /**
   * Control visibility of the dialog.
   */
  visible?: boolean;
  /**
   * Callback that is called after the dialog's dismiss (after the animation has ended).
   */
  onDismiss?: (props?: DialogProps) => void;
  /**
   * The direction from which and to which the dialog is animating \ panning (default bottom).
   */
  direction?: DialogDirections;
  /**
   * The Dialog`s container style (it is set to {position: 'absolute'})
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Whether or not to ignore background press.
   */
  ignoreBackgroundPress?: boolean;
  /**
   * Additional props for the modal.
   */
  modalProps?: ModalProps;
  /**
   * Used to locate this view in end-to-end tests
   * The container has the unchanged id.
   * Currently supported inner IDs:
   * TODO: add missing <TestID>(s?)
   * <TestID>.modal - the Modal's id.
   * <TestID>.overlayFadingBackground - the fading background id.
   */
  testID?: string;
}

export type DialogProps = PropsWithChildren<_DialogProps>;

import {Colors} from 'style';
const DEFAULT_OVERLAY_BACKGROUND_COLORS = Colors.rgba(Colors.black, 0.2);

const Dialog = (props: DialogProps) => {
  const {
    visible = false,
    onDismiss,
    direction = DialogDirectionsEnum.DOWN,
    children,
    containerStyle,
    ignoreBackgroundPress,
    modalProps = {},
    testID
  } = props;
  const transitionAnimatorRef = React.createRef<typeof TransitionView>();
  const {overlayBackgroundColor = DEFAULT_OVERLAY_BACKGROUND_COLORS, ...otherModalProps} = modalProps;
  const fadeOpacity = useSharedValue<number>(Number(visible));

  const directions = useMemo((): DialogDirections[] => {
    return [direction];
  }, [direction]);

  const onBackgroundPress = useCallback(() => {
    transitionAnimatorRef.current?.animateOut();
  }, [transitionAnimatorRef]);

  const onPanViewDismiss = useCallback(() => {
    fadeOpacity.value = 0;
    onDismiss?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDismiss]);

  const onTransitionAnimationStart = useCallback((type: TransitionViewAnimationType) => {
    fadeOpacity.value = withTiming(Number(type === 'enter'), {duration: 300});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTransitionAnimationEnd = useCallback((type: TransitionViewAnimationType) => {
    if (type === 'exit') {
      onDismiss?.();
    }
  },
  [onDismiss]);

  const panStyle = useMemo(() => {
    return [containerStyle, styles.panView];
  }, [containerStyle]);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeOpacity.value,
      backgroundColor: overlayBackgroundColor
    };
  }, [overlayBackgroundColor]);

  return (
    <Modal
      transparent
      animationType={'none'}
      {...otherModalProps}
      testID={`${testID}.modal`}
      useGestureHandlerRootView
      visible={visible}
      onBackgroundPress={ignoreBackgroundPress ? undefined : onBackgroundPress}
      onRequestClose={onBackgroundPress}
      onDismiss={undefined}
    >
      <View testID={`${testID}.overlayFadingBackground`} absF reanimated style={fadeStyle} pointerEvents="none"/>
      {/* TODO: remove?
        {this.renderDialogView()}
      {addBottomSafeArea && <View style={{marginTop: bottomInsets}}/>} */}

      <PanView
        directions={directions}
        dismissible
        animateToOrigin
        containerStyle={panStyle}
        onDismiss={onPanViewDismiss}
      >
        <TransitionView
          ref={transitionAnimatorRef}
          enterFrom={direction}
          exitTo={direction}
          onAnimationStart={onTransitionAnimationStart}
          onAnimationEnd={onTransitionAnimationEnd}
        >
          {children}
        </TransitionView>
      </PanView>
    </Modal>
  );
};

Dialog.displayName = 'Incubator.Dialog';
Dialog.directions = DialogDirectionsEnum;

export default Dialog;

const styles = StyleSheet.create({
  panView: {
    position: 'absolute'
  }
});
