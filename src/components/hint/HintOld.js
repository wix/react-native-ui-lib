import _isUndefined from "lodash/isUndefined";
import _isEqual from "lodash/isEqual";
import _isString from "lodash/isString";
import React, { Component, isValidElement } from 'react';
import { Animated, StyleSheet, AccessibilityInfo, findNodeHandle, TouchableWithoutFeedback } from 'react-native';
import { Typography, Spacings, Colors, BorderRadiuses, Shadows } from "../../style";
import { Constants, asBaseComponent } from "../../commons/new";
import View from "../view";
import Text from "../text";
import Image from "../image";
import Modal from "../modal";
import TouchableOpacity from "../touchableOpacity";
const sideTip = require("./assets/hintTipSide.png");
const middleTip = require("./assets/hintTipMiddle.png");
const DEFAULT_COLOR = Colors.$backgroundPrimaryHeavy;
const DEFAULT_HINT_OFFSET = Spacings.s4;
const DEFAULT_EDGE_MARGINS = Spacings.s5;
const HINT_MIN_WIDTH = 68;
var TARGET_POSITIONS = /*#__PURE__*/function (TARGET_POSITIONS) {
  TARGET_POSITIONS["LEFT"] = "left";
  TARGET_POSITIONS["RIGHT"] = "right";
  TARGET_POSITIONS["CENTER"] = "center";
  return TARGET_POSITIONS;
}(TARGET_POSITIONS || {});
var HintPositions = /*#__PURE__*/function (HintPositions) {
  HintPositions["TOP"] = "top";
  HintPositions["BOTTOM"] = "bottom";
  return HintPositions;
}(HintPositions || {}); // TODO: unify with FeatureHighlightFrame
/**
 * @description: Hint component for displaying a tooltip over wrapped component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/HintsScreen.tsx
 * @notes: You can either wrap a component or pass a specific targetFrame
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Hint/Hint.gif?raw=true
 */
