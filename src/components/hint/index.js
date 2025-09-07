import React, { isValidElement, useMemo, useCallback, useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Typography, Spacings, Colors, BorderRadiuses, Shadows } from "../../style";
import { Constants, asBaseComponent } from "../../commons/new";
import View from "../view";
import Image from "../image";
import Modal from "../modal";
import TouchableOpacity from "../touchableOpacity";
import Assets from "../../assets";
import { HintPositions, HintProps, TargetAlignments } from "./types";
import useHintVisibility from "./hooks/useHintVisibility";
import useHintLayout from "./hooks/useHintLayout";
import useHintAccessibility from "./hooks/useHintAccessibility";
import useHintPosition from "./hooks/useHintPosition";
import HintMockChildren from "./HintMockChildren";
import HintAnchor from "./HintAnchor";
import HintBubble from "./HintBubble";
const DEFAULT_COLOR = Colors.$backgroundPrimaryHeavy;
const DEFAULT_HINT_OFFSET = Spacings.s4;
const DEFAULT_EDGE_MARGINS = Spacings.s5;
const HINT_MIN_WIDTH = 68;
const Hint = props => {
  const {
    visible,
    useModal,
    position,
    children,
    message,
    containerWidth = Constants.windowWidth,
    offset = DEFAULT_HINT_OFFSET,
    edgeMargins = DEFAULT_EDGE_MARGINS,
    targetFrame,
    useSideTip,
    onPress,
    onBackgroundPress,
    backdropColor,
    color = DEFAULT_COLOR,
    icon,
    iconStyle,
    messageStyle,
    removePaddings,
    enableShadow,
    borderRadius,
    customContent,
    testID
  } = props;
  const hintRef = useRef(null);
  const isUsingModal = Boolean(onBackgroundPress && useModal);
  const {
    hintUnmounted,
    visibilityProgress
  } = useHintVisibility(visible);
  const {
    targetLayoutState,
    targetLayoutInWindowState,
    hintMessageWidth,
    targetRef,
    onTargetLayout,
    setHintLayout
  } = useHintLayout({
    onBackgroundPress,
    targetFrame
  });
  const {
    focusAccessibilityOnHint,
    accessibilityInfo
  } = useHintAccessibility(message);
  useEffect(() => {
    if (targetRef.current && hintRef.current) {
      focusAccessibilityOnHint(targetRef.current, hintRef.current);
    }
  }, []);
  const targetLayout = useMemo(() => {
    return isUsingModal ? targetLayoutInWindowState : targetLayoutState;
  }, [isUsingModal, targetLayoutState, targetLayoutInWindowState]);
  const setTargetRef = useCallback(ref => {
    targetRef.current = ref;
    if (hintRef.current) {
      focusAccessibilityOnHint(targetRef.current, hintRef.current);
    }
  }, []);
  const showHint = !!targetLayout;
  const {
    targetAlignmentOnScreen,
    hintContainerLayout,
    tipPositionStyle,
    hintPadding,
    hintPositionStyle,
    targetScreenToRelativeOffset
  } = useHintPosition({
    isUsingModal,
    useSideTip,
    position,
    offset,
    targetLayoutState,
    targetLayoutInWindowState,
    containerWidth,
    edgeMargins,
    hintMessageWidth
  });
  const hintAnimatedStyle = useMemo(() => {
    const translateY = position === HintPositions.TOP ? -10 : 10;
    return {
      opacity: visibilityProgress,
      transform: [{
        translateY: visibilityProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [translateY, 0]
        })
      }]
    };
  }, [position, visibilityProgress]);
  const renderOverlay = () => {
    if (targetLayoutInWindowState && targetScreenToRelativeOffset?.top !== undefined && targetScreenToRelativeOffset?.left !== undefined) {
      return <Animated.View style={[styles.overlay, {
        ...targetScreenToRelativeOffset,
        backgroundColor: backdropColor,
        opacity: visibilityProgress
      }]} pointerEvents="box-none" testID={`${testID}.overlay`}>
          {onBackgroundPress && <TouchableWithoutFeedback style={StyleSheet.absoluteFillObject} onPress={onBackgroundPress}>
              <View flex />
            </TouchableWithoutFeedback>}
        </Animated.View>;
    }
  };
  const renderHintTip = () => {
    const source = useSideTip ? Assets.internal.images.hintTipSide : Assets.internal.images.hintTipMiddle;
    const flipVertically = position === HintPositions.TOP;
    const flipHorizontally = targetAlignmentOnScreen === TargetAlignments.RIGHT;
    const flipStyle = {
      transform: [{
        scaleY: flipVertically ? -1 : 1
      }, {
        scaleX: flipHorizontally ? -1 : 1
      }]
    };
    return <Image tintColor={color} source={source} style={[styles.hintTip, tipPositionStyle, flipStyle]} />;
  };
  const renderHint = () => {
    return <HintBubble visible={visible} message={message} messageStyle={messageStyle} color={color} removePaddings={removePaddings} enableShadow={enableShadow} borderRadius={borderRadius} icon={icon} iconStyle={iconStyle} customContent={customContent} testID={testID} hintRef={hintRef} setHintLayout={setHintLayout} hintPositionStyle={hintPositionStyle} />;
  };
  const renderHintAnchor = () => {
    const opacity = onPress ? 0.9 : 1.0;
    return <HintAnchor {...props} showHint={showHint} containerWidth={containerWidth} hintContainerLayout={hintContainerLayout} hintPadding={hintPadding} hintAnimatedStyle={hintAnimatedStyle} isUsingModal={isUsingModal} targetLayout={targetLayout}>
        <TouchableOpacity activeOpacity={opacity} onPress={onPress}>
          {renderHint()}
        </TouchableOpacity>
        {renderHintTip()}
      </HintAnchor>;
  };
  const renderMockChildren = () => {
    return <HintMockChildren children={children} backdropColor={backdropColor} targetLayout={targetLayout} />;
  };
  const renderChildren = () => {
    if (!targetFrame && isValidElement(children)) {
      return React.cloneElement(children, {
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
  return <>
      {renderChildren()}
      {isUsingModal ? <Modal visible={showHint} animationType={backdropColor ? 'fade' : 'none'} overlayBackgroundColor={backdropColor} transparent onBackgroundPress={onBackgroundPress} onRequestClose={onBackgroundPress} testID={`${testID}.modal`}>
          {renderMockChildren()}
          {renderHintAnchor()}
        </Modal> : <>
          {renderOverlay()}
          {renderMockChildren()}
          {renderHintAnchor()}
        </>}
    </>;
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  hidden: {
    opacity: 0
  },
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
Hint.displayName = 'Hint';
Hint.defaultProps = {
  position: HintPositions.BOTTOM,
  useModal: true
};
Hint.positions = HintPositions;
export { HintProps, Hint };

// @ts-expect-error
export default asBaseComponent(Hint);