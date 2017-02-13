import React, {PropTypes} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {BaseComponent} from '../commons';

/**
 * BaseListItem component
 */
export default class BaseListItem extends BaseComponent {
  static displayName = 'BaseList';
  static propTypes = {};

  renderElement1() {
    return null;
  }

  generateStyles() {
    this.styles = createStyles();
  }

  render() {
    return (
      <TouchableOpacity style={this.styles.container}>
        <View>
          {this.renderElement1()}
        </View>
        <View></View>
        <View></View>
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
  });
}
