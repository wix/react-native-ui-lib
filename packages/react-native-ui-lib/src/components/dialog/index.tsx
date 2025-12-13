import React, {useMemo, useCallback, useImperativeHandle, forwardRef, ForwardedRef, useEffect, useState} from 'react';
import {StyleSheet, View as RNView} from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import {Spacings, Colors, BorderRadiuses} from '../../style';
import {useDidUpdate} from '../../hooks';
import {asBaseComponent, Constants} from '../../commons/new';
import View from '../../components/view';
import Modal from '../../components/modal';
import {extractAlignmentsValues} from '../../commons/modifiers';
import useHiddenLocation from '../../hooks/useHiddenLocation';
import DialogHeader from './DialogHeader';
import useDialogContent from './useDialogContent';
import {DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps} from './types';
export {DialogProps, DialogDirections, DialogDirectionsEnum, DialogHeaderProps};

const THRESHOLD_VELOCITY = 750;

export interface DialogStatics {
  directions: typeof DialogDirectionsEnum;
  Header: typeof DialogHeader;
}

export interface DialogImperativeMethods {
  dismiss: () => void;
}

const Dialog = (props: DialogProps, ref: ForwardedRef<DialogImperativeMethods>) => {
  const {
    visible = false,
    headerProps,
    showCloseButton,
    closeButtonProps,
    containerStyle: propsContainerStyle,
    containerProps: propsContainerProps,
    width,
    height,
    onDismiss,
    direction = DialogDirectionsEnum.DOWN,
    ignoreBackgroundPress,
    modalProps = {},
    useSafeArea,
    disableAnimation = false,
    testID,
    children
  } = props;
  const {overlayBackgroundColor = Colors.rgba(Colors.grey10, 0.65), ...otherModalProps} = modalProps;

  const visibility = useSharedValue(0); // value between 0 (closed) and 1 (open)
  const initialTranslation = useSharedValue(0);
  const [modalVisibility, setModalVisibility] = useState(visible); // unfortunately this is needed when changing visibility by the user (clicking on an option etc)

  const {setRef, onLayout, hiddenLocation: _hiddenLocation} = useHiddenLocation<RNView>();
  const hiddenLocation = _hiddenLocation[direction];
  const wasMeasured = _hiddenLocation.wasMeasured;

  const isVertical = useMemo(() => {
    'worklet';
    return direction === DialogDirectionsEnum.DOWN || direction === DialogDirectionsEnum.UP;
  }, [direction]);

  const getTranslationInterpolation = useCallback((value: number) => {
    'worklet';
    return interpolate(value, [0, 1], [hiddenLocation, 0], Extrapolation.CLAMP);
  },
  [hiddenLocation]);

  const getTranslationReverseInterpolation = useCallback((value: number) => {
    'worklet';
    return interpolate(value, [hiddenLocation, 0], [0, 1]);
  },
  [hiddenLocation]);

  const _onDismiss = useCallback(() => {
    'worklet';
    runOnJS(setModalVisibility)(false);
  }, []);

  const close = useCallback(() => {
    'worklet';
    visibility.value = withTiming(0, undefined, _onDismiss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_onDismiss]);

  const open = useCallback(() => {
    'worklet';
    visibility.value = withSpring(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visible) {
      setModalVisibility(true);
    } else if (wasMeasured && modalVisibility) {
      // Close when sending visible = false
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, wasMeasured]);

  useDidUpdate(() => {
    if (wasMeasured) {
      if (modalVisibility) {
        open();
      } else if (Constants.isAndroid) {
        onDismiss?.();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisibility, wasMeasured]);

  const alignmentStyle = useMemo(() => {
    return {flex: 1, alignItems: 'center', ...extractAlignmentsValues(props)};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {renderDialogContent, containerProps, containerStyle} = useDialogContent({
    showCloseButton,
    close,
    closeButtonProps,
    containerStyle: propsContainerStyle,
    containerProps: propsContainerProps,
    headerProps,
    children
  });

  const animatedStyle = useAnimatedStyle(() => {
    if (isVertical) {
      return {
        transform: [{translateY: getTranslationInterpolation(visibility.value)}]
      };
    } else {
      return {
        transform: [{translateX: getTranslationInterpolation(visibility.value)}]
      };
    }
  });

  const style = useMemo(() => {
    return [
      styles.defaultDialogStyle,
      {backgroundColor: Colors.$backgroundDefault},
      containerStyle,
      disableAnimation ? undefined : animatedStyle,
      width ? {width} : undefined,
      height ? {height} : undefined
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerStyle, width, height]);

  const shouldClose = (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    'worklet';
    const wasPannedOverThreshold =
      Math.abs(getTranslationInterpolation(visibility.value)) >= Math.abs(hiddenLocation / 3);

    let velocity;
    switch (direction) {
      case DialogDirectionsEnum.DOWN:
      default:
        velocity = event.velocityY;
        break;
      case DialogDirectionsEnum.UP:
        velocity = -event.velocityY;
        break;
      case DialogDirectionsEnum.LEFT:
        velocity = -event.velocityX;
        break;
      case DialogDirectionsEnum.RIGHT:
        velocity = event.velocityX;
        break;
    }

    const wasFlung = velocity >= THRESHOLD_VELOCITY;

    return wasPannedOverThreshold || wasFlung;
  };

  const panGesture = Gesture.Pan()
    .onStart(event => {
      initialTranslation.value =
        getTranslationReverseInterpolation(isVertical ? event.translationY : event.translationX) - visibility.value;
    })
    .onUpdate(event => {
      visibility.value =
        getTranslationReverseInterpolation(isVertical ? event.translationY : event.translationX) -
        initialTranslation.value;
    })
    .onEnd(event => {
      if (shouldClose(event)) {
        close();
      } else {
        open();
      }
    });

  useImperativeHandle(ref, () => ({
    dismiss: close
  }));

  const renderDialog = () => (
    <GestureDetector gesture={panGesture}>
      <View
        {...containerProps}
        reanimated={!Constants.accessibility.isReduceMotionEnabled}
        style={style}
        onLayout={onLayout}
        ref={setRef}
        testID={testID}
      >
        {renderDialogContent()}
      </View>
    </GestureDetector>
  );

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: visibility.value,
      backgroundColor: overlayBackgroundColor
    };
  }, [overlayBackgroundColor]);

  const renderOverlayView = () => (
    <View testID={`${testID}.overlayFadingBackground`} absF reanimated style={overlayStyle} pointerEvents="none"/>
  );

  return (
    <Modal
      transparent
      animationType={'none'}
      {...otherModalProps}
      testID={`${testID}.modal`}
      useGestureHandlerRootView
      visible={modalVisibility}
      onBackgroundPress={ignoreBackgroundPress ? undefined : close}
      onRequestClose={ignoreBackgroundPress ? undefined : close}
      onDismiss={onDismiss}
    >
      {renderOverlayView()}
      <View useSafeArea={useSafeArea} pointerEvents={'box-none'} style={alignmentStyle}>
        {renderDialog()}
      </View>
    </Modal>
  );
};

Dialog.displayName = 'Dialog';
Dialog.directions = DialogDirectionsEnum;
Dialog.Header = DialogHeader;

const _Dialog = forwardRef<DialogImperativeMethods, DialogProps>(Dialog);
hoistStatics(_Dialog, Dialog);
export default asBaseComponent<DialogProps, DialogStatics>(_Dialog);

const styles = StyleSheet.create({
  defaultDialogStyle: {
    marginBottom: Spacings.s5,
    maxHeight: '60%',
    width: 250,
    borderRadius: BorderRadiuses.br20,
    overflow: 'hidden'
  }
});
