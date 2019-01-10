import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, SafeAreaView, Animated, Easing} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Constants} from '../../helpers';
import {AnimatableManager, Colors} from '../../style';
import {BaseComponent} from '../../commons';
import Modal from '../../screensComponents/modal';
import View from '../view';
import PanGestureView from '../panGestureView';


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
     * The animation configuration to pass to the dialog (ex. {animation, delay, duration, easing})
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

  static swipeDirections = SWIPE_DIRECTIONS; // DEFRECATED

  constructor(props) {
    super(props);

    this.initialPosition = props.top ? -Constants.screenHeight : Constants.screenHeight;

    this.state = {
      alignments: this.state.alignments,
      deltaY: new Animated.Value(this.initialPosition)
    };

    if (props.dismissSwipeDirection) {
      console.warn('Dialog component\'s prop \'dismissSwipeDirection\' is deprecated, please remove it');
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  onDismiss = () => {
    this.initPositions();
    _.invoke(this.props, 'onDismiss');
  }

  initPositions() {
    this.setState({
      deltaY: new Animated.Value(this.initialPosition)
    });
  }

  onModalShow = () => {
    const {animationConfig} = this.getThemeProps();
    const {deltaY} = this.state;
 
    Animated.timing(deltaY, {
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
    const {style, top} = this.getThemeProps();

    return (
      <PanGestureView
        style={[this.styles.dialogContainer, style]}
        direction={top && PanGestureView.directions.UP}
        onDismiss={this.onDismiss}
      >
        {this.renderContent()}
      </PanGestureView>
    );
  }

  renderAnimationContainer() {
    const {animationConfig, top} = this.getThemeProps();
    const {alignments, deltaY} = this.state;
    const centerByDefault = _.isEmpty(alignments);
    const hasCustomAnimation = (animationConfig && animationConfig.animation);
    const Container = hasCustomAnimation ? Animatable.View : Animated.View;
    const defaultAnimation = top ? AnimatableManager.presets.slideInDown : AnimatableManager.presets.slideInUp;
    const animation = hasCustomAnimation ? Object.assign(defaultAnimation, animationConfig) : {};

    return (
      <Container 
        style={[
          this.styles.overlay,
          {...alignments},
          centerByDefault && this.styles.centerContent,
          !hasCustomAnimation && {
            transform: [{
              translateY: deltaY
            }]
          }
        ]}
        pointerEvents="box-none"
        {...animation}
      >
        {this.renderDraggableContainer()}
      </Container>
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
