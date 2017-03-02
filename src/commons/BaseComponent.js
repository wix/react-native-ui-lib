import {Component, PropTypes} from 'react';
import {StyleSheet} from 'react-native';
// import * as Animatable from 'react-native-animatable';
import _ from 'lodash';

export default class BaseComponent extends Component {

  static propTypes = {
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
        return key.includes('margin');
      });
    }

    return containerStyle;
  }
}
