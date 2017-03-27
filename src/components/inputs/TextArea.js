import React from 'react';
import {View, TextInput as RNTextInput, StyleSheet} from 'react-native';
import BaseInput from './BaseInput';

export default class TextArea extends BaseInput {

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
          onChangeText={this.onChangeText}
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
