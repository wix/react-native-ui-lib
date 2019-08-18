import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing} from 'react-native';
import View from '../view';
import asPanViewConsumer from './asPanViewConsumer';
import PanResponderView from './panResponderView';

/**
 * @description: panAnimatableView component created to making listening to swipe and drag events easier, with animation.
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanAnimatableScreen.js
 */
class panAnimatableView extends PureComponent {
  static displayName = 'panAnimatableView';
  static propTypes = {
    /**
     * The end location ({left, top} of the top-left corner)
     */
    to: PropTypes.shape({left: PropTypes.number, top: PropTypes.number}),
    /**
     * Will be called once the animation ends
     */
    onAnimationEnd: PropTypes.func,
    /**
     * Will be called with the current location ({left, top}) when the pan has ended
     */
    onPanLocationChanged: PropTypes.func,
    /**
     * Some animation options to control the animation.
     */
    animationOptions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.translation = {
      marginLeft: 0,
      marginTop: 0,
    };

    this.animationValue = new Animated.Value(0);
    this.state = {
      isAnimating: false,
    };
  }

  componentDidMount() {
    this.initAnimation();
  }

  componentDidUpdate(prevProps) {
    const {to} = this.props;
    const {to: prevTo} = prevProps;
    if (to !== prevTo) {
      this.initAnimation();
    }
  }

  getTo = () => {
    const {to} = this.props;
    return {left: _.get(to, 'left', 0), top: _.get(to, 'top', 0)};  
  }

  getDiff = () => {
    const to = this.getTo();
    return {x: to.left - this.translation.marginLeft, y: to.top - this.translation.marginTop};
  }

  onAnimationEnd = () => {
    const to = this.getTo();
    this.translation = {
      marginLeft: to.left,
      marginTop: to.top,
    };

    this.setState({
      isAnimating: false,
    }, () => _.invoke(this.props, 'onAnimationEnd'));
  }

  initAnimation() {
    const diff = this.getDiff();
    this.animationStyle = {
      transform: [{translateX: this.animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, diff.x]
      })}, {translateY: this.animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, diff.y]
      })}]
    }

    const {animationOptions} = this.props;
    const animation = Animated.timing(this.animationValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      useNativeDriver: true,
      ...animationOptions
    });

    this.setState({isAnimating: true}, () => animation.start(this.onAnimationEnd));
  }

  render() {
      const {children, style, onPanLocationChanged} = this.props;
      const {isAnimating} = this.state;
      const containerStyle = isAnimating ? [this.animationStyle, this.translation] : this.translation;
      const Container = isAnimating ? Animated.View : View; // this solves a bug on Android

      return (
        <Container style={containerStyle}>
          <PanResponderView
            ignorePanning={isAnimating}
            style={style}
            onPanLocationChanged={onPanLocationChanged}
          >
            {children}
          </PanResponderView>
        </Container>
      );
  }

}

export default asPanViewConsumer(panAnimatableView);
