import React from 'react';
import PropTypes from 'prop-types';
import {BlurView} from 'react-native-blur';
import {View, Modal as RNModal} from 'react-native';
import {BaseComponent} from '../../commons';
import TopBar from './TopBar';

export default class Modal extends BaseComponent {

  static propTypes = {
    enableModalBlur: PropTypes.bool,
  }

  render() {
    const {enableModalBlur, ...others} = this.props;
    const Container = enableModalBlur ? BlurView : View;
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
