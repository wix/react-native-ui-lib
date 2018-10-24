import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {BaseComponent} from '../../commons';
import {Colors} from '../../style';
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
    dismissSwipeDirection: PropTypes.oneOfType(SWIPE_DIRECTIONS),
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
    dismissSwipeDirection: SWIPE_DIRECTIONS.DOWN,
  };

  static swipeDirections = SWIPE_DIRECTIONS;

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getAnimationConfig() {
    const {animationConfig} = this.props;
    return {
      animation: 'slideInUp',
      duration: 400,
      useNativeDriver: true,
      ...animationConfig,
    };
  }

  onSwipe(gestureName) {
    const {SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    const {dismissSwipeDirection} = this.props;

    switch (gestureName) {
      case SWIPE_UP:
        if (dismissSwipeDirection === SWIPE_DIRECTIONS.UP) {
          _.invoke(this.props, 'onDismiss');
        }
        break;
      case SWIPE_DOWN:
        if (dismissSwipeDirection === SWIPE_DIRECTIONS.DOWN) {
          _.invoke(this.props, 'onDismiss');
        }
        break;
      default:
        break;
    }
  }

  render() {
    const {visible, overlayBackgroundColor, style, onDismiss} = this.getThemeProps();
    const {alignments} = this.state;
    const centerByDefault = _.isEmpty(alignments);
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

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
          <Animatable.View style={[this.styles.dialogContainer, style]} {...this.getAnimationConfig()}>
            <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              config={config}
              style={{flex: 1}}
            >
              <TouchableWithoutFeedback>
                {this.props.children}
              </TouchableWithoutFeedback>
            </GestureRecognizer>
          </Animatable.View>
        </View>
      </Modal>
    );
  }
}

function createStyles({width, height}) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
    },
    dialogContainer: {
      width,
      height,
    },
  });
}

export default Dialog;
