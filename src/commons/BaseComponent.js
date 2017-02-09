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
    let containerStyle = {};
    if (props.containerStyle) {
      containerStyle = _.pickBy(props.containerStyle, (value, key) => {
        return key.includes('margin');
      });
    }

    return containerStyle;
  }
}
