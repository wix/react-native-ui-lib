import React from 'react';
import PropTypes from 'prop-types';

import {View, Modal as RNModal} from 'react-native';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import TopBar from './TopBar';

// EXPO.io Workaround - use BlurView from 'expo'
let BlurView;
if (Expo) {
  BlurView = require('expo').BlurView;
} else {
  BlurView = require('react-native-blur').BlurView;
}

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
  };

  render() {
    const {enableModalBlur, ...others} = this.props;
    const Container = enableModalBlur && Constants.isIOS ? BlurView : View;
    return (
      <RNModal {...others}>
        <Container style={{flex: 1}} blurType="light">
          {this.props.children}
        </Container>
      </RNModal>
    );
  }
}

Modal.TopBar = TopBar;
