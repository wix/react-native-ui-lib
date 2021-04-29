// TODO: Add support to custom hint rendering
import _ from 'lodash';
import React, {Component, ReactElement} from 'react';
import {Animated, StyleSheet, AccessibilityInfo, findNodeHandle, GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
  LayoutChangeEvent} from 'react-native';
import {Typography, Spacings, Colors, BorderRadiuses} from '../../style';
import {Constants} from '../../helpers';
import {asBaseComponent} from '../../commons/new';
import {getThemeProps} from '../../commons/modifiers';
import View from '../view';
import Text from '../text';
import Image from '../image';
import Modal from '../modal';

const sideTip = require('./assets/hintTipSide.png');
const middleTip = require('./assets/hintTipMiddle.png');

const DEFAULT_COLOR = Colors.primary;
const DEFAULT_HINT_OFFSET = Spacings.s4;
const DEFAULT_EDGE_MARGINS = Spacings.s5;

const HINT_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom'
};
const TARGET_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};

/**
 * @description: Hint component for displaying a tooltip over wrapped component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/HintsScreen.js
 * @notes: You can either wrap a component or pass a specific targetFrame
 */

interface HintTargetFrame {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface HintPositionStyle extends Position {
  alignItems?: string;
}

interface Paddings {
  paddingLeft?: number;
  paddingRight?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

export interface HintProps {
  /**
    * Control the visibility of the hint
    */
  visible?: boolean;
  /**
    * The hint background color
    */
  color?: string;
  /**
    * The hint message
    */
  message?: string | ReactElement;
  /**
    * The hint message custom style
    */
  messageStyle?: StyleProp<TextStyle>;
  /**
    * Icon to show next to the hint's message
    */
   icon?: ImageSourcePropType;
  /**
    * The icon's style
    */
   iconStyle?: StyleProp<ImageStyle>;
  /**
    * The hint's position
    */
   position?: 'top' | 'bottom';
  /**
    * Provide custom target position instead of wrapping a child
    */
   targetFrame?: HintTargetFrame;
  /**
    * Show side tips instead of the middle tip
    */
   useSideTip?: boolean;
  /**
    * The hint's border radius
    */
   borderRadius?: number;
  /**
    * Hint margins from screen edges
    */
   edgeMargins?: number;
  /**
    * Hint offset from target
    */
   offset?: number;
  /**
    * Callback for the background press
    */
   onBackgroundPress?: (event: GestureResponderEvent) => void;
  /**
    * The hint container width
    */
   containerWidth?: number;
  /**
    * The hint's test identifier
    */
   testID?: string;
  /**
   * Additional styling
   */
  style?: StyleProp<ViewStyle>;
}

interface HintState {
  targetLayout?: HintTargetFrame;
  targetLayoutInWindow?: HintTargetFrame;
}


class Hint extends Component<HintProps, HintState> {
  static displayName = 'Hint';

  static defaultProps = {
    position: HINT_POSITIONS.BOTTOM
  };

  static positions = HINT_POSITIONS;

  // TODO: try to find a better type than 'any' for the ref?
  // type ReactNativeElement = null | number | React.Component<any, any> | React.ComponentClass<any>;
  private targetRef?: any;
  private hintRef?: any;

  state = {
    targetLayoutInWindow: undefined,
    targetLayout: this.props.targetFrame
  };

  visibleAnimated = new Animated.Value(Number(!!this.props.visible))

  componentDidUpdate(prevProps: HintProps) {
    if (prevProps.visible !== this.props.visible) {
      Animated.timing(this.visibleAnimated, {
        toValue: Number(!!this.props.visible),
        duration: 170,
        useNativeDriver: true
      }).start();
    }
  }

  focusAccessibilityOnHint = () => {
    const {message} = this.props;
    if (this.targetRef && this.hintRef) {
      const targetRefTag = findNodeHandle(this.targetRef);
      const hintRefTag = findNodeHandle(this.hintRef);
      if (targetRefTag && _.isString(message)) {
        AccessibilityInfo.setAccessibilityFocus(targetRefTag);
      } else if (hintRefTag) {
        AccessibilityInfo.setAccessibilityFocus(hintRefTag);
      }
    }
  };

  setTargetRef = (ref: any) => {
    this.targetRef = ref;
    this.focusAccessibilityOnHint();
  };

