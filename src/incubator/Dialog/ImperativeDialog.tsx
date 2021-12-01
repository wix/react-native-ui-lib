import React, {useMemo, useCallback, useState, useImperativeHandle, forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {useSharedValue, withTiming, useAnimatedStyle} from 'react-native-reanimated';
import View from '../../components/view';
import Modal from '../../components/modal';
import TransitionView, {TransitionViewAnimationType} from '../TransitionView';
import PanView from '../panView';
import useAlignmentStyle from './helpers/useAlignmentStyle';
import {ImperativeDialogProps, ImperativeDialogMethods, DialogDirections, DialogDirectionsEnum} from './types';
export {DialogDirections, DialogDirectionsEnum};

import {Colors} from 'style';
const DEFAULT_OVERLAY_BACKGROUND_COLORS = Colors.rgba(Colors.black, 0.2);

const ImperativeDialog = (props: ImperativeDialogProps, ref: any) => {
  const {
    initialVisibility = false,
    onDismiss,
    direction = DialogDirectionsEnum.DOWN,
    children,
    ignoreBackgroundPress,
    modalProps = {},
    testID
  } = props;
  const transitionAnimatorRef = React.createRef<typeof TransitionView>();
  const {overlayBackgroundColor = DEFAULT_OVERLAY_BACKGROUND_COLORS, ...otherModalProps} = modalProps;
  const fadeOpacity = useSharedValue<number>(Number(initialVisibility));
  const [visible, setVisible] = useState(initialVisibility);
  const {alignmentStyle} = useAlignmentStyle(props);

  const open = useCallback(() => {
    if (!visible) {
      setVisible(true);
    }
  }, [visible, setVisible]);

  const close = useCallback(() => {
    if (visible) {
      transitionAnimatorRef.current?.animateOut();
    }
  }, [visible, transitionAnimatorRef]);

  useImperativeHandle(ref, () => ({
    open,
    close
  }));

  const directions = useMemo((): DialogDirections[] => {
    return [direction];
  }, [direction]);

  const onBackgroundPress = useCallback(() => {
    close();
  }, [close]);

  const onPanViewDismiss = useCallback(() => {
    fadeOpacity.value = 0;
    setVisible(false);
    onDismiss?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDismiss, setVisible]);

  const onTransitionAnimationStart = useCallback((type: TransitionViewAnimationType) => {
    fadeOpacity.value = withTiming(Number(type === 'enter'), {duration: 300});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTransitionAnimationEnd = useCallback((type: TransitionViewAnimationType) => {
    if (type === 'exit') {
      setVisible(false);
      onDismiss?.();
    }
  },
  [onDismiss, setVisible]);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeOpacity.value,
      backgroundColor: overlayBackgroundColor
    };
  }, [overlayBackgroundColor]);

  const renderDialog = () => {
    {
      /* TODO: remove?
      {this.renderDialogView()}
    {addBottomSafeArea && <View style={{marginTop: bottomInsets}}/>} */
    }
    return (
      <PanView
        directions={directions}
        dismissible
        animateToOrigin
        containerStyle={styles.panView}
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
    );
  };

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
      <View pointerEvents={'none'} style={alignmentStyle}>{renderDialog()}</View>
    </Modal>
  );
};

ImperativeDialog.displayName = 'IGNORE';

export default forwardRef<ImperativeDialogMethods, ImperativeDialogProps>(ImperativeDialog);

const styles = StyleSheet.create({
  panView: {
    position: 'absolute'
  }
});
