import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Modal as RNModal, TouchableWithoutFeedback} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import TopBar from './TopBar';
import View from '../../components/view';

/**
 * @description: Component that present content on top of the invoking screen
 * @extends: Modal
 * @extendslink: https://facebook.github.io/react-native/docs/modal.html
 * @gif: https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.js
 */
export default class Modal extends BaseComponent {
  static displayName = 'Modal';
  static propTypes = {
    /**
     * Blurs the modal background when transparent (iOS only)
     */
    enableModalBlur: PropTypes.bool,
    /**
     * A custom view to use as a BlueView instead of the default one
     */
    blurView: PropTypes.element,
    /**
     * allow dismissing a modal when clicking on its background
     */
    onBackgroundPress: PropTypes.func,
    /**
     * the background color of the overlay
     */
    overlayBackgroundColor: PropTypes.string
  };

  renderTouchableOverlay() {
    const {overlayBackgroundColor, onBackgroundPress, accessibilityLabel = 'Dismiss'} = this.props;
    if (_.isFunction(onBackgroundPress) || !!overlayBackgroundColor) {
      const isScreenReaderEnabled = Constants.accessibility.isScreenReaderEnabled;
      const accessibilityProps = isScreenReaderEnabled
        ? {accessible: true, accessibilityLabel, accessibilityRole: 'button'}
        : undefined;

      return (
        <View
          useSafeArea={isScreenReaderEnabled}
          style={!isScreenReaderEnabled && [styles.touchableOverlay, {backgroundColor: overlayBackgroundColor}]}
        >
          <TouchableWithoutFeedback {...accessibilityProps} onPress={onBackgroundPress}>
            <View style={isScreenReaderEnabled ? styles.accessibleOverlayView : styles.overlayView}/>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  render() {
    const {blurView, enableModalBlur, visible, ...others} = this.props;
    const defaultContainer = enableModalBlur && Constants.isIOS ? BlurView : View;
    const Container = blurView ? blurView : defaultContainer;

    return (
      <RNModal visible={Boolean(visible)} {...others}>
        <Container style={{flex: 1}} blurType="light">
          {this.renderTouchableOverlay()}
          {this.props.children}
        </Container>
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  touchableOverlay: {
    ...StyleSheet.absoluteFillObject
  },
  overlayView: {
    flex: 1
  },
  accessibleOverlayView: {
    height: 50,
    width: '100%'
  }
});

Modal.TopBar = TopBar;
