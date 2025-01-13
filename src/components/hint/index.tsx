import _ from 'lodash';
import React, {isValidElement, ElementRef, useMemo, useCallback, useRef, useEffect} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View as RNView} from 'react-native';
import {Typography, Spacings, Colors, BorderRadiuses, Shadows} from '../../style';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../view';
import Text from '../text';
import Image from '../image';
import Modal from '../modal';
import TouchableOpacity from '../touchableOpacity';
import {HintPositions, HintProps, TARGET_POSITIONS} from './types';

import {useDidUpdate} from 'hooks';
import useHintAnimation from './hooks/useHintAnimation';
import useHintLayout from './hooks/useHintLayout';
import useHintAccessibility from './hooks/useHintAccessibility';
import useHintPosition from './hooks/useHintPosition';

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
    messageStyle,
    color = DEFAULT_COLOR,
    containerWidth = Constants.windowWidth,
    offset = DEFAULT_HINT_OFFSET,
    edgeMargins: edgeMarginsProp,
    icon,
    iconStyle,
    borderRadius,
    customContent,
    removePaddings,
    enableShadow,
    targetFrame,
    useSideTip,
    onPress,
    onBackgroundPress,
    backdropColor,
    style,
    testID,
    ...others
  } = props;

  const hintRef = useRef<RNView>(null);
  const isUsingModal = onBackgroundPress && useModal;

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
    if (targetLayoutInWindowState && containerPosition?.top && containerPosition?.left) {
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

  const renderHint = () => {
    return (
      <View
        testID={`${testID}.message`}
        row
        centerV
        centerH={!!hintOffsetForShortMessage}
        style={[
          styles.hint,
          !removePaddings && styles.hintPaddings,
          visible && enableShadow && styles.containerShadow,
          {backgroundColor: color},
          !_.isUndefined(borderRadius) && {borderRadius},
          hintOffsetForShortMessage ? {left: hintOffsetForShortMessage} : undefined
        ]}
        onLayout={setHintLayout}
        ref={hintRef}
      >
        {customContent}
        {!customContent && icon && <Image source={icon} style={[styles.icon, iconStyle]}/>}
        {!customContent && (
          <Text recorderTag={'unmask'} style={[styles.hintMessage, messageStyle]} testID={`${testID}.message.text`}>
            {message}
          </Text>
        )}
      </View>
    );
  };

  const renderHintTip = () => {
    const source = shouldUseSideTip ? sideTip : middleTip;
    const flipVertically = position === HintPositions.TOP;
    const flipHorizontally = targetPositionOnScreen === TARGET_POSITIONS.RIGHT;
    const flipStyle = {
      transform: [{scaleY: flipVertically ? -1 : 1}, {scaleX: flipHorizontally ? -1 : 1}]
    };

    return <Image tintColor={color} source={source} style={[styles.hintTip, tipPosition, flipStyle]}/>;
  };

  const renderHintContainer = () => {
    const opacity = onPress ? 0.9 : 1.0;

    if (showHint) {
      return (
        <View
          animated
          style={[{width: containerWidth}, styles.animatedContainer, hintPosition, hintPadding, hintAnimatedStyle]}
          pointerEvents="box-none"
          testID={testID}
        >
          <TouchableOpacity activeOpacity={opacity} onPress={onPress}>
            {renderHint()}
          </TouchableOpacity>
          {renderHintTip()}
        </View>
      );
    }
  };

  const renderHintAnchor = () => {
    return (
      <View
        {...others}
        // this view must be collapsable, don't pass testID or backgroundColor etc'.
        collapsable
        testID={undefined}
        style={[styles.container, style, containerPosition, !isUsingModal && styles.overlayContainer]}
      >
        {renderHintContainer()}
      </View>
    );
  };

  const renderMockChildren = () => {
    const isBackdropColorPassed = backdropColor !== undefined;
    if (children && React.isValidElement(children)) {
      const layout = {
        ...containerPosition,
        width: targetLayout?.width,
        height: targetLayout?.height,
        right: Constants.isRTL ? targetLayout?.x : undefined,
        left: Constants.isRTL ? undefined : targetLayout?.x
      };

      return (
        <View style={[styles.mockChildrenContainer, layout, !isBackdropColorPassed && styles.hidden]}>
          {React.cloneElement<any>(children, {
            collapsable: false,
            key: 'mock',
            style: [children.props.style, styles.mockChildren]
          })}
        </View>
      );
    }
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
