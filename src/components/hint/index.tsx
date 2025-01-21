import React, {isValidElement, ElementRef, useMemo, useCallback, useRef, useEffect} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View as RNView} from 'react-native';
import {Typography, Spacings, Colors, BorderRadiuses, Shadows} from 'style';
import {useDidUpdate} from 'hooks';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../view';
import Image from '../image';
import Modal from '../modal';
import TouchableOpacity from '../touchableOpacity';
import {HintPositions, HintProps, TARGET_POSITIONS} from './types';

import useHintAnimation from './hooks/useHintAnimation';
import useHintLayout from './hooks/useHintLayout';
import useHintAccessibility from './hooks/useHintAccessibility';
import useHintPosition from './hooks/useHintPosition';
import HintMockChildren from './HintMockChildren';
import HintAnchor from './HintAnchor';
import HintBubble from './HintBubble';

const sideTip = require('./assets/hintTipSide.png');
const middleTip = require('./assets/hintTipMiddle.png');

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

  const showHint = !!targetLayout;

  const {
    targetPositionOnScreen,
    hintContainerLayout,
    tipPosition,
    hintPadding,
    hintPositionStyle,
    targetScreenToRelativeOffset
  } = useHintPosition({
    isUsingModal,
    useSideTip,
    position,
    offset,
    targetLayout,
    targetLayoutState,
    targetLayoutInWindowState,
    containerWidth,
    edgeMargins,
    hintMessageWidth
  });

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
    if (
      targetLayoutInWindowState &&
      targetScreenToRelativeOffset?.top !== undefined &&
      targetScreenToRelativeOffset?.left !== undefined
    ) {
      return (
        <Animated.View
          style={[
            styles.overlay,
            {
              ...targetScreenToRelativeOffset,
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

  const renderHintTip = () => {
    const source = useSideTip ? sideTip : middleTip;
    const flipVertically = position === HintPositions.TOP;
    const flipHorizontally = targetPositionOnScreen === TARGET_POSITIONS.RIGHT;
    const flipStyle = {
      transform: [{scaleY: flipVertically ? -1 : 1}, {scaleX: flipHorizontally ? -1 : 1}]
    };

    return <Image tintColor={color} source={source} style={[styles.hintTip, tipPosition, flipStyle]}/>;
  };

  const renderHint = () => {
    return (
      <HintBubble
        visible={visible}
        message={message}
        messageStyle={messageStyle}
        color={color}
        removePaddings={removePaddings}
        enableShadow={enableShadow}
        borderRadius={borderRadius}
        icon={icon}
        iconStyle={iconStyle}
        customContent={customContent}
        testID={testID}
        hintRef={hintRef}
        setHintLayout={setHintLayout}
        hintPositionStyle={hintPositionStyle}
      />
    );
  };

  const renderHintAnchor = () => {
    const opacity = onPress ? 0.9 : 1.0;
    return (
      <HintAnchor
        {...props}
        hintRef={hintRef}
        setHintLayout={setHintLayout}
        showHint={showHint}
        containerWidth={containerWidth}
        hintContainerLayout={hintContainerLayout}
        hintPadding={hintPadding}
        hintAnimatedStyle={hintAnimatedStyle}
        isUsingModal={isUsingModal}
        targetPositionOnScreen={targetPositionOnScreen}
        tipPosition={tipPosition}
        targetLayout={targetLayout}
        hintPositionStyle={hintPositionStyle}
      >
        <TouchableOpacity activeOpacity={opacity} onPress={onPress}>
          {renderHint()}
        </TouchableOpacity>
        {renderHintTip()}
      </HintAnchor>
    );
  };

  const renderMockChildren = () => {
    return (
      <HintMockChildren
        children={children}
        backdropColor={backdropColor}
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
