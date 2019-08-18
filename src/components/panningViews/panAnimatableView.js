import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import View from '../view';
import asPanViewConsumer from './asPanViewConsumer';
import PanningProvider from './panningProvider';
import PanResponderView from './panResponderView';
import { createNativeWrapper } from 'react-native-gesture-handler';

const MAXIMUM_DRAGS_AFTER_SWIPE = 2;

/**
 * @description: panAnimatableView component created to making listening to swipe and drag events easier, with animation.
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanAnimatableScreen.js
 */
class panAnimatableView extends PureComponent {
  static displayName = 'panAnimatableView';
  static propTypes = {
    // ...PanResponderView.PropTypes,

    /**
     * The start location ({left, top} of the top-left corner)
     */
    from: PropTypes.shape({left: PropTypes.number, top: PropTypes.number}),
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

    const from = {left: _.get(props.from, 'left', 0), top: _.get(props.from, 'top', 0)};
    const to = {left: _.get(props.to, 'left', 0), top: _.get(props.to, 'top', 0)};
    
    this.state = {
      location: from,
      diff: this.getDiff(from, to),
      animTranslateX: new Animated.Value(0),
      animTranslateY: new Animated.Value(0),
      isAnimating: false,
    };
  }


  componentDidMount() {
    this.initAnimations();
  }
  
  componentDidUpdate(prevProps) {
    const {from, to} = this.props;
    const {from: prevFrom, to: prevTo} = prevProps;
    const {panLocation} = this.props.context; // eslint-disable-line
    const {
      panLocation: prevPanLocation,
    } = prevProps.context; // eslint-disable-line

    if (panLocation !== prevPanLocation) {
      this.setState({location: panLocation});
    }

    if (from !== prevFrom || to !== prevTo) {
      if (to === prevTo) {
        this.setState({location: from});
      } else {
        this.setState({location: from, diff: this.getDiff(from, to)}, this.initAnimations);
      }
    }
  }

  getDiff(from, to) {
    return {x: to.left - from.left, y: to.top - from.top};
  }

  startAnimation(animations) {
    if (!_.isUndefined(animations)) {
      if (Array.isArray(animations)) {
        Animated.parallel(animations).start(this.onAnimationEnd);
      } else {
        animations.start(this.onAnimationEnd);
      }
    }
  }

  onAnimationEnd = () => {
    this.setState({
      isAnimating: false,
      location: this.props.to,
    }, () => _.invoke(this.props, 'onAnimationEnd'));
  }

  getAnimation(animId, toValue) {
    const {animationOptions} = this.props;
    return Animated.timing(this.state[animId], {
      toValue: Math.round(toValue),
      duration: 400,
      easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      useNativeDriver: true,
      ...animationOptions
      // TODO: change to one animation value (interpolate)
      // this.style = {
      //     transform: [{translateX: this.animValue.interpolate({
      //         inputRange: [0, 1],
      //         outputRange: []
      //     })}]
      // }
    });
  }

  getAnimations() {
    const {diff} = this.state;
    const animationX = diff.x !== 0 ? this.getAnimation('animTranslateX', diff.x) : undefined;
    const animationY = diff.y !== 0 ? this.getAnimation('animTranslateY', diff.y) : undefined;
    if (animationX && animationY) {
      return [animationX, animationY];
    } else if (animationX) {
      return animationX;
    } else if (animationY) {
      return animationY;
    } else {
      return undefined;
    }
  }

  initAnimations() {
    const animations = this.getAnimations();
    if (!_.isUndefined(animations)) {
      this.setState({isAnimating: true}, () => this.startAnimation(animations));
    }
  }

  render() {
      const {children, style, onPanLocationChanged} = this.props;
      const {isAnimating, location, animTranslateX, animTranslateY} = this.state;
      const transform = isAnimating ? [{translateX: animTranslateX}, {translateY: animTranslateY}] : [];
      const Container = isAnimating ? Animated.View : View; // this solves a bug on Android

      return (
        <Container style={{transform}}>
          <PanResponderView
            ignorePanning={isAnimating}
            style={style}
            location={location}
            onPanLocationChanged={onPanLocationChanged}
          >
            {children}
          </PanResponderView>
        </Container>
      );
  }

}

export default asPanViewConsumer(panAnimatableView);
