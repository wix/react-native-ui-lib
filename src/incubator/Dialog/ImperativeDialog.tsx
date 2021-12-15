import React, {useMemo, useCallback, useState, useImperativeHandle, forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import View from '../../components/view';
import Modal from '../../components/modal';
import TransitionView, {TransitionViewAnimationType} from '../TransitionView';
import PanView from '../panView';
import useAlignmentStyle from './helpers/useAlignmentStyle';
import useSafeAreaView from './helpers/useSafeAreaView';
import useFadeView from './helpers/useFadeView';
import {ImperativeDialogProps, ImperativeDialogMethods, DialogDirections, DialogDirectionsEnum} from './types';
export {DialogDirections, DialogDirectionsEnum};

const ImperativeDialog = (props: ImperativeDialogProps, ref: any) => {
  const {
    initialVisibility = false,
    onDismiss,
    direction = DialogDirectionsEnum.DOWN,
    children,
    ignoreBackgroundPress,
    modalProps = {},
    useSafeArea,
    testID
  } = props;
  const transitionAnimatorRef = React.createRef<typeof TransitionView>();
  const {overlayBackgroundColor, ...otherModalProps} = modalProps;
  const [visible, setVisible] = useState(initialVisibility);
  const {alignmentType, alignmentStyle} = useAlignmentStyle(props);
  const {topSafeArea, bottomSafeArea} = useSafeAreaView({useSafeArea, alignmentType});
  const {FadeView, hideNow, fade} = useFadeView({
    initialVisibility,
    testID: `${testID}.overlayFadingBackground`,
    overlayBackgroundColor
  });

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
    hideNow();
    setVisible(false);
    onDismiss?.();
  }, [hideNow, onDismiss, setVisible]);

  const onTransitionAnimationEnd = useCallback((type: TransitionViewAnimationType) => {
    if (type === 'exit') {
      setVisible(false);
      onDismiss?.();
    }
  },
  [onDismiss, setVisible]);

  const renderDialog = () => {
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
          onAnimationStart={fade}
          onAnimationEnd={onTransitionAnimationEnd}
        >
          {topSafeArea}
          {children}
          {bottomSafeArea}
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
      onRequestClose={ignoreBackgroundPress ? undefined : onBackgroundPress}
      onDismiss={undefined}
    >
      {FadeView}
      <View pointerEvents={'box-none'} style={alignmentStyle}>
        {renderDialog()}
      </View>
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
