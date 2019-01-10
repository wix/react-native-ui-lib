// TODO: need to figure how to allow any type of component to be wrapped with Hint and not just View
// TODO: Add icon support
// TODO: Add support to custom hint rendering
// TODO: Add animation
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {StyleSheet, findNodeHandle} from 'react-native';
import {BaseComponent} from '../../commons';
import View from '../view';
import Text from '../text';
import Image from '../image';
import {Typography, Spacings, Colors, BorderRadiuses} from '../../style';
import {Constants} from '../../helpers';

const sideTip = require('./assets/hintTipSide.png');
const middleTip = require('./assets/hintTipMiddle.png');

const DEFAULT_COLOR = Colors.blue30;
const DEFAULT_HINT_DISTANCE = Spacings.s4;
const DEFAULT_EDGE_SPACE = Spacings.s5;
const HINT_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom'
};

class Hint extends BaseComponent {
  static displayName = 'Hint';

  static propTypes = {
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
    messageStyle: PropTypes.string,
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
     * Space from screen edges
     */
    edgeSpace: PropTypes.number,
    /**
     * Hint distance from target
     */
    distance: PropTypes.number
  };

  static defaultProps = {
    position: HINT_POSITIONS.BOTTOM
  };

  static positions = HINT_POSITIONS;

  state = {};

  setTarget = (node) => {
    if (!this.hintTarget) {
      this.hintTarget = findNodeHandle(node);

      setTimeout(() => {
        node.measureInWindow((x, y, width, height) => {
          const targetLayout = {x, y, width, height};
          this.setState({
            targetLayout
          });
        });
      });
    }
  };

  onContainerLayout = ({nativeEvent: {layout}}) => {
    if (!this.state.containerLayout) {
      this.setState({
        containerLayout: layout
      });
    }
  };

  get showHint() {
    const {targetLayout, containerLayout} = this.state;
    return !!targetLayout && !!containerLayout;
  }

  get tipSize() {
    return this.useSideTip ? {width: 14, height: 7} : {width: 20, height: 7};
  }

  get hintDistance() {
    const {distance} = this.getThemeProps();
    return distance || DEFAULT_HINT_DISTANCE;
  }

  get edgeSpace() {
    const {edgeSpace} = this.getThemeProps();
    return edgeSpace || DEFAULT_EDGE_SPACE;
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
    if (targetLayout.x > Constants.screenWidth * (2 / 3)) {
      return 'right';
    } else if (targetLayout.x < Constants.screenWidth * (1 / 3)) {
      return 'left';
    } else {
      return 'center';
    }
  }

  getHintContainerPosition() {
    const {targetLayout, containerLayout} = this.state;
    const {position} = this.props;
    const hintPositionStyle = {left: -containerLayout.x, alignItems: 'center'};

    if (position === HINT_POSITIONS.TOP) {
      hintPositionStyle.bottom = targetLayout.height;
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

  getTipPosition() {
    const {targetLayout} = this.state;
    const {position} = this.getThemeProps();
    const tipPositionStyle = {};

    if (position === HINT_POSITIONS.TOP) {
      tipPositionStyle.bottom = this.hintDistance - this.tipSize.height;
    } else {
      tipPositionStyle.top = this.hintDistance - this.tipSize.height;
    }

    const targetMidWidth = targetLayout.width / 2;
    const tipMidWidth = this.tipSize.width / 2;

    switch (this.getTargetPositionOnScreen()) {
      case 'left':
        tipPositionStyle.left = this.useSideTip ? this.edgeSpace : targetLayout.x + targetMidWidth - tipMidWidth;
        break;
      case 'right':
        tipPositionStyle.right = this.useSideTip
          ? this.edgeSpace
          : Constants.screenWidth - targetLayout.x - targetMidWidth - tipMidWidth;
        break;
      case 'center':
      default: {
        tipPositionStyle.left = targetLayout.x + targetMidWidth - tipMidWidth;
        break;
      }
    }

    return tipPositionStyle;
  }

  renderOverlay() {
    if (this.showHint) {
      const {containerLayout} = this.state;
      return <View style={[styles.overlay, {top: -containerLayout.y, left: -containerLayout.x}]} />;
    }
  }

  renderHintTip() {
    const {position, color} = this.getThemeProps();
    const source = this.useSideTip ? sideTip : middleTip;
    const flipVertically = position === HINT_POSITIONS.TOP;
    const flipHorizontally = this.getTargetPositionOnScreen() === 'right';
    const flipStyle = {
      transform: [{scaleY: flipVertically ? -1 : 1}, {scaleX: flipHorizontally ? -1 : 1}]
    };

    return (
      <Image tintColor={color || DEFAULT_COLOR} source={source} style={[styles.hintTip, this.getTipPosition(), flipStyle]} />
    );
  }

  renderHint() {
    const {message, messageStyle, borderRadius, edgeSpace, color} = this.getThemeProps();
    if (this.showHint) {
      return (
        <View
          style={[
            styles.hintContainer,
            this.getHintContainerPosition(),
            {paddingVertical: this.hintDistance},
            edgeSpace && {paddingHorizontal: edgeSpace}
          ]}
          pointerEvents="box-none"
        >
          {this.renderHintTip()}
          <View style={[styles.hint, color && {backgroundColor: color}, !_.isUndefined(borderRadius) && {borderRadius}]}>
            <Text style={[styles.hintMessage, messageStyle]}>{message}</Text>
          </View>
        </View>
      );
    }
  }

  renderChildren() {
    return React.cloneElement(this.props.children, {
      collapsable: false,
      ref: this.setTarget
    });
  }

  render() {
    const {style, position, ...others} = this.props;
    return (
      <View {...others} style={[styles.container, style]} collapsable={false} onLayout={this.onContainerLayout}>
        {this.renderOverlay()}
        {this.renderChildren()}
        {this.renderHint()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100
  },
  overlay: {
    position: 'absolute',
    width: Constants.screenWidth,
    height: Constants.screenHeight
  },
  hintContainer: {
    position: 'absolute',
    width: Constants.screenWidth,
    zIndex: 100,
    paddingVertical: DEFAULT_HINT_DISTANCE,
    paddingHorizontal: DEFAULT_EDGE_SPACE
  },
  hintTip: {
    position: 'absolute'
  },
  hint: {
    backgroundColor: DEFAULT_COLOR,
    padding: Spacings.s5,
    borderRadius: BorderRadiuses.br60
  },
  hintMessage: {
    ...Typography.text70,
    color: Colors.white
  }
});

export default Hint;
