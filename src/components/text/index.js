import React, {Component, PropTypes} from 'react';
import {TouchableOpacity, View, Text as RNText, ListView, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Colors, Typography} from '../../style';
import {BaseComponent} from '../../commons';

export default class Text extends BaseComponent {

  static displayName = 'Text';
  static propTypes = {
    // ...RNText,
    text10: PropTypes.bool,
    text20: PropTypes.bool,
    text30: PropTypes.bool,
    text40: PropTypes.bool,
    text50: PropTypes.bool,
    text60: PropTypes.bool,
    text70: PropTypes.bool,
    text80: PropTypes.bool,
    text90: PropTypes.bool,
    text100: PropTypes.bool,
    color: PropTypes.string,
    testId: PropTypes.string,
  };

  // static defaultProps = {
  //   color: Colors.dark10,
  // }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getTextTypography() {
    let typography = {};
    _.forEach(Typography, (value, key) => {
      if (this.props[key] === true) {
        typography = value;
      }
    });

    return typography;
  }

  render() {
    const {color} = this.props;
    const typography = this.getTextTypography();
    const style = [this.props.style, typography, color && {color}];
    return (
      <RNText {...this.props} style={style}>
        {this.props.children}
      </RNText>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
    },
  });
}
