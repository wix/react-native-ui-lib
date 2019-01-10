import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, SafeAreaView, PanResponder, Animated, Easing} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Constants} from '../../helpers';
import {AnimatableManager, Colors} from '../../style';
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
  DOWN: 'down'
}; // DEFRECATED

class Dialog extends BaseComponent {
  static displayName = 'Dialog'
  static propTypes = {
    /**
     * Control visibility of the dialog
     */
    visible: PropTypes.bool,
    /**
     * Dismiss callback for when clicking on the background
     */
    onDismiss: PropTypes.func,
    /**
     * The direction of the swipe to dismiss the dialog (default is 'down')
     */
    dismissSwipeDirection: PropTypes.oneOf(Object.values(SWIPE_DIRECTIONS)), // DEFRECATED
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
     * The animation configuration to pass to the dialog (ex. {delay, duration, easing, useNativeDriver})
     */
    animationConfig: PropTypes.object,
    /**
     * The dialog container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
  };

  static defaultProps = {
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
    width: '90%',
    height: '70%'
  };

  constructor(props) {
    super(props);

    this.initialPosition = props.top ? -Constants.screenHeight : Constants.screenHeight;

    this.state = {
      alignments: this.state.alignments,
      deltaY: new Animated.Value(0),
      mainDeltaY: new Animated.Value(this.initialPosition)
    };

    if (props.dismissSwipeDirection) {
      console.warn('Dialog component\'s prop \'dismissSwipeDirection\' is deprecated, please remove it');
    }
  }

  static swipeDirections = SWIPE_DIRECTIONS; // DEFRECATED

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    });
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  handleStartShouldSetPanResponder = () => {
    return true;
  };
  handleMoveShouldSetPanResponder = () => {
    return true;
  };
  handlePanResponderGrant = () => {
    this.swipe = false;
  };
  handlePanResponderMove = (e, gestureState) => {
    const {top} = this.props;
    const {deltaY} = this.state;
    let newValue = 0;
    
    if (Math.abs(gestureState.vy) >= 1.8) {
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
  handlePanResponderEnd = () => {
    if (!this.swipe) {
      const {top} = this.props;
      const {deltaY} = this.state;
      const threshold = this.layout.height / 2;
      const endValue = Math.round(deltaY._value); // eslint-disable-line
      
      if ((top && endValue <= -threshold) || (!top && endValue >= threshold)) {
        // close
        this.animateDismiss();
      } else {
        // back to initial position
        Animated.spring(deltaY, {
          toValue: 0,
          speed: 20
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
    const newValue = top ? -this.layout.height -this.layout.y - 1 : deltaY._value + (Constants.screenHeight - this.layout.y); // eslint-disable-line
    
    Animated.timing(deltaY, {
      toValue: Math.round(newValue),
      duration: 280,
      useNativeDriver: true
    }).start(this.onAnimatedFinished);
  }

  onAnimatedFinished = ({finished}) => {
    if (finished) {
      this.onDismiss();
    }
  }

  onDismiss = () => {
    _.invoke(this.props, 'onDismiss');
    this.initPositions();
  }

  initPositions() {
    this.setState({
      deltaY: new Animated.Value(0), 
      mainDeltaY: new Animated.Value(this.initialPosition)
    });
  }

  onLayout = (event) => {
    this.layout = event.nativeEvent.layout;
  }

  onModalShow = () => {
    const {animationConfig} = this.getThemeProps();
    const {mainDeltaY} = this.state;
 
    Animated.timing(mainDeltaY, {
      toValue: 0,
      duration: _.get(animationConfig, 'duration', 280),
      delay: _.get(animationConfig, 'delay', 200),
      easing: _.get(animationConfig, 'easing', Easing.bezier(0.165, 0.84, 0.44, 1)),
      useNativeDriver: _.get(animationConfig, 'useNativeDriver', true)
    }).start();
  }

  renderContent() {
    const {bottom} = this.getThemeProps();
    const bottomInsets = Constants.getSafeAreaInsets().paddingBottom;

    return (
      <TouchableWithoutFeedback>
        <SafeAreaView style={{flexGrow: 1}}>
          {this.props.children}
          {Constants.isIphoneX && bottom && <View style={{height: bottomInsets}}/>}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  renderDraggableContainer() {
    const {style} = this.getThemeProps();
    const {deltaY} = this.state;

    return (
      <Animated.View
        style={[
          this.styles.dialogContainer,
          style,
          {
            transform: [{
              translateY: deltaY
            }]
          }
        ]} 
        {...this.panResponder.panHandlers}
        onLayout={this.onLayout}
      >
        {this.renderContent()}
      </Animated.View>
    );
  }

  renderAnimationContainer() {
    const {animationConfig, top} = this.getThemeProps();
    const {alignments, mainDeltaY} = this.state;
    const centerByDefault = _.isEmpty(alignments);
    const animation = top ? AnimatableManager.presets.slideInDown : AnimatableManager.presets.slideInUp;

    if (animationConfig && animationConfig.animation) {
      return (
        <Animatable.View 
          style={[this.styles.overlay, {...alignments}, centerByDefault && this.styles.centerContent]} 
          {...animation} 
          {...animationConfig} 
          pointerEvents='box-none'
        >
          {this.renderDraggableContainer()}
        </Animatable.View>
      );
    }
    return (
      <Animated.View 
        style={[
          this.styles.overlay,
          {...alignments},
          centerByDefault && this.styles.centerContent,
          {
            transform: [{
              translateY: mainDeltaY
            }]
          }
        ]}
        pointerEvents='box-none'
      >
        {this.renderDraggableContainer()}
      </Animated.View>
    );
  }

  render() {
    const {visible, overlayBackgroundColor} = this.getThemeProps();

    return (
      <Modal
        transparent
        visible={visible}
        animationType={'fade'}
        onBackgroundPress={this.onDismiss}
        onRequestClose={this.onDismiss}
        overlayBackgroundColor={overlayBackgroundColor}
        onShow={this.onModalShow}
      >
        {this.renderAnimationContainer()}
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
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
}

export default Dialog;
