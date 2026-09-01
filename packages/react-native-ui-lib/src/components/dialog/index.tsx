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
// Watchdog cadence for an open animation that never completes. Comfortably longer than a
// healthy open (~240ms measured at 60fps), so a normal open always wins and the watchdog is
// a no-op. Capped so an unrecoverable case degrades to previous behaviour, not a spin.
const OPEN_WATCHDOG_INTERVAL_MS = 400;
const OPEN_WATCHDOG_MAX_ATTEMPTS = 8;

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

  // Watchdog for a dialog that is visible but whose open animation never completes.
  //
  // Two Android-only failures share this remedy, both traced to RN 0.79 returning Size{0,0} from
  // ModalHostViewScreenSize() (ReactCommon/.../modal/platform/cxx/ModalHostViewUtils.cpp; iOS
  // returns a real RCTScreenSize) so the Modal's Fabric state starts 0x0 - facebook/react-native#51048,
  // fixed only in RN 0.81:
  //
  //   never opens   `open()` above is gated on `wasMeasured`, which only flips once onLayout
  //                 reports non-zero width AND height. Inside a 0x0 Modal that may never happen
  //                 and nothing sits behind the gate. Measured at 60fps: visibility stays 0.000.
  //   opens partly  `open()` ran, the spring advanced normally for ~50ms then froze indefinitely -
  //                 0.012 -> 0.043 -> 0.075 -> 0.122, flat after, against a healthy
  //                 0.016 -> 0.110 -> 0.310 -> 0.569 over ~240ms. Orphaned, not overwritten: a raw
  //                 write cancels the animation and jumps within one frame rather than tracking
  //                 the curve first.
  //
  // Armed on `modalVisibility` ALONE, never on `wasMeasured`. An earlier version gated on
  // measurement and missed the case where the watchdog itself opens the dialog while unmeasured
  // and that animation is then orphaned - seen in CI as a sheet stranded at alpha 0.102 with the
  // watchdog never armed. Gating on measurement is what causes the bug; the watchdog must not
  // repeat it.
  //
  // Only re-opens a FROZEN animation. `close()` animates visibility to 0 while `modalVisibility`
  // is still true (it only flips in withTiming's completion callback), so a watchdog that just
  // checked `visibility < 1` would re-open a dialog the user is dismissing. A closing animation
  // changes between ticks and a strand does not, so compare against the previous sample and bail
  // out permanently on any decrease.
  useEffect(() => {
    if (!modalVisibility) {
      return;
    }
    let attempts = 0;
    let previous = visibility.value;
    const interval = setInterval(() => {
      const current = visibility.value;
      attempts += 1;
      if (current >= 1 || current < previous || attempts > OPEN_WATCHDOG_MAX_ATTEMPTS) {
        clearInterval(interval);
        return;
      }
      if (current === previous) {
        open();
      }
      previous = current;
    }, OPEN_WATCHDOG_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisibility]);

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
    // MOBAPP-2994: require a deliberate drag before the pan engages. Without this, on Android/Fabric
    // the residual touch stream from a gesture-handler trigger (e.g. List.Item's TapGestureHandler,
    // which fires onPress on END while the touch is still settling) leaks into this freshly-mounted
    // pan and drives `visibility` mid-open, interrupting the open spring so the sheet rests part-way.
    // A plain touchable trigger (Button) lifts cleanly before the modal mounts and is unaffected.
    // 10dp is small enough to keep drag-to-dismiss responsive while ignoring near-static residual touches.
    .minDistance(10)
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
