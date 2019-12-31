import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, Colors} from 'react-native-ui-lib';
const KeyboardRegistry = Keyboard.KeyboardRegistry;
import KeyboardView from './KeyboardView';

class KeyboardView1 extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView1', {
      message: 'Item selected from keyboard 1'
    });
  }

  render() {
    const {title} = this.props;
    return <KeyboardView title={title} backgroundColor={Colors.violet10} onPress={this.onButtonPress}/>;
  }
}

class KeyboardView2 extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView2', {
      message: 'Item selected from keyboard 2'
    });
  }

  render() {
    const {title} = this.props;
    return <KeyboardView title={title} backgroundColor={Colors.yellow20} onPress={this.onButtonPress}/>;
  }
}

KeyboardRegistry.registerKeyboard('KeyboardView1', () => KeyboardView1);
KeyboardRegistry.registerKeyboard('KeyboardView2', () => KeyboardView2);
