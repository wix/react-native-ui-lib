// TODO: Add support to custom hint rendering
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {Typography, Spacings, Colors, BorderRadiuses, AnimatableManager} from '../../style';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import View from '../view';
import Text from '../text';
import Image from '../image';


const sideTip = require('./assets/hintTipSide.png');
const middleTip = require('./assets/hintTipMiddle.png');

const DEFAULT_COLOR = Colors.blue30;
const DEFAULT_HINT_OFFSET = Spacings.s4;
const DEFAULT_EDGE_MARGINS = Spacings.s5;
const HINT_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

AnimatableManager.loadAnimationDefinitions({
  hintAppearDown: {
    from: {opacity: 0, translateY: 20},
    to: {opacity: 1, translateY: 0},
  },
  hintAppearUp: {
    from: {opacity: 0, translateY: -20},
    to: {opacity: 1, translateY: 0},
  },
});

/**
 * @description: Hint component.
 */
class Hint extends BaseComponent {
  static displayName = 'Hint';

  static propTypes = {
    /**
     * Control the visibility of the hint
     */
    visible: PropTypes.bool,
    /**
     * The hint background color
     */
    color: PropTypes.string,
    /**
     * The hint message
     */
    message: PropTypes.string,
    /**
     * The hint message custom style
     */
    messageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Icon to show next to the hint's message
     */
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * The icon's style
     */
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * The hint's position
     */
    position: PropTypes.oneOf(_.values(HINT_POSITIONS)),
    /**
     * Show side tips instead of the middle tip
     */
    useSideTip: PropTypes.bool,
    /**
     * The hint's border radius
     */
    borderRadius: PropTypes.number,
    /**
     * Hint margins from screen edges
     */
    edgeMargins: PropTypes.number,
    /**
     * Hint offset from target
     */
    offset: PropTypes.number,
    /**
     * Callback for the background press
     */
    onBackgroundPress: PropTypes.func,
  };

  static defaultProps = {
    position: HINT_POSITIONS.BOTTOM,
  };

  static positions = HINT_POSITIONS;

  state = {};

  setTargetPosition = node => {
    if (!this.state.targetLayoutInWindow) {
      setTimeout(() => {
        node.measureInWindow((x, y, width, height) => {
          const targetLayoutInWindow = {x, y, width, height};
          this.setState({
            targetLayoutInWindow,
          });
        });
      });
    }
  };

  onTargetLayout = ({nativeEvent: {layout}}) => {
    if (!this.state.targetLayout) {
      this.setState({
        targetLayout: layout,
      });
    }
  };

  get showHint() {
    const {targetLayout} = this.state;
    return !!targetLayout;
  }

  get tipSize() {
    return this.useSideTip ? {width: 14, height: 7} : {width: 20, height: 7};
  }

  get hintOffset() {
    const {offset} = this.getThemeProps();
    return offset || DEFAULT_HINT_OFFSET;
  }

  get edgeMargins() {
    const {edgeMargins} = this.getThemeProps();
    return edgeMargins || DEFAULT_EDGE_MARGINS;
  }

  get useSideTip() {
    const {useSideTip} = this.props;
    if (!_.isUndefined(useSideTip)) {
      return useSideTip;
    }
    return this.getTargetPositionOnScreen() !== 'center';
  }

  getTargetPositionOnScreen() {
    const {targetLayout} = this.state;
    const targetMidPosition = targetLayout.x + targetLayout.width / 2;
    if (targetMidPosition > Constants.screenWidth * (2 / 3)) {
      return 'right';
    } else if (targetMidPosition < Constants.screenWidth * (1 / 3)) {
      return 'left';
    }

    return 'center';
  }

  getContainerPosition() {
    const {targetLayout} = this.state;
    if (targetLayout) {
      return {top: targetLayout.y, left: targetLayout.x};
    }
  }

  getHintPosition() {
    const {targetLayout} = this.state;
    const {position} = this.props;
    const hintPositionStyle = {left: -targetLayout.x, alignItems: 'center'};

    if (position === HINT_POSITIONS.TOP) {
      hintPositionStyle.bottom = 0;
    } else {
      hintPositionStyle.top = targetLayout.height;
    }

    const targetPositionOnScreen = this.getTargetPositionOnScreen();
    if (targetPositionOnScreen === 'right') {
      hintPositionStyle.alignItems = 'flex-end';
    } else if (targetPositionOnScreen === 'left') {
      hintPositionStyle.alignItems = 'flex-start';
    }

    return hintPositionStyle;
  }