  setHintRef = (ref: any) => {
    this.hintRef = ref;
    this.focusAccessibilityOnHint();
  };

  onTargetLayout = ({nativeEvent: {layout}}: LayoutChangeEvent) => {
    if (!_.isEqual(this.state.targetLayout, layout)) {
      this.setState({targetLayout: layout});
    }

    if (!this.state.targetLayoutInWindow) {
      setTimeout(() => {
        this.targetRef.measureInWindow((x: number, y: number, width: number, height: number) => {
          const targetLayoutInWindow = {x, y, width, height};
          this.setState({targetLayoutInWindow});
        });
      });
    }
  };

  getAccessibilityInfo() {
    const {visible, message} = this.props;

    if (visible && _.isString(message)) {
      return {
        accessible: true,
        accessibilityLabel: `hint: ${message}`
      };
    }
  }

  get containerWidth() {
    const {containerWidth} = getThemeProps(this.props, this.context);
    return containerWidth || Constants.screenWidth;
  }

  get targetLayout() {
    const {onBackgroundPress, targetFrame} = this.props;
    const {targetLayout, targetLayoutInWindow} = this.state;

    if (targetFrame) {
      return targetFrame;
    }
    return onBackgroundPress ? targetLayoutInWindow : targetLayout;
  }

  get showHint() {
    return !!this.targetLayout;
  }

  get tipSize() {
    return this.useSideTip ? {width: 14, height: 7} : {width: 20, height: 7};
  }

  get hintOffset() {
    const {offset} = getThemeProps(this.props, this.context);
    return (offset || DEFAULT_HINT_OFFSET) as number;
  }

  get edgeMargins() {
    const {edgeMargins} = getThemeProps(this.props, this.context);
    return (edgeMargins || DEFAULT_EDGE_MARGINS) as number;
  }

  get useSideTip() {
    const {useSideTip} = this.props;

    if (!_.isUndefined(useSideTip)) {
      return useSideTip;
    }
    return this.getTargetPositionOnScreen() !== TARGET_POSITIONS.CENTER;
  }

  getTargetPositionOnScreen() {
    if (this.targetLayout?.x && this.targetLayout?.width) {
      const targetMidPosition = this.targetLayout.x + this.targetLayout.width / 2;
      if (targetMidPosition > this.containerWidth * (2 / 3)) {
        return TARGET_POSITIONS.RIGHT;
      } else if (targetMidPosition < this.containerWidth * (1 / 3)) {
        return TARGET_POSITIONS.LEFT;
      }
    }

    return TARGET_POSITIONS.CENTER;
  }

  getContainerPosition() {
    if (this.targetLayout) {
      return {top: this.targetLayout.y, left: this.targetLayout.x};
    }
  }

