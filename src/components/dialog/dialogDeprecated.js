import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, SafeAreaView, Animated, Easing, TouchableOpacity} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {Constants} from '../../helpers';
import {AnimatableManager, Colors} from '../../style';
import {BaseComponent} from '../../commons';
import Modal from '../../screensComponents/modal';
import View from '../view';
import PanGestureView from '../panningViews/panGestureView';


/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog position
 * (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center)
 * @modifiers: alignment
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js
 * @gif: https://media.giphy.com/media/9S58XdLCoUiLzAc1b1/giphy.gif
 */

const SWIPE_DIRECTIONS = {
  UP: 'up',
  DOWN: 'down'
}; // DEFRECATED

class DialogDeprecated extends BaseComponent {
  static displayName = 'Dialog (deprecated)'
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
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Disable the pan gesture recognizer
     */
    disablePan: PropTypes.bool,
    /**
     * Whether or not to handle SafeArea
     */
    useSafeArea: PropTypes.bool,
    /**
     * Whether to display the dialog in a modal
     */
    useModal: PropTypes.bool,
    /**
     * Called once the modal has been dissmissed (iOS only, modal only)
     */
    onModalDismissed: PropTypes.func
  };

  static defaultProps = {
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
    width: '90%',
    height: '70%',
    useModal: true
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

    if (props.visible) {
      this.animateContent();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.animateContent();
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  onDismiss = () => {
    this.initPositions();
    _.invoke(this.props, 'onDismiss', this.props);
  }

  animatedDismiss = () => {
    if (this.panGestureViewRef) {
      this.panGestureViewRef.animateDismiss();
    } else {
      this.onDismiss();
    }
  }

  initPositions() {
    this.setState({
      deltaY: new Animated.Value(this.initialPosition)
    });
  }

  animateContent() {
    const {animationConfig} = this.getThemeProps();
    const {deltaY} = this.state;
 
    Animated.timing(deltaY, {
      toValue: 0,
      duration: _.get(animationConfig, 'duration', 400),
      easing: _.get(animationConfig, 'easing', Easing.bezier(0.165, 0.84, 0.44, 1)),
      useNativeDriver: _.get(animationConfig, 'useNativeDriver', true)
    }).start();
  }

  renderContent() {
    const {bottom, useSafeArea} = this.getThemeProps();
    const bottomInsets = Constants.getSafeAreaInsets().bottom;

    return (
      <TouchableWithoutFeedback accessible={false}>
        <SafeAreaView style={{flexGrow: 1}}>
          {this.props.children}
          {useSafeArea && Constants.isIphoneX && bottom && <View style={{marginTop: bottomInsets}}/>}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  renderDraggableContainer() {
    const {style, top, disablePan} = this.getThemeProps();
    const Container = disablePan ? View : PanGestureView;

    return (
      <Container
        ref={!disablePan && (r => this.panGestureViewRef = r)}
        style={[this.styles.dialogContainer, style]}
        direction={!disablePan && top && PanGestureView.directions.UP}
        onDismiss={this.onDismiss}
      >
        {this.renderContent()}
      </Container>
    );
  }

  renderAnimationContainer() {
    const {animationConfig, top, testID} = this.getThemeProps();
    const {alignments, deltaY} = this.state;
    const centerByDefault = _.isEmpty(alignments);
    const hasCustomAnimation = (animationConfig && animationConfig.animation);
    const Container = hasCustomAnimation ? AnimatableView : Animated.View;
    const defaultAnimation = top ? AnimatableManager.presets.slideInDown : AnimatableManager.presets.slideInUp;
    const animation = hasCustomAnimation ? Object.assign(defaultAnimation, animationConfig) : {};

    return (
      <Container
        testID={testID}
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
    const {visible, overlayBackgroundColor, useModal, onModalDismissed, disablePan} = this.getThemeProps();
    const dismissFunction = disablePan ? this.onDismiss : this.animatedDismiss;
    
    if (useModal) {
      return (
        <Modal
          transparent
          visible={visible}
          animationType={'fade'}
          onBackgroundPress={dismissFunction}
          onRequestClose={dismissFunction}
          overlayBackgroundColor={overlayBackgroundColor}
          onDismiss={onModalDismissed}
        >
          {this.renderAnimationContainer()}
        </Modal>
      );
    } else {      
      return (
        <TouchableOpacity 
          onPress={this.onDismiss}
          activeOpacity={1}
          style={{position: 'absolute', bottom: 0, top: 0, left: 0, right: 0, backgroundColor: overlayBackgroundColor}}
        >
          {this.renderAnimationContainer()}
        </TouchableOpacity>
      );
    }
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

export default DialogDeprecated;
