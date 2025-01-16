import React, {isValidElement, ElementRef, useMemo, useCallback, useRef, useEffect} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View as RNView} from 'react-native';
import {Typography, Spacings, Colors, BorderRadiuses, Shadows} from '../../style';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../view';
import Modal from '../modal';
import {HintPositions, HintProps, TARGET_POSITIONS} from './types';

import {useDidUpdate} from 'hooks';
import useHintAnimation from './hooks/useHintAnimation';
import useHintLayout from './hooks/useHintLayout';
import useHintAccessibility from './hooks/useHintAccessibility';
import useHintPosition from './hooks/useHintPosition';
import HintMockChildren from './HintMockChildren';
import HintAnchor from './HintAnchor';

const DEFAULT_COLOR = Colors.$backgroundPrimaryHeavy;
const DEFAULT_HINT_OFFSET = Spacings.s4;
const DEFAULT_EDGE_MARGINS = Spacings.s5;
const HINT_MIN_WIDTH = 68;

const NewHint = (props: HintProps) => {
  const {
    visible,
    useModal,
    position,
    children,
    message,
    containerWidth = Constants.windowWidth,
    offset = DEFAULT_HINT_OFFSET,
    edgeMargins: edgeMarginsProp,
    targetFrame,
    useSideTip,
    onBackgroundPress,
    backdropColor,
    testID
  } = props;

  const hintRef = useRef<RNView>(null);
  const isUsingModal = Boolean(onBackgroundPress && useModal);

  const {hintUnmounted, visibleAnimated, animateHint} = useHintAnimation(visible);
  const {targetLayoutState, targetLayoutInWindowState, hintMessageWidth, targetRef, onTargetLayout, setHintLayout} =
    useHintLayout(!!onBackgroundPress);
  const {focusAccessibilityOnHint, accessibilityInfo} = useHintAccessibility(message);

  useEffect(() => {
    if (targetRef.current && hintRef.current) {
      focusAccessibilityOnHint(targetRef.current, hintRef.current);
    }
  }, []);

  useDidUpdate(() => {
    animateHint();
  }, [visible]);

  const targetLayout = useMemo(() => {
    if (targetFrame) {
      return targetFrame;
    }

    return isUsingModal ? targetLayoutInWindowState : targetLayoutState;
  }, [isUsingModal, targetLayoutState, targetLayoutInWindowState, targetFrame]);

  const setTargetRef = useCallback((ref: ElementRef<typeof RNView>) => {
    targetRef.current = ref;
    if (hintRef.current) {
      focusAccessibilityOnHint(targetRef.current, hintRef.current);
    }
  }, []);

  const isShortMessage = useCallback((messageWidth: number) => {
    return messageWidth && messageWidth < Constants.screenWidth / 2;
  }, []);

  const showHint = !!targetLayout;

  const edgeMargins = useMemo(() => {
    if (edgeMarginsProp !== undefined) {
      return edgeMarginsProp;
    }
    return isUsingModal ? DEFAULT_EDGE_MARGINS : 0;
  }, [isUsingModal, edgeMarginsProp]);

  const {shouldUseSideTip, targetPositionOnScreen, hintPosition, containerPosition, tipPosition, hintPadding} =
    useHintPosition({
      useSideTip,
      position,
      offset,
      targetLayout,
      containerWidth,
      edgeMargins
    });

  const hintOffsetForShortMessage = useMemo(() => {
    let hintMessageOffset = 0;
    if (isShortMessage(hintMessageOffset)) {
      const _hintMessageWidth = hintMessageWidth ?? 0;
      const targetPosition = tipPosition;
      if (targetPosition?.right) {
        hintMessageOffset = -targetPosition?.right + _hintMessageWidth / 2;
      }

      if (targetPosition?.left) {
        hintMessageOffset = targetPosition?.left as number;
        if (targetPositionOnScreen === TARGET_POSITIONS.CENTER) {
          hintMessageOffset -= Constants.screenWidth / 2;
        } else {
          hintMessageOffset -= _hintMessageWidth / 2;
        }
      }
    }

    return hintMessageOffset;
  }, [hintMessageWidth, tipPosition, targetPositionOnScreen, isShortMessage]);

  const hintAnimatedStyle = useMemo(() => {
    const translateY = position === HintPositions.TOP ? -10 : 10;

    return {
      opacity: visibleAnimated,
      transform: [
        {
          translateY: visibleAnimated.interpolate({inputRange: [0, 1], outputRange: [translateY, 0]})
        }
      ]
    };
  }, [position, visibleAnimated]);

  const renderOverlay = () => {
    if (targetLayoutInWindowState && containerPosition?.top !== undefined && containerPosition?.left !== undefined) {
      return (
        <Animated.View
          style={[
            styles.overlay,
            {
              top: containerPosition.top - targetLayoutInWindowState.y,
              left: containerPosition.left - targetLayoutInWindowState.x,
              backgroundColor: backdropColor,
              opacity: visibleAnimated
            }
          ]}
          pointerEvents="box-none"
          testID={`${testID}.overlay`}
        >
          {onBackgroundPress && (
            <TouchableWithoutFeedback style={StyleSheet.absoluteFillObject} onPress={onBackgroundPress}>
              <View flex/>
            </TouchableWithoutFeedback>
          )}
        </Animated.View>
      );
    }
  };

  const renderHintAnchor = () => {
    return (
      <HintAnchor
        {...props}
        hintRef={hintRef}
        setHintLayout={setHintLayout}
        showHint={showHint}
        containerWidth={containerWidth}
        hintPosition={hintPosition}
        hintPadding={hintPadding}
        hintAnimatedStyle={hintAnimatedStyle}
        hintOffsetForShortMessage={hintOffsetForShortMessage}
        shouldUseSideTip={shouldUseSideTip}
        isUsingModal={isUsingModal}
        targetPositionOnScreen={targetPositionOnScreen}
        tipPosition={tipPosition}
        containerPosition={containerPosition}
      />
    );
  };

  const renderMockChildren = () => {
    return (
      <HintMockChildren
        children={children}
        backdropColor={backdropColor}
        containerPosition={containerPosition}
        targetLayout={targetLayout}
      />
    );
  };

  const renderChildren = () => {
    if (!targetFrame && isValidElement(children)) {
      return React.cloneElement<any>(children, {
        key: 'clone',
        collapsable: false,
        onLayout: onTargetLayout,
        ref: setTargetRef,
        ...accessibilityInfo
      });
    }
  };

  if (!visible && hintUnmounted) {
    return children || null;
  }

  return (
    <>
      {renderChildren()}
      {isUsingModal ? (
        <Modal
          visible={showHint}
          animationType={backdropColor ? 'fade' : 'none'}
          overlayBackgroundColor={backdropColor}
          transparent
          onBackgroundPress={onBackgroundPress}
          onRequestClose={onBackgroundPress as () => void}
          testID={`${testID}.modal`}
        >
          {renderMockChildren()}
          {renderHintAnchor()}
        </Modal>
      ) : (
        <>
          {renderOverlay()}
          {renderMockChildren()}
          {renderHintAnchor()}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  hidden: {opacity: 0},
  overlayContainer: {
    zIndex: 10,
    elevation: 10
  },
  mockChildrenContainer: {
    position: 'absolute'
  },
  mockChildren: {
    margin: undefined,
    marginVertical: undefined,
    marginHorizontal: undefined,
    marginTop: undefined,
    marginRight: undefined,
    marginBottom: undefined,
    marginLeft: undefined,

    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined
  },
  overlay: {
    position: 'absolute',
    width: Constants.windowWidth,
    height: Constants.screenHeight
  },
  animatedContainer: {
    position: 'absolute'
  },
  hintTip: {
    position: 'absolute'
  },
  hint: {
    minWidth: HINT_MIN_WIDTH,
    maxWidth: Math.min(Constants.windowWidth - 2 * Spacings.s4, 400),
    borderRadius: BorderRadiuses.br60,
    backgroundColor: DEFAULT_COLOR
  },
  hintPaddings: {
    paddingHorizontal: Spacings.s5,
    paddingTop: Spacings.s3,
    paddingBottom: Spacings.s4
  },
  containerShadow: {
    ...Shadows.sh30.bottom
  },
  hintMessage: {
    ...Typography.text70,
    color: Colors.white,
    flexShrink: 1
  },
  icon: {
    marginRight: Spacings.s4,
    tintColor: Colors.white
  }
});

NewHint.displayName = 'Hint';
NewHint.defaultProps = {
  position: HintPositions.BOTTOM,
  useModal: true
};
NewHint.positions = HintPositions;

export {HintProps};

// @ts-expect-error
export default asBaseComponent<HintProps, typeof NewHint>(NewHint);
