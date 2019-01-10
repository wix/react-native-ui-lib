// TODO: need to figure how to allow any type of component to be wrapped with Hint and not just View
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {StyleSheet, findNodeHandle, TouchableWithoutFeedback, Animated} from 'react-native';
import {BaseComponent} from '../../commons';
import View from '../view';
import Text from '../text';
import Image from '../image';
import {Typography, Spacings, Colors, BorderRadiuses} from '../../style';
import {Constants} from '../../helpers';

const sideTip = require('./assets/hintTipSide.png');
const middleTip = require('./assets/hintTipMiddle.png');

const DEFAULT_HINT_DISTANCE = Spacings.s4;
const HINT_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom'
};

class Hint extends BaseComponent {
  static displayName = 'Hint';

  static propTypes = {
    /**
     * The hint message
     */
    message: PropTypes.string,
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
    // tipPosition: TIP_POSITIONS.MIDDLE
  };

  static positions = HINT_POSITIONS;
  // static tipPositions = TIP_POSITIONS;

  state = {};

  setTarget = (node) => {
    if (!this.hintTarget) {
      this.hintTarget = findNodeHandle(node);

      setTimeout(() => {
        node.measureInWindow((x, y, width, height) => {
          const targetPosition = {x, y, width, height};
          this.setState({
            targetPosition
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
    const {targetPosition, containerLayout} = this.state;
    return !!targetPosition && !!containerLayout;
  }

  get tipSize() {
    const {useSideTip} = this.props;
    return useSideTip ? {width: 14, height: 7} : {width: 20, height: 7};
  }

  get hintDistance() {
    const {distance} = this.getThemeProps();
    return distance || Spacings.s4;
  }

  get useSideTip() {
    const {useSideTip} = this.props;
    if (!_.isUndefined(useSideTip)) {
      return useSideTip;
    }
    return this.getTargetPositionOnScreen() !== 'center';
  }

  getTargetPositionOnScreen() {
    const {targetPosition} = this.state;
    if (targetPosition.x > Constants.screenWidth * (2 / 3)) {
      return 'right';
    } else if (targetPosition.x < Constants.screenWidth * (1 / 3)) {
      return 'left';
    } else {
      return 'center';
    }
  }

  getHintContainerPosition() {
    const {targetPosition, containerLayout} = this.state;
    const {position} = this.props;
    const hintPositionStyle = {left: -containerLayout.x, alignItems: 'center'};

    if (position === HINT_POSITIONS.TOP) {
      hintPositionStyle.bottom = targetPosition.height;
    } else {
      hintPositionStyle.top = targetPosition.height;
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
    const {targetPosition} = this.state;
    const {position} = this.props;
    const tipPositionStyle = {};

    if (position === HINT_POSITIONS.TOP) {
      tipPositionStyle.bottom = this.hintDistance - this.tipSize.height;
    } else {
      tipPositionStyle.top = this.hintDistance - this.tipSize.height;
    }

    switch (this.getTargetPositionOnScreen()) {
      case 'left':
        tipPositionStyle.left = this.useSideTip
          ? 0 + this.hintDistance
          : targetPosition.x + targetPosition.width / 2 - this.tipSize.width / 2;
        break;
      case 'right':
        tipPositionStyle.right = this.useSideTip
          ? 0 + this.hintDistance
          : Constants.screenWidth - targetPosition.x - targetPosition.width / 2 - this.tipSize.width / 2;
        break;
      case 'center':
      default: {
        tipPositionStyle.left = targetPosition.x + targetPosition.width / 2 - this.tipSize.width / 2;
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
    const {position} = this.props;
    const source = this.useSideTip ? sideTip : middleTip;
    const flipVertically = position === HINT_POSITIONS.TOP;
    const flipHorizontally = this.getTargetPositionOnScreen() === 'right';
    const flipStyle = {
      transform: [{scaleY: flipVertically ? -1 : 1}, {scaleX: flipHorizontally ? -1 : 1}]
    };

    return <Image tintColor={Colors.blue30} source={source} style={[styles.hintTip, this.getTipPosition(), flipStyle]} />;
  }

  renderHint() {
    const {message, borderRadius, edgeSpace} = this.getThemeProps();
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
          <View style={[styles.hint, !_.isUndefined(borderRadius) && {borderRadius}]}>
            <Text style={styles.hintMessage}>{message}</Text>
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
        {/* {this.showHint && (
          <HighlighterOverlayView
            // testID={testID}
            highlightViewTag={this.hintTarget}
            // highlightFrame={highlightFrame}
            visible={this.showHint}
            overlayColor={Colors.rgba(Colors.dark10, 0.2)}
            // strokeColor={borderColor || defaultStrokeColor}
            // strokeWidth={borderWidth || defaultStrokeWidth}
            // minimumRectSize={minimumRectSize}
            // innerPadding={innerPadding}
          >
            {this.renderHint()}
          </HighlighterOverlayView>
        )} */}
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
    paddingHorizontal: Spacings.s5
  },
  hintTip: {
    position: 'absolute'
  },
  hint: {
    backgroundColor: Colors.blue30,
    padding: Spacings.s5,
    borderRadius: BorderRadiuses.br60
  },
  hintMessage: {
    ...Typography.text70,
    color: Colors.white
  }
});

export default Hint;
