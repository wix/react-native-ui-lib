import _ from 'lodash';
import React, {isValidElement, ElementRef, useMemo, useCallback, useRef, useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  AccessibilityInfo,
  findNodeHandle,
  TouchableWithoutFeedback,
  View as RNView
} from 'react-native';
import {Typography, Spacings, Colors, BorderRadiuses, Shadows} from '../../style';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../view';
import Text from '../text';
import Image from '../image';
import Modal from '../modal';
import TouchableOpacity from '../touchableOpacity';
import {HintPositions, HintPositionStyle, HintProps, Paddings, Position, TARGET_POSITIONS} from './types';

import {useDidUpdate} from 'hooks';
import useHintAnimation from './hooks/useHintAnimation';
import useHintLayout from './hooks/useHintLayout';

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

  const {hintUnmounted, visibleAnimated, animateHint} = useHintAnimation(visible);
  const {targetLayoutState, targetLayoutInWindowState, hintMessageWidth, targetRef, onTargetLayout, setHintLayout} =
    useHintLayout(!!onBackgroundPress);

  useEffect(() => {
    focusAccessibilityOnHint();
  }, []);

  useDidUpdate(() => {
    animateHint();
  }, [visible]);

  const targetLayout = useMemo(() => {
    if (targetFrame) {
      return targetFrame;
    }

    return onBackgroundPress && useModal ? targetLayoutInWindowState : targetLayoutState;
  }, [onBackgroundPress, useModal, targetLayoutState, targetLayoutInWindowState, targetFrame]);

  const focusAccessibilityOnHint = useCallback(() => {
    const targetRefTag = findNodeHandle(targetRef.current);
    const hintRefTag = findNodeHandle(hintRef.current);

    if (targetRefTag && _.isString(message)) {
      AccessibilityInfo.setAccessibilityFocus(targetRefTag);
    } else if (hintRefTag) {
      AccessibilityInfo.setAccessibilityFocus(hintRefTag);
    }
  }, [message]);

  const setTargetRef = useCallback((ref: ElementRef<typeof RNView>) => {
    targetRef.current = ref;
    focusAccessibilityOnHint();
  }, []);

  const isShortMessage = useCallback((messageWidth: number) => {
    return messageWidth && messageWidth < Constants.screenWidth / 2;
  }, []);

  const showHint = !!targetLayout;
  const isUsingModal = onBackgroundPress && useModal;

  const accessibilityInfo = useMemo(() => {
    if (visible && _.isString(message)) {
      return {
        accessible: true,
        accessibilityLabel: `hint: ${message}`
      };
    }
  }, [visible, message]);

  const edgeMargins = useMemo(() => {
    if (edgeMarginsProp !== undefined) {
      return edgeMarginsProp;
    }
    return isUsingModal ? DEFAULT_EDGE_MARGINS : 0;
  }, [isUsingModal, edgeMarginsProp]);

  const targetPositionOnScreen = useMemo(() => {
    if (targetLayout?.x !== undefined && targetLayout?.width) {
      const targetMidPosition = targetLayout.x + targetLayout.width / 2;

      if (targetMidPosition > containerWidth * (4 / 5)) {
        return TARGET_POSITIONS.RIGHT;
      } else if (targetMidPosition < containerWidth * (1 / 5)) {
        return TARGET_POSITIONS.LEFT;
      }
    }
    return TARGET_POSITIONS.CENTER;
  }, [targetLayout, containerWidth]);

  const shouldUseSideTip = useMemo(() => {
    if (!_.isUndefined(useSideTip)) {
      return useSideTip;
    }

    return targetPositionOnScreen !== TARGET_POSITIONS.CENTER;
  }, [useSideTip, targetPositionOnScreen]);

  const tipSize = useMemo(() => {
    return shouldUseSideTip ? {width: 14, height: 7} : {width: 20, height: 7};
  }, [shouldUseSideTip]);

  const hintPadding = useMemo(() => {
    const paddings: Paddings = {paddingVertical: offset, paddingHorizontal: edgeMargins};

    if (shouldUseSideTip && targetLayout?.x !== undefined) {
      if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
        paddings.paddingLeft = targetLayout.x;
      } else if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT && targetLayout?.width) {
        paddings.paddingRight = containerWidth - targetLayout.x - targetLayout.width;
      }
    }

    return paddings;
  }, [targetLayout, containerWidth, shouldUseSideTip, targetPositionOnScreen, offset, edgeMargins]);

  const hintPosition = useMemo(() => {
    const hintPositionStyle: HintPositionStyle = {alignItems: 'center'};

    if (targetLayout?.x !== undefined) {
      hintPositionStyle.left = -targetLayout.x;
    }

    if (position === HintPositions.TOP) {
      hintPositionStyle.bottom = 0;
    } else if (targetLayout?.height) {
      hintPositionStyle.top = targetLayout.height;
    }

    if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT) {
      hintPositionStyle.alignItems = Constants.isRTL ? 'flex-start' : 'flex-end';
    } else if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
      hintPositionStyle.alignItems = Constants.isRTL ? 'flex-end' : 'flex-start';
    }

    return hintPositionStyle;
  }, [position, targetLayout, targetPositionOnScreen]);

  const containerPosition = useMemo(() => {
    if (targetLayout) {
      return {top: targetLayout.y, left: targetLayout.x};
    }
  }, [targetLayout]);

  const tipPosition = useMemo(() => {
    const tipPositionStyle: Position = {};

    if (position === HintPositions.TOP) {
      tipPositionStyle.bottom = offset - tipSize.height;
      !shouldUseSideTip ? (tipPositionStyle.bottom += 1) : undefined;
    } else {
      tipPositionStyle.top = offset - tipSize.height;
    }

    const layoutWidth = targetLayout?.width || 0;

    if (targetLayout?.x !== undefined) {
      const targetMidWidth = layoutWidth / 2;
      const tipMidWidth = tipSize.width / 2;

      const leftPosition = shouldUseSideTip ? targetLayout.x : targetLayout.x + targetMidWidth - tipMidWidth;
      const rightPosition = shouldUseSideTip
        ? containerWidth - targetLayout.x - layoutWidth
        : containerWidth - targetLayout.x - targetMidWidth - tipMidWidth;

      switch (targetPositionOnScreen) {
        case TARGET_POSITIONS.LEFT:
          tipPositionStyle.left = Constants.isRTL ? rightPosition : leftPosition;
          break;
        case TARGET_POSITIONS.RIGHT:
          tipPositionStyle.right = Constants.isRTL ? leftPosition : rightPosition;
          break;
        case TARGET_POSITIONS.CENTER:
        default:
          tipPositionStyle.left = targetLayout.x + targetMidWidth - tipMidWidth;
          break;
      }
    }

    return tipPositionStyle;
  }, [targetLayout, containerWidth, position, targetPositionOnScreen, offset, shouldUseSideTip, tipSize]);

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
  }, [position]);

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

// @ts-expect-error
export default asBaseComponent<HintProps, typeof NewHint>(NewHint);
