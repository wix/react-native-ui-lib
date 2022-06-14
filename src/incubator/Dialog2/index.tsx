import {isEmpty} from 'lodash';
import React, {useRef, useMemo, useCallback, useState} from 'react';
import {StyleSheet, View as RNView} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Spacings, Colors, BorderRadiuses} from 'style';
import {asBaseComponent, Constants} from '../../commons/new';
import {useDidUpdate} from 'hooks';
import View from '../../components/view';
import Modal from '../../components/modal';
import {extractAlignmentsValues} from '../../commons/modifiers';
import useHiddenLocation from '../hooks/useHiddenLocation';
import usePanGesture from '../panView/usePanGesture';
import useAnimatedTransition, {TransitionViewAnimationType} from '../TransitionView/useAnimatedTransition';
import DialogHeader from './DialogHeader';
import {DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps} from './types';
export {DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps};
import useFadeView from './helpers/useFadeView';

const Dialog = (props: DialogProps) => {
  const {
    visible: propsVisibility,
    headerProps,
    containerStyle,
    onDismiss,
    direction = DialogDirectionsEnum.DOWN,
    ignoreBackgroundPress,
    modalProps = {},
    useSafeArea,
    testID,
    children
  } = props;
  const {overlayBackgroundColor, ...otherModalProps} = modalProps;
  const initialVisibility = useRef(propsVisibility);
  const [visible, setVisible] = useState(propsVisibility);
  const containerRef = React.createRef<RNView>();

  const directions = useMemo((): DialogDirections[] => {
    return [direction];
  }, [direction]);

  const {FadeView, hideNow, fade} = useFadeView({
    visible: initialVisibility.current,
    testID: `${testID}.overlayFadingBackground`,
    overlayBackgroundColor
  });

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

  const {onLayout, hiddenLocation} = useHiddenLocation({containerRef});

  const {reset, panAnimatedStyle, panGestureEvent} = usePanGesture({
    directions,
    dismissible: true,
    animateToOrigin: true,
    onDismiss: onPanViewDismiss,
    hiddenLocation
  });

  const {animatedIn, animateOut, transitionAnimatedStyle} = useAnimatedTransition({
    hiddenLocation,
    enterFrom: direction,
    exitTo: direction,
    onAnimationStart: fade,
    onAnimationEnd: onTransitionAnimationEnd
  });

  const open = useCallback(() => {
    if (!visible) {
      animatedIn();
      reset();
      setVisible(true);
    }
  }, [visible, setVisible, animatedIn, reset]);

  const close = useCallback(() => {
    if (visible) {
      animateOut();
    }
  }, [visible, animateOut]);

  useDidUpdate(() => {
    if (propsVisibility) {
      open();
    } else {
      close();
    }
  }, [propsVisibility]);

  const alignmentStyle = useMemo(() => {
    return {flex: 1, ...extractAlignmentsValues(props)};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useMemo(() => {
    return [styles.defaultDialogStyle, containerStyle, transitionAnimatedStyle, panAnimatedStyle];
  }, [containerStyle, transitionAnimatedStyle, panAnimatedStyle]);

  const renderDialog = () => {
    return (
      // @ts-expect-error missing children TS error started with react 18
      <PanGestureHandler onGestureEvent={isEmpty(directions) ? undefined : panGestureEvent}>
        <View reanimated style={style} onLayout={onLayout} ref={containerRef} bg-red10>
          <DialogHeader {...headerProps}/>
          {children}
        </View>
      </PanGestureHandler>
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
      onBackgroundPress={ignoreBackgroundPress ? undefined : close}
      onRequestClose={ignoreBackgroundPress ? undefined : close}
      onDismiss={undefined}
    >
      {FadeView}
      <View useSafeArea={useSafeArea} pointerEvents={'box-none'} style={alignmentStyle}>
        {renderDialog()}
      </View>
    </Modal>
  );
};

Dialog.displayName = 'Incubator.Dialog';
Dialog.directions = DialogDirectionsEnum;
Dialog.Header = DialogHeader;

export default asBaseComponent<DialogProps>(Dialog);

const styles = StyleSheet.create({
  defaultDialogStyle: {
    marginBottom: Spacings.s5,
    backgroundColor: Colors.$backgroundDefault,
    maxHeight: '60%',
    width: 250,
    borderRadius: BorderRadiuses.br20,
    overflow: 'hidden'
  }
});
