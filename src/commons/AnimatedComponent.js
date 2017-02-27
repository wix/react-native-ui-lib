import {PropTypes} from 'react';
import {Animated} from 'react-native';
import BaseComponent from './BaseComponent';
import * as AnimationPresenter from './AnimationPresenter';

export default class AnimatedComponent extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      enterProgress: new Animated.Value(0),
    };
  }
  static propTypes = {
    animationType: PropTypes.oneOf(AnimatedComponent.animationTypes),
    ...BaseComponent.propTypes,
  }

  static animationTypes = {
    FADE_IN: 'FADE_IN',
    FADE_IN_DOWN: 'FADE_IN_DOWN',
    FADE_IN_UP: 'FADE_IN_UP',
  }

  componentDidMount() {
    Animated.timing(this.state.enterProgress, {
      toValue: 100,
      duration: 800,
      delay: 100,
    }).start();
  }

  getAnimationStyle() {
    return AnimationPresenter.getAnimationStyle(this.state, this.props);
  }
}
