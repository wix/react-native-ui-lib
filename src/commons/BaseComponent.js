import {Component} from 'react';
import {StyleSheet} from 'react-native';

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
}