class Hint extends Component {
  static displayName = 'Hint';
  static defaultProps = {
    position: HintPositions.BOTTOM,
    useModal: true
  };
  static positions = HintPositions;
  targetRef = null;
  hintRef = React.createRef();
  animationDuration = 170;
  state = {
    targetLayoutInWindow: undefined,
    targetLayout: this.props.targetFrame,
    hintUnmounted: !this.props.visible,
    hintMessageWidth: undefined
  };
  visibleAnimated = new Animated.Value(Number(!!this.props.visible));
  componentDidMount() {
    this.focusAccessibilityOnHint();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.animateHint();
    }
  }
  animateHint = () => {
    Animated.timing(this.visibleAnimated, {
      toValue: Number(!!this.props.visible),
      duration: this.animationDuration,
      useNativeDriver: true
    }).start(this.toggleAnimationEndedToRemoveHint);
  };
  toggleAnimationEndedToRemoveHint = () => {
    this.setState({
      hintUnmounted: !this.props.visible
    });
  };
  focusAccessibilityOnHint = () => {
    const {
      message
    } = this.props;
    const targetRefTag = findNodeHandle(this.targetRef);
    const hintRefTag = findNodeHandle(this.hintRef.current);
    if (targetRefTag && _isString(message)) {
      AccessibilityInfo.setAccessibilityFocus(targetRefTag);
    } else if (hintRefTag) {
      AccessibilityInfo.setAccessibilityFocus(hintRefTag);
    }
  };
  setTargetRef = ref => {
    this.targetRef = ref;
    this.focusAccessibilityOnHint();
  };
  setHintLayout = ({
    nativeEvent: {
      layout
    }
  }) => {
    if (!this.state.hintMessageWidth) {
      this.setState({
        hintMessageWidth: layout.width
      });
    }
  };
  onTargetLayout = ({
    nativeEvent: {
      layout
    }
  }) => {
    if (!_isEqual(this.state.targetLayout, layout)) {
      this.setState({
        targetLayout: layout
      });
    }
    if (!this.state.targetLayoutInWindow || this.props.onBackgroundPress) {
      setTimeout(() => {
        this.targetRef?.measureInWindow?.((x, y, width, height) => {
          const targetLayoutInWindow = {
            x,
            y,
            width,
            height
          };
          this.setState({
            targetLayoutInWindow
          });
        });
      });
    }
  };
  getAccessibilityInfo() {
    const {
      visible,
      message
    } = this.props;
    if (visible && _isString(message)) {
      return {
        accessible: true,
        accessibilityLabel: `hint: ${message}`
      };
    }
  }
  get containerWidth() {
    const {
      containerWidth = Constants.windowWidth
    } = this.props;
    return containerWidth;
  }
  get targetLayout() {
    const {
      onBackgroundPress,
      useModal,
      targetFrame
    } = this.props;
    const {
      targetLayout,
      targetLayoutInWindow
    } = this.state;
    if (targetFrame) {
      return targetFrame;
    }
    return onBackgroundPress && useModal ? targetLayoutInWindow : targetLayout;
  }
  get showHint() {
    return !!this.targetLayout;
  }
  get tipSize() {
    return this.shouldUseSideTip ? {
      width: 14,
      height: 7
    } : {
      width: 20,
      height: 7
    };
  }
  get hintOffset() {
    const {
      offset = DEFAULT_HINT_OFFSET
    } = this.props;
    return offset;
  }
  get edgeMargins() {
    const {
      edgeMargins = this.isUsingModal() ? DEFAULT_EDGE_MARGINS : 0
    } = this.props;
    return edgeMargins;
  }
  get shouldUseSideTip() {
    const {
      useSideTip
    } = this.props;
    if (!_isUndefined(useSideTip)) {
      return useSideTip;
    }
    return this.getTargetPositionOnScreen() !== TARGET_POSITIONS.CENTER;
  }
  get isShortMessage() {
    const {
      hintMessageWidth
    } = this.state;
    return hintMessageWidth && hintMessageWidth < Constants.screenWidth / 2;
  }
  getTargetPositionOnScreen() {
    if (this.targetLayout?.x !== undefined && this.targetLayout?.width) {
      const targetMidPosition = this.targetLayout.x + this.targetLayout.width / 2;
      if (targetMidPosition > this.containerWidth * (4 / 5)) {
        return TARGET_POSITIONS.RIGHT;
      } else if (targetMidPosition < this.containerWidth * (1 / 5)) {
        return TARGET_POSITIONS.LEFT;
      }
    }
    return TARGET_POSITIONS.CENTER;
  }
  getContainerPosition() {
    if (this.targetLayout) {
      return {
        top: this.targetLayout.y,
        left: this.targetLayout.x
      };
    }
  }
  getHintPosition() {
    const {
      position
    } = this.props;
    const hintPositionStyle = {
      alignItems: 'center'
    };
    if (this.targetLayout?.x !== undefined) {
      hintPositionStyle.left = -this.targetLayout.x;
    }
    if (position === HintPositions.TOP) {
      hintPositionStyle.bottom = 0;
    } else if (this.targetLayout?.height) {
      hintPositionStyle.top = this.targetLayout.height;
    }
    const targetPositionOnScreen = this.getTargetPositionOnScreen();
    if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT) {
      hintPositionStyle.alignItems = Constants.isRTL ? 'flex-start' : 'flex-end';
    } else if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
      hintPositionStyle.alignItems = Constants.isRTL ? 'flex-end' : 'flex-start';
    }
    return hintPositionStyle;
  }
  getHintPadding() {
    const paddings = {
      paddingVertical: this.hintOffset,
      paddingHorizontal: this.edgeMargins
    };
    if (this.shouldUseSideTip && this.targetLayout?.x !== undefined) {
      const targetPositionOnScreen = this.getTargetPositionOnScreen();
      if (targetPositionOnScreen === TARGET_POSITIONS.LEFT) {
        paddings.paddingLeft = this.targetLayout.x;
      } else if (targetPositionOnScreen === TARGET_POSITIONS.RIGHT && this.targetLayout?.width) {
        paddings.paddingRight = this.containerWidth - this.targetLayout.x - this.targetLayout.width;
      }
    }
    return paddings;
  }
  getHintAnimatedStyle = () => {
    const {
      position
    } = this.props;
    const translateY = position === HintPositions.TOP ? -10 : 10;
    return {
      opacity: this.visibleAnimated,
      transform: [{
        translateY: this.visibleAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [translateY, 0]
        })
      }]
    };
  };
  getTipPosition() {
    const {
      position
    } = this.props;
    const tipPositionStyle = {};
    if (position === HintPositions.TOP) {
      tipPositionStyle.bottom = this.hintOffset - this.tipSize.height;
      !this.shouldUseSideTip ? tipPositionStyle.bottom += 1 : undefined;
    } else {
      tipPositionStyle.top = this.hintOffset - this.tipSize.height;
    }
    const layoutWidth = this.targetLayout?.width || 0;
    if (this.targetLayout?.x !== undefined) {
      const targetMidWidth = layoutWidth / 2;
      const tipMidWidth = this.tipSize.width / 2;
      const leftPosition = this.shouldUseSideTip ? this.targetLayout.x : this.targetLayout.x + targetMidWidth - tipMidWidth;
      const rightPosition = this.shouldUseSideTip ? this.containerWidth - this.targetLayout.x - layoutWidth : this.containerWidth - this.targetLayout.x - targetMidWidth - tipMidWidth;
      const targetPositionOnScreen = this.getTargetPositionOnScreen();
      switch (targetPositionOnScreen) {
        case TARGET_POSITIONS.LEFT:
          tipPositionStyle.left = Constants.isRTL ? rightPosition : leftPosition;
          break;
        case TARGET_POSITIONS.RIGHT:
          tipPositionStyle.right = Constants.isRTL ? leftPosition : rightPosition;
          break;
        case TARGET_POSITIONS.CENTER:
        default:
          tipPositionStyle.left = this.targetLayout.x + targetMidWidth - tipMidWidth;
          break;
      }
    }
    return tipPositionStyle;
  }
  getHintOffsetForShortMessage = () => {
    const {
      hintMessageWidth = 0
    } = this.state;
    let hintMessageOffset = 0;
    if (this.isShortMessage) {
      const targetPosition = this.getTipPosition();
      if (targetPosition?.right) {
        hintMessageOffset = -targetPosition?.right + hintMessageWidth / 2;
      }
      if (targetPosition?.left) {
        hintMessageOffset = targetPosition?.left;
        if (this.getTargetPositionOnScreen() === TARGET_POSITIONS.CENTER) {
          hintMessageOffset -= Constants.screenWidth / 2;
        } else {
          hintMessageOffset -= hintMessageWidth / 2;
        }
      }
    }
    return hintMessageOffset;
  };
  isUsingModal = () => {
    const {
      onBackgroundPress,
      useModal
    } = this.props;
    return onBackgroundPress && useModal;
  };
  renderOverlay() {
    const {
      targetLayoutInWindow
    } = this.state;
    const {
      onBackgroundPress,
      backdropColor,
      testID
    } = this.props;
    if (targetLayoutInWindow) {
      const containerPosition = this.getContainerPosition();
      return <Animated.View style={[styles.overlay, {
        top: containerPosition.top - targetLayoutInWindow.y,
        left: containerPosition.left - targetLayoutInWindow.x,
        backgroundColor: backdropColor,
        opacity: this.visibleAnimated
      }]} pointerEvents="box-none" testID={`${testID}.overlay`}>
          {onBackgroundPress && <TouchableWithoutFeedback style={StyleSheet.absoluteFillObject} onPress={onBackgroundPress}>
              <View flex />
            </TouchableWithoutFeedback>}
        </Animated.View>;
    }
  }
  renderHintTip() {
    const {
      position,
      color = DEFAULT_COLOR
    } = this.props;
    const source = this.shouldUseSideTip ? sideTip : middleTip;
    const flipVertically = position === HintPositions.TOP;
    const flipHorizontally = this.getTargetPositionOnScreen() === TARGET_POSITIONS.RIGHT;
    const flipStyle = {
      transform: [{
        scaleY: flipVertically ? -1 : 1
      }, {
        scaleX: flipHorizontally ? -1 : 1
      }]
    };
    return <Image tintColor={color} source={source} style={[styles.hintTip, this.getTipPosition(), flipStyle]} />;
  }
  renderHint() {
    const {
      message,
      messageStyle,
      icon,
      iconStyle,
      borderRadius,
      color = DEFAULT_COLOR,
      customContent,
      removePaddings,
      enableShadow,
      visible,
      testID
    } = this.props;
    const hintMessageOffset = this.getHintOffsetForShortMessage();
    return <View testID={`${testID}.message`} row centerV centerH={!!hintMessageOffset} style={[styles.hint, !removePaddings && styles.hintPaddings, visible && enableShadow && styles.containerShadow, {
      backgroundColor: color
    }, !_isUndefined(borderRadius) && {
      borderRadius
    }, hintMessageOffset ? {
      left: hintMessageOffset
    } : undefined]} onLayout={this.setHintLayout} ref={this.hintRef}>
        {customContent}
        {!customContent && icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
        {!customContent && <Text recorderTag={'unmask'} style={[styles.hintMessage, messageStyle]} testID={`${testID}.message.text`}>
            {message}
          </Text>}
      </View>;
  }
  renderHintContainer() {
    const {
      onPress,
      testID
    } = this.props;
    const opacity = onPress ? 0.9 : 1.0;
    if (this.showHint) {
      return <View animated style={[{
        width: this.containerWidth
      }, styles.animatedContainer, this.getHintPosition(), this.getHintPadding(), this.getHintAnimatedStyle()]} pointerEvents="box-none" testID={testID}>
          <TouchableOpacity activeOpacity={opacity} onPress={onPress}>
            {this.renderHint()}
          </TouchableOpacity>
          {this.renderHintTip()}
        </View>;
    }
  }
  renderHintAnchor() {
    const {
      style,
      ...others
    } = this.props;
    return <View {...others}
    // this view must be collapsable, don't pass testID or backgroundColor etc'.
    collapsable testID={undefined} style={[styles.container, style, this.getContainerPosition(), !this.isUsingModal() && styles.overlayContainer]}>
        {this.renderHintContainer()}
      </View>;
  }
  renderMockChildren() {
    const {
      children,
      backdropColor
    } = this.props;
    const isBackdropColorPassed = backdropColor !== undefined;
    if (children && React.isValidElement(children)) {
      const layout = {
        ...this.getContainerPosition(),
        width: this.targetLayout?.width,
        height: this.targetLayout?.height,
        right: Constants.isRTL ? this.targetLayout?.x : undefined,
        left: Constants.isRTL ? undefined : this.targetLayout?.x
      };
      return <View style={[styles.mockChildrenContainer, layout, !isBackdropColorPassed && styles.hidden]}>
          {React.cloneElement(children, {
          collapsable: false,
          key: 'mock',
          style: [children.props.style, styles.mockChildren]
        })}
        </View>;
    }
  }
  renderChildren() {
    const {
      targetFrame
    } = this.props;
    if (!targetFrame && isValidElement(this.props.children)) {
      return React.cloneElement(this.props.children, {
        key: 'clone',
        collapsable: false,
        onLayout: this.onTargetLayout,
        ref: this.setTargetRef,
        ...this.getAccessibilityInfo()
      });
    }
  }
  render() {
    const {
      onBackgroundPress,
      backdropColor,
      testID
    } = this.props;
    if (!this.props.visible && this.state.hintUnmounted) {
      return this.props.children || null;
    }
    return <>
        {this.renderChildren()}
        {this.isUsingModal() ? <Modal visible={this.showHint} animationType={backdropColor ? 'fade' : 'none'} overlayBackgroundColor={backdropColor} transparent onBackgroundPress={onBackgroundPress} onRequestClose={onBackgroundPress} testID={`${testID}.modal`}>
            {this.renderMockChildren()}
            {this.renderHintAnchor()}
          </Modal> : <>
            {this.renderOverlay()}
            {this.renderMockChildren()}
            {this.renderHintAnchor()}
          </>}
      </>;
  }
}
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
export default asBaseComponent(Hint);