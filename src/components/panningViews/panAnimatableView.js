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
    /**
     * A style for the container view
     */
    // TODO: remove?
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  constructor(props) {
    super(props);

    this.current = {
      animationValue: 0,
      left: 0,
      top: 0,
    };

    this.animationValue = new Animated.Value(this.current.animationValue);
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
    return {left: _.get(to, 'left', 0) || 0, top: _.get(to, 'top', 0) || 0}; // "|| 0" to handle null values in left\top
  }

  getDiff = () => {
    const to = this.getTo();
    return {x: to.left, y: to.top};
  }

  onAnimationEnd = () => {
    const to = this.getTo();
    this.current = {
      animationValue: this.current.animationValue + 1,
      left: to.left,
      top: to.top,
    };

    this.setState({
      isAnimating: false,
    }, () => _.invoke(this.props, 'onAnimationEnd'));
  }

  initAnimation() {
    const diff = this.getDiff();

    const {animationValue} = this.current;
    const nextAnimationValue = animationValue + 1;
    
    this.animationStyle = {
      transform: [{translateX: this.animationValue.interpolate({
        inputRange: [animationValue, nextAnimationValue],
        outputRange: [this.current.left, diff.x]
      })}, {translateY: this.animationValue.interpolate({
        inputRange: [animationValue, nextAnimationValue],
        outputRange: [this.current.top, diff.y]
      })}]
    }

    const {animationOptions} = this.props;
    const animation = Animated.timing(this.animationValue, {
      toValue: nextAnimationValue,
      duration: 400,
      easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      useNativeDriver: true,
      ...animationOptions
    });

    // this.onAnimationEnd();
    this.setState({isAnimating: true}, () => animation.start(this.onAnimationEnd));
  }

  render() {
      const {children, style, onPanLocationChanged, containerStyle: propsContainerStyle, ...others} = this.props;
      const {isAnimating} = this.state;
    //   const containerStyle = isAnimating ? [this.animationStyle, this.translation] : this.translation;
      const Container = isAnimating ? Animated.View : View; // this solves a bug on Android

      return (
        <Animated.View style={[propsContainerStyle, this.animationStyle]} pointerEvents={'box-none'}>
          <PanResponderView
            ignorePanning={isAnimating}
            style={style}
            onPanLocationChanged={onPanLocationChanged}
            {...others}
          >
            {children}
          </PanResponderView>
        </Animated.View>
      );
  }

}

export default asPanViewConsumer(panAnimatableView);
