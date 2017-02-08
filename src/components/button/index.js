import React, {Component, PropTypes} from 'react';
import {Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import _ from 'lodash';
import * as Constants from '../../helpers/Constants';
import {Colors, ComponentsColors, Typography} from '../../style';

export default class Button extends Component {

  static propTypes = {
    label: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    containerStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    enableShadow: PropTypes.bool // iOS-only
  };

  static defaultProps = {
    containerStyle: {},
    labelStyle: {}
  };

  render() {
    const {label, onPress, disabled, containerStyle, labelStyle, enableShadow, testID} = this.props;
    return (
      <TouchableOpacity style={[styles.container, enableShadow ? styles.shadowStyle : {}, disabled && styles.disabled, containerStyle]} onPress={onPress} disabled={disabled} >
        <Text style={[styles.text, labelStyle]} testID={testID}>
          {Constants.isAndroid ? _.toUpper(label) : label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ComponentsColors.CTA,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    height: 54,
    borderRadius: Platform.OS === 'ios' ? 27 : 3,
    minWidth: 160
  },
  shadowStyle: {
    shadowColor: '#3082C8',
    shadowOffset: {height: 5, width: 0},
    shadowOpacity: 0.35,
    shadowRadius: 9.5
  },
  text: {
    flex: 0,
    flexDirection: 'row',
    color: 'white',
    ...Typography.text70,
    fontWeight: '100'
  },
  disabled: {
    backgroundColor: Colors.dark60
  },
});
