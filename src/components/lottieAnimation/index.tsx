import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Animated, Easing} from 'react-native';
import Animation from 'lottie-react-native';
import {View} from 'react-native-ui-lib';
import * as AnimationPresenter from './AnimationPresenter';
// import {UseCustomThemeProps} from '../../types/modifiers';

interface AnimationSource {
  config?: { color?: string | string[]; };
  template?: string;
}

export interface Props {
  /**
   * the animation json source
   */
  source?: AnimationSource;
  /**
   * the animation color or list of colors
   */
  color?: string | string[];
  /**
   * the width of the animation
   */
  width?: string | number;
  /**
   * the height of the animation
   */
  height?: string | number;
  /**
   * the duration of the animation (default 1000ms)
   */
  duration?: number;
  /**
   * the current animation progress (0-1)
   */
  progress?: number;
  /**
   * should this animation run in loop
   */
  loop?: boolean;
  /**
   * callback for when animation ends (this will not trigger for animations that runs in loop)
   */
  onEndAnimation?: () => void;
}

interface State {
  animationProgress: Animated.Value;
}

export default class LottieAnimation extends PureComponent<Props, State> { //UseCustomThemeProps<Props>

  private currentProgress: number;

  state = {
    animationProgress: new Animated.Value(0)
  };

  animating = false;


  componentDidMount() {
    const {toValue, duration} = AnimationPresenter.getAnimationProps(this.props);
    this.startAnimation({toValue, duration});
  }

  componentWillUnmount() {
    this.state.animationProgress.stopAnimation();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.progress !== this.props.progress && !this.animating) {
      const {duration} = AnimationPresenter.getAnimationProps(nextProps);
      this.startAnimation({toValue: nextProps.progress, duration});
    }
  }

  startAnimation({toValue, duration}) {
    this.animating = true;
    this.currentProgress = toValue;
    Animated.timing(this.state.animationProgress, {
      toValue,
      easing: Easing.linear,
      duration,
      useNativeDriver: true
    }).start(state => {
      this.onEndAnimation(state);
    });
  }

  onEndAnimation({finished}) {
    this.animating = false;

    if (finished) {
      const {progress} = this.props;
      const {loop, toValue, duration} = AnimationPresenter.getAnimationProps(this.props);

      if (loop) {
        this.state.animationProgress.setValue(0);
        this.startAnimation({toValue, duration});
      } else if (!_.isUndefined(progress) && this.currentProgress < toValue) {
        this.startAnimation({toValue, duration});
      } else {
        _.invoke(this.props, 'onEndAnimation');
      }
    }
  }

  render() {
    const {useCustomTheme, ...others} = this.props; // eslint-disable-line
    const {width, height} = AnimationPresenter.getAnimationProps(this.props);
    const source = AnimationPresenter.generateSource(this.props);

    return (
      <View {...others} width={width} height={height}>
        <Animation style={{flex: 1}} source={source} progress={this.state.animationProgress}/>
      </View>
    );
  }

  resetTo(frame = 0) {
    this.state.animationProgress.setValue(frame);
  }

  play(startFrame, endFrame = 1) {
    const {duration} = AnimationPresenter.getAnimationProps(this.props);

    if (!_.isNil(startFrame)) {
      this.resetTo(startFrame);
    }

    this.startAnimation({toValue: endFrame, duration});
  }
}
