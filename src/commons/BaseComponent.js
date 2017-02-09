import {Component} from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';

export default class BaseComponent extends Component {

  constructor(props) {
    super(props);
    if (!this.styles) {
      this.generateStyles();
    }
  }

  styles;

  generateStyles() {
    this.styles = StyleSheet.create({});
  }

  extractContainerStyle(props) {
    const containerStyle = {};
    if (props.containerStyle) {
      _.map(props.containerStyle, (value, key) => {
        if (_.isString(key) && key.includes('margin')) {
          containerStyle[key] = value;
        }
      });
    }
    return containerStyle;
  }

}
