import React, {PropTypes} from 'react';
import {View, TextInput as RNTextInput, StyleSheet, Animated} from 'react-native';
import _ from 'lodash';
import Text from '../text';
import {Colors, Typography} from '../../style';
import {Constants} from '../../helpers';
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
    },
  });
}
