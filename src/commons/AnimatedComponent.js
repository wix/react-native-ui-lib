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
    animationDuration: PropTypes.number,
    animationDelay: PropTypes.number,
    ...BaseComponent.propTypes,
  }

  static defaultProps = {
    animationDuration: 600,
    animationDelay: 0,
  }

  static animationTypes = {
    FADE_IN: 'FADE_IN',
    FADE_IN_DOWN: 'FADE_IN_DOWN',
    FADE_IN_UP: 'FADE_IN_UP',
  }

  componentDidMount() {
    const {animationDuration, animationDelay} = this.props;
    Animated.timing(this.state.enterProgress, {
      toValue: 100,
      duration: animationDuration,
      delay: animationDelay,
    }).start();
  }

  getAnimationStyle() {
    return AnimationPresenter.getAnimationStyle(this.state, this.props);
  }
}