  getHintPosition() {
    const {position} = this.props;
    const hintPositionStyle: HintPositionStyle = {alignItems: 'center'};

    if (this.targetLayout?.x) {
      hintPositionStyle.left = -this.targetLayout.x;
    }

    if (position === HINT_POSITIONS.TOP) {
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
    const paddings: Paddings = {paddingVertical: this.hintOffset, paddingHorizontal: this.edgeMargins};
    if (this.useSideTip && this.targetLayout?.x) {
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
    const {position} = this.props;
    const translateY = position === HINT_POSITIONS.TOP ? -10 : 10;
    return {
      opacity: this.visibleAnimated,
      transform: [{
        translateY: this.visibleAnimated.interpolate({inputRange: [0, 1], outputRange: [translateY, 0]})
      }]
    };
  }

  getTipPosition() {
    const {position} = getThemeProps(this.props, this.context);
    const tipPositionStyle: Position = {};

    if (position === HINT_POSITIONS.TOP) {
      tipPositionStyle.bottom = this.hintOffset - this.tipSize.height;
    } else {
      tipPositionStyle.top = this.hintOffset - this.tipSize.height;
    }

    if (this.targetLayout?.width && this.targetLayout?.x) {
      const targetMidWidth = this.targetLayout.width / 2;
      const tipMidWidth = this.tipSize.width / 2;
  
      const leftPosition = this.useSideTip ? this.targetLayout.x : this.targetLayout.x + targetMidWidth - tipMidWidth;
      const rightPosition = this.useSideTip
        ? this.containerWidth - this.targetLayout.x - this.targetLayout.width
        : this.containerWidth - this.targetLayout.x - targetMidWidth - tipMidWidth;
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

  // renderOverlay() {
  //   const {targetLayoutInWindow} = this.state;
  //   const {onBackgroundPress} = this.props;
  //   if (targetLayoutInWindow) {
  //     const containerPosition = this.getContainerPosition();
  //     return (
  //       <View
  //         style={[
  //           styles.overlay,
  //           {
  //             top: containerPosition.top - targetLayoutInWindow.y,
  //             left: containerPosition.left - targetLayoutInWindow.x,
  //           },
  //         ]}
  //         pointerEvents="box-none"
  //       >
  //         {onBackgroundPress && (
  //           <TouchableWithoutFeedback style={[StyleSheet.absoluteFillObject]} onPress={onBackgroundPress}>
  //             <View flex />
  //           </TouchableWithoutFeedback>
  //         )}
  //       </View>
  //     );
  //   }
  // }

  renderHintTip() {
    const {position, color} = getThemeProps(this.props, this.context);
    const source = this.useSideTip ? sideTip : middleTip;
    const flipVertically = position === HINT_POSITIONS.TOP;
    const flipHorizontally = this.getTargetPositionOnScreen() === TARGET_POSITIONS.RIGHT;
    const flipStyle = {
      transform: [{scaleY: flipVertically ? -1 : 1}, {scaleX: flipHorizontally ? -1 : 1}]
    };

    return (
      <Image
        tintColor={color || DEFAULT_COLOR}
        source={source}
        style={[styles.hintTip, this.getTipPosition(), flipStyle]}
      />
    );
  }

  renderHint() {
    const {message, messageStyle, icon, iconStyle, borderRadius, color, testID} = getThemeProps(this.props, this.context);

    if (this.showHint) {
      return (
        <View
          animated
          style={[
            {width: this.containerWidth},
            styles.animatedContainer,
            this.getHintPosition(),
            this.getHintPadding(),
            this.getHintAnimatedStyle()
          ]}
          pointerEvents="box-none"
          testID={testID}
        >
          {this.renderHintTip()}
          <View
            testID={`${testID}.message`}
            row
            centerV
            style={[styles.hint, color && {backgroundColor: color}, !_.isUndefined(borderRadius) && {borderRadius}]}
            ref={this.setHintRef}
          >
            {icon && <Image source={icon} style={[styles.icon, iconStyle]}/>}
            <Text style={[styles.hintMessage, messageStyle]}>{message}</Text>
          </View>
        </View>
      );
    }
  }

  renderHintContainer() {
    const {style, ...others} = this.props;
    return (
      <View {...others} style={[styles.container, style, this.getContainerPosition()]} collapsable={false}>
        {this.renderHint()}
      </View>
    );
  }

  renderChildren() {
    const {targetFrame} = this.props;

    if (!targetFrame && React.isValidElement(this.props.children)) {
      return React.cloneElement(this.props.children, {
        collapsable: false,
        onLayout: this.onTargetLayout,
        ref: this.setTargetRef,
        ...this.getAccessibilityInfo()
      });
    }
  }

  render() {
    const {visible, onBackgroundPress, testID} = this.props;

    if (!visible) {
      return this.props.children;
    }

    return (
      <React.Fragment>
        {onBackgroundPress ? (
          <Modal
            visible={this.showHint}
            animationType="none"
            transparent
            onBackgroundPress={onBackgroundPress}
            onRequestClose={onBackgroundPress as () => void}
            testID={`${testID}.modal`}
          >
            {this.renderHintContainer()}
          </Modal>
        ) : (
          // this.renderOverlay(),
          this.renderHintContainer()
        )}
        {this.renderChildren()}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    // This is a hack to make hint render correctly on Android
    borderWidth: 1,
    borderColor: 'transparent'
  },
  // overlay: {
  //   position: 'absolute',
  //   width: Constants.screenWidth,
  //   height: Constants.screenHeight
  // },
  animatedContainer: {
    position: 'absolute'
  },
  hintTip: {
    position: 'absolute'
  },
  hint: {
    maxWidth: 400,
    backgroundColor: DEFAULT_COLOR,
    paddingHorizontal: Spacings.s5,
    paddingTop: Spacings.s3,
    paddingBottom: Spacings.s4,
    borderRadius: BorderRadiuses.br60
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

export default asBaseComponent<HintProps>(Hint);
