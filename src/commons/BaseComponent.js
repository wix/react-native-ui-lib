import {Component, PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {Typography, Colors} from '../style';

export default class BaseComponent extends Component {

  static propTypes = {
    ..._.mapValues(Typography, () => PropTypes.bool),
    ..._.mapValues(Colors, () => PropTypes.bool),
    useNativeDriver: PropTypes.bool, // eslint-disable-line
  }

  static defaultProps = {
    useNativeDriver: true,
  }

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

  extractAnimationProps() {
    return _.pick(this.props, [
      'animation',
      'duration',
      'delay',
      'direction',
      'easing',
      'iterationCount',
      'transition',
      'onAnimationBegin',
      'onAnimationEnd',
      'useNativeDriver',
    ]);
  }

  extractContainerStyle(props) {
    let containerStyle = {};
    if (props.containerStyle) {
      containerStyle = _.pickBy(props.containerStyle, (value, key) => {
        return key.includes('margin') || _.includes(['alignSelf', 'transform'], key);
      });
    }

    return containerStyle;
  }

  extractTypographyValue() {
    let typography;
    _.forEach(Typography, (value, key) => {
      if (this.props[key] === true) {
        typography = value;
      }
    });
    return typography;
  }

  extractColorValue() {
    let color;
    _.forEach(Colors, (value, key) => {
      if (this.props[key] === true) {
        color = value;
      }
    });
    return color;
  }

  extractTextProps(props) {
    return _.pick(props, [..._.keys(Typography), ..._.keys(Colors), 'color']);
  }
}
