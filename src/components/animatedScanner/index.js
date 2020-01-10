import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../../components/view';

// TODO: add finisher animation (check icon animation or something)
/**
 * @description: Scanner component for progress indication
 * @extends: Animated.View
 * @gif: https://media.giphy.com/media/l49JVcxoclUXbryiA/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/animationScreens/CardScannerScreen.js
 */
export default class AnimatedScanner extends BaseComponent {
  static displayName = 'AnimatedScanner';
  static propTypes = {
    /**
     * animated value between 0 and 100
     */
    // progress: PropTypes.object,
    progress: PropTypes.number,
    /**
     * Duration of current break (can be change between breaks)
     */
    duration: PropTypes.number,
    /**
     * scanner opacity
     */
    opacity: PropTypes.number,
    /**
     * scanner background color
     */
    backgroundColor: PropTypes.string,
    /**
     * breakpoint callback - ({progress, isDone}) => {}
     */
    onBreakpoint: PropTypes.func,
    /**
     * should hide the scanner line
     */
    hideScannerLine: PropTypes.bool
  };

  static defaultProps = {
    progress: 0,
    duration: 1000
  };

  constructor(props) {
    super(props);

    this.state = {
      animatedProgress: new Animated.Value(0),
      isDone: false
    };
  }

  componentDidMount() {
    const {progress, duration} = this.props;
    if (progress > 0) {
      this.animate(progress, duration);
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {progress} = this.props;
    if (nextProps.progress !== progress) {
      this.animate(nextProps.progress, nextProps.duration);
    }
  }

  componentWillUnmount() {
    this.state.animatedProgress.stopAnimation();
  }

  animate(toValue, duration) {
    const {animatedProgress} = this.state;
    Animated.timing(animatedProgress, {
      toValue,
      duration
    }).start(({finished}) => {
      if (finished) {
        const isDone = toValue >= 100;
        this.setState({
          isDone
        });
        _.invoke(this.props, 'onBreakpoint', {progress: toValue, isDone});
      }
    });
  }

  render() {
    const {opacity, backgroundColor, hideScannerLine, style} = this.props;
    const {isDone, animatedProgress} = this.state;
    return (
      <View style={{...StyleSheet.absoluteFillObject}}>
        <Animated.View
          style={[
            this.styles.container,
            style,
            opacity && {opacity},
            backgroundColor && {backgroundColor},
            {
              left: animatedProgress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              })
            }
          ]}
        >
          {isDone && !hideScannerLine && <View style={this.styles.scanner}/>}
        </Animated.View>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors.white,
      opacity: 0.9
    },
    scanner: {
      ...StyleSheet.absoluteFillObject,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.dark50
    }
  });
}
