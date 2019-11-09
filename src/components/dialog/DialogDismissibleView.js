import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import View from '../view';
import asPanViewConsumer from '../panningViews/asPanViewConsumer';
import PanningProvider from '../panningViews/panningProvider';
import PanResponderView from '../panningViews/panResponderView';

const MAXIMUM_DRAGS_AFTER_SWIPE = 2;

class DialogDismissibleView extends PureComponent {
  static propTypes = {
    /**
     * The direction of the allowed pan (default is DOWN)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    direction: PropTypes.oneOf(Object.values(PanningProvider.Directions)),
    /**
     * onDismiss callback
     */
    onDismiss: PropTypes.func,
    /**
     * The dialog`s container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Whether to show the dialog or not
     */
    visible: PropTypes.bool
  };

  static defaultProps = {
    direction: PanningProvider.Directions.DOWN,
    onDismiss: _.noop
  };

  constructor(props) {
    super(props);

    this.setInitialValues();
    this.state = {
      visible: props.visible,
      hide: false,
      isAnimating: false
    };
  }

  setInitialValues() {
    this.hiddenLocation = {};
    this.resetSwipe();
    this.animatedValue = new Animated.Value(0);
    this.width = Constants.screenWidth;
    this.height = Constants.screenHeight;
    this.hiddenLocation = this.getHiddenLocation(0, 0);
    this.animationStyle = {
      transform: [
        {
          translateX: this.hiddenLocation.left
        },
        {
          translateY: this.hiddenLocation.top
        }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    const {isPanning, dragDeltas, swipeDirections} = this.props.context; // eslint-disable-line
    const {dragDeltas: prevDragDeltas, swipeDirections: prevSwipeDirections} = prevProps.context; // eslint-disable-line
    const {hide, isAnimating} = this.state;

    if (
      isPanning &&
      (dragDeltas.x || dragDeltas.y) &&
      (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)
    ) {
      this.onDrag();
    }

    if (
      isPanning &&
      (swipeDirections.x || swipeDirections.y) &&
      (swipeDirections.x !== prevSwipeDirections.x || swipeDirections.y !== prevSwipeDirections.y)
    ) {
      this.onSwipe(swipeDirections);
    }

    if (hide && !isAnimating) {
      this.hide();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {visible} = nextProps;
    const {visible: prevVisible} = prevState;

    if (prevVisible && !visible) {
      return {hide: true};
    }

    return null;
  }

  resetSwipe = () => {
    this.counter = 0;
    this.swipe = {};
  };

  isSwiping = () => {
    return this.swipe.x || this.swipe.y;
  };

  onDrag = () => {
    if (this.isSwiping()) {
      if (this.counter < MAXIMUM_DRAGS_AFTER_SWIPE) {
        this.counter += 1;
      } else {
        this.resetSwipe();
      }
    }
  };

  onSwipe = swipeDirections => {
    this.swipe = swipeDirections;
  };

  onAnimationEnd = () => {
    this.setState({isAnimating: false});
  };

  getHiddenLocation = (left, top) => {
    const {direction} = this.props;
    const topInset = Constants.isIphoneX ? Constants.getSafeAreaInsets().top : Constants.isIOS ? 20 : 0;
    const result = {left: 0, top: 0};
    switch (direction) {
      case PanningProvider.Directions.LEFT:
        result.left = -left - this.width;
        break;
      case PanningProvider.Directions.RIGHT:
        result.left = Constants.screenWidth - left;
        break;
      case PanningProvider.Directions.UP:
        result.top = -top - this.height - topInset;
        break;
      case PanningProvider.Directions.DOWN:
      default:
        result.top = Constants.screenHeight - top;
        break;
    }

    return result;
  };

  animateTo = (toValue, animationEndCallback) => {
    const animation = Animated.timing(this.animatedValue, {
      toValue,
      duration: 400,
      easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      useNativeDriver: true
    });

    this.setState({isAnimating: true}, () => animation.start(animationEndCallback));
  };

  getAnimationStyle = () => {
    return {
      transform: [
        {
          translateX: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.hiddenLocation.left, 0]
          })
        },
        {
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.hiddenLocation.top, 0]
          })
        }
      ]
    };
  };

  onLayout = event => {
    // DO NOT move the width\height into the measureInWindow - it causes errors with orientation change
    const layout = event.nativeEvent.layout;
    this.width = layout.width;
    this.height = layout.height;
    this.thresholdX = this.width / 2;
    this.thresholdY = this.height / 2;
    this.ref.measureInWindow((x, y) => {
      this.hiddenLocation = this.getHiddenLocation(x, y);
      this.animationStyle = this.getAnimationStyle();
      this.animateTo(1, this.onAnimationEnd);
    });
  };

  hide = () => {
    const {onDismiss} = this.props;
    // TODO: test we're not animating?
    this.animateTo(0, () => this.setState({visible: false, hide: false}, onDismiss));
  };

  resetToShown = (left, top, direction) => {
    const toValue = [PanningProvider.Directions.LEFT, PanningProvider.Directions.RIGHT].includes(direction)
      ? 1 + left / this.hiddenLocation.left
      : 1 + top / this.hiddenLocation.top;

    this.animateTo(toValue, this.onAnimationEnd);
  };

  onPanLocationChanged = ({left, top}) => {
    const {direction} = this.props;
    const endValue = {x: Math.round(left), y: Math.round(top)};
    if (this.isSwiping()) {
      this.hide();
    } else {
      this.resetSwipe();
      if (
        (direction === PanningProvider.Directions.LEFT && endValue.x <= -this.thresholdX) ||
        (direction === PanningProvider.Directions.RIGHT && endValue.x >= this.thresholdX) ||
        (direction === PanningProvider.Directions.UP && endValue.y <= -this.thresholdY) ||
        (direction === PanningProvider.Directions.DOWN && endValue.y >= this.thresholdY)
      ) {
        this.hide();
      } else {
        this.resetToShown(left, top, direction);
      }
    }
  };

  render() {
    const {containerStyle, style} = this.props;
    const {visible} = this.state;

    return (
      <View ref={r => (this.ref = r)} style={containerStyle} onLayout={this.onLayout}>
        <PanResponderView
          // !visible && styles.hidden is done to fix a bug is iOS
          style={[style, this.animationStyle, !visible && styles.hidden]}
          isAnimated
          onPanLocationChanged={this.onPanLocationChanged}
        >
          {this.props.children}
        </PanResponderView>
      </View>
    );
  }
}

export default asPanViewConsumer(DialogDismissibleView);

const styles = StyleSheet.create({
  hidden: {
    opacity: 0
  }
});