  getHintPadding() {
    const {targetLayout} = this.state;
    const paddings = {paddingVertical: this.hintOffset, paddingHorizontal: this.edgeMargins};
    if (this.useSideTip) {
      const targetPositionOnScreen = this.getTargetPositionOnScreen();
      if (targetPositionOnScreen === 'left') {
        paddings.paddingLeft = targetLayout.x;
      } else if (targetPositionOnScreen === 'right') {
        paddings.paddingRight = Constants.screenWidth - targetLayout.x - targetLayout.width;
      }
    }

    return paddings;
  }

  getTipPosition() {
    const {targetLayout} = this.state;
    const {position} = this.getThemeProps();
    const tipPositionStyle = {};

    if (position === HINT_POSITIONS.TOP) {
      tipPositionStyle.bottom = this.hintOffset - this.tipSize.height;
    } else {
      tipPositionStyle.top = this.hintOffset - this.tipSize.height;
    }

    const targetMidWidth = targetLayout.width / 2;
    const tipMidWidth = this.tipSize.width / 2;

    switch (this.getTargetPositionOnScreen()) {
      case 'left':
        tipPositionStyle.left = this.useSideTip ? targetLayout.x : targetLayout.x + targetMidWidth - tipMidWidth;
        break;
      case 'right':
        tipPositionStyle.right = this.useSideTip
          ? Constants.screenWidth - targetLayout.x - targetLayout.width
          : Constants.screenWidth - targetLayout.x - targetMidWidth - tipMidWidth;
        break;
      case 'center':
      default:
        tipPositionStyle.left = targetLayout.x + targetMidWidth - tipMidWidth;
        break;
    }

    return tipPositionStyle;
  }

  renderOverlay() {
    const {targetLayoutInWindow} = this.state;
    const {onBackgroundPress} = this.props;
    if (targetLayoutInWindow) {
      return (
        <View
          style={[styles.overlay, {top: -targetLayoutInWindow.y, left: -targetLayoutInWindow.x}]}
          pointerEvents="box-none"
        >
          {onBackgroundPress && (
            <TouchableWithoutFeedback style={[StyleSheet.absoluteFillObject]} onPress={onBackgroundPress}>
              <View flex />
            </TouchableWithoutFeedback>
          )}
        </View>
      );
    }
  }

  renderHintTip() {
    const {position, color} = this.getThemeProps();
    const source = this.useSideTip ? sideTip : middleTip;
    const flipVertically = position === HINT_POSITIONS.TOP;
    const flipHorizontally = this.getTargetPositionOnScreen() === 'right';
    const flipStyle = {
      transform: [{scaleY: flipVertically ? -1 : 1}, {scaleX: flipHorizontally ? -1 : 1}],
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
    const {position, message, messageStyle, icon, iconStyle, borderRadius, color} = this.getThemeProps();
    const shownUp = position === HINT_POSITIONS.TOP;
    if (this.showHint) {
      return (
        <AnimatableView
          animation={shownUp ? AnimatableManager.animations.hintAppearUp : AnimatableManager.animations.hintAppearDown}
          duration={200}
          style={[styles.hintContainer, this.getHintPosition(), this.getHintPadding()]}
          pointerEvents="box-none"
        >
          {this.renderHintTip()}
          <View
            row
            centerV
            style={[styles.hint, color && {backgroundColor: color}, !_.isUndefined(borderRadius) && {borderRadius}]}
          >
            {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
            <Text style={[styles.hintMessage, messageStyle]}>{message}</Text>
          </View>
        </AnimatableView>
      );
    }
  }

  renderChildren() {
    return React.cloneElement(this.props.children, {
      collapsable: false,
      onLayout: this.onTargetLayout,
      ref: this.setTargetPosition,
    });
  }

  render() {
    const {visible, style, position, ...others} = this.props;

    if (!visible) return this.props.children;

    return (
      <React.Fragment>
        <View {...others} style={[styles.container, style, this.getContainerPosition()]} collapsable={false}>
          {this.renderOverlay()}
          {this.renderHint()}
        </View>
        {this.renderChildren()}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
  },
  overlay: {
    position: 'absolute',
    width: Constants.screenWidth,
    height: Constants.screenHeight,
  },
  hintContainer: {
    position: 'absolute',
    width: Constants.screenWidth,
  },
  hintTip: {
    position: 'absolute',
  },
  hint: {
    backgroundColor: DEFAULT_COLOR,
    paddingHorizontal: Spacings.s5,
    paddingTop: Spacings.s3,
    paddingBottom: Spacings.s4,
    borderRadius: BorderRadiuses.br60,
  },
  hintMessage: {
    ...Typography.text70,
    color: Colors.white,
    flexShrink: 1,
  },
  icon: {
    marginRight: Spacings.s4,
    tintColor: Colors.white,
  },
});

export default Hint;
