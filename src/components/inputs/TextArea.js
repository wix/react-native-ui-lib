import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput as RNTextInput, StyleSheet} from 'react-native';
import BaseInput from './BaseInput';

/**
 * @description: a wrapper for Text Input component to create enclosed text area
 * @extends: TextInput
 * @extendslink: https://facebook.github.io/react-native/docs/textinput.html
 * @modifiers: Typography
 * @gif: https://media.giphy.com/media/3oFzmoU8TdfHeYZNZu/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/InputsScreen.js
 */
export default class TextArea extends BaseInput {
  static displayName = 'TextArea';
  static propTypes = {
    ...RNTextInput.propTypes,
    ...BaseInput.propTypes,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {value} = this.state;
    const typography = this.getTypography();
    const inputStyle = [this.styles.input, typography];
    return (
      <View style={this.styles.container}>
        <RNTextInput
          {...this.props}
          value={value}
          multiline
          style={inputStyle}
          underlineColorAndroid="transparent"
          onChangeText={this.onChangeText}
          ref={(input) => { this.input = input; }}
        />
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      textAlignVertical: 'top',
    },
  });
}
