import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, SafeAreaView, PanResponder, Animated, Easing} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Constants} from '../../helpers';
import {Colors, AnimatableManager} from '../../style';
import {BaseComponent} from '../../commons';
import Modal from '../../screensComponents/modal';
import View from '../view';

/*eslint-disable*/
/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog positon (top, bottom, centerV, centerH, etc... by default the dialog is align to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://media.giphy.com/media/9S58XdLCoUiLzAc1b1/giphy.gif
 */
/*eslint-enable*/

const SWIPE_DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
};

class Dialog extends BaseComponent {
  static displayName = 'Dialog'
  static propTypes = {
    /**
     * Control visibility of the dialog
     */
    visible: PropTypes.bool,
    /**
     * dismiss callback for when clicking on the background
     */
    onDismiss: PropTypes.func,
    /**
     * the direction of the swipe to dismiss the dialog (default is 'down')
     */
    dismissSwipeDirection: PropTypes.oneOf(Object.values(SWIPE_DIRECTIONS)),
    /**
     * The color of the overlay background
     */
    overlayBackgroundColor: PropTypes.string,
    /**
     * The dialog width (default: 90%)
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The dialog height (default: 70%)
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * the animation configuration to pass to the dialog (based on react-native-animatable,
     * ex. {animation, duration, easing,..})
     */
    animationConfig: PropTypes.object,
    /**
     * The dialog container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
    width: '90%',
    height: '70%',
    // dismissSwipeDirection: SWIPE_DIRECTIONS.DOWN,
  };

  constructor(props) {
    super(props);

    this.state = {
      alignments: this.state.alignments,
      deltaY: new Animated.Value(0)
    };

    if (props.dismissSwipeDirection) {
      console.warn('Dialog component\'s prop \'dismissSwipeDirection\' is deprecated, please remove it');
    }
  }

  static swipeDirections = SWIPE_DIRECTIONS;

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  handleStartShouldSetPanResponder = (e, gestureState) => {
    return true;
  };
  handleMoveShouldSetPanResponder = (e, gestureState) => {
    return true;
  };
  handlePanResponderGrant = (e, gestureState) => {
    this.swipe = false;
  };
  handlePanResponderMove = (e, gestureState) => {
    const {top} = this.props;
    const {deltaY} = this.state;
    let newValue = 0;

    if (Math.abs(gestureState.vy) >= 3) {
      if ((top && gestureState.vy < 0) || (!top && gestureState.vy > 0)) {
        // Swipe
        this.swipe = true;
      }
    } else if ((top && gestureState.dy < 0) || (!top && gestureState.dy > 0)) {
      // Drag
      newValue = gestureState.dy;
      Animated.spring(deltaY, {
        toValue: Math.round(newValue),
        speed: 20
      }).start();
    }
  };
  handlePanResponderEnd = (e, gestureState) => {
    if (!this.swipe) {
      const {top} = this.props;
      const {deltaY} = this.state;
      const threshold = this.layout.height / 2;
      const endValue = Math.round(deltaY._value);
      
      if ((top && endValue <= -threshold) || (!top && endValue >= threshold)) {
        // close
        this.animateDismiss();
      } else {
        // back to initial position
        Animated.spring(deltaY, {
          toValue: 0,
          speed: 20,
        }).start();
      }
    } else {
      // close
      this.animateDismiss();
    }
  };

  animateDismiss() {
    const {top} = this.props;
    const {deltaY} = this.state;
    const newValue = top ? deltaY._value - this.layout.height : deltaY._value + Constants.screenHeight;
    
    Animated.spring(deltaY, {
      toValue: Math.round(newValue),
      speed: 40,
    }).start(this.onAnimatedFinished);
  }

  onAnimatedFinished = ({finished}) => {
    if (finished) {
      _.invoke(this.props, 'onDismiss');
      this.setState({deltaY: new Animated.Value(0)});
    }
  }

  onLayout = (event) => {
    this.layout = event.nativeEvent.layout;
  }

  render() {
    const {visible, overlayBackgroundColor, style, onDismiss, bottom, animationConfig, top} = this.getThemeProps();
    const {alignments, deltaY} = this.state;
    const centerByDefault = _.isEmpty(alignments);
    const bottomInsets = Constants.getSafeAreaInsets().paddingBottom;
    const animation = top ? AnimatableManager.presets.slideInDown : AnimatableManager.presets.slideInUp;

    return (
      <Modal
        transparent
        visible={visible}
        animationType={'fade'}
        onBackgroundPress={onDismiss}
        onRequestClose={onDismiss}
        overlayBackgroundColor={overlayBackgroundColor}
      >
        <View center={centerByDefault} style={[this.styles.overlay, alignments]} pointerEvents="box-none">
          <Animatable.View style={[this.styles.dialogContainer]} {...animation} {...animationConfig} pointerEvents="box-none">
            <Animated.View
              style={[
                this.styles.gestureContainer,
                style,
                deltaY && {
                  transform: [{
                    translateY: deltaY
                  }]
                }
              ]} 
              {...this.panResponder.panHandlers}
              onLayout={this.onLayout}
            >
              <TouchableWithoutFeedback>
                <SafeAreaView style={{flexGrow: 1}}>
                  {this.props.children}
                  {Constants.isIphoneX && bottom && <View style={{height: bottomInsets}}/>}
                </SafeAreaView>
              </TouchableWithoutFeedback>
            </Animated.View>
          </Animatable.View>
        </View>
      </Modal>
    );
  }
}

function createStyles({width, height}) {
  return StyleSheet.create({
    overlay: {
      flex: 1
    },
    dialogContainer: {
      width,
      height
    },
    gestureContainer: {
      flexGrow: 1
    }
  });
}

export default Dialog;
