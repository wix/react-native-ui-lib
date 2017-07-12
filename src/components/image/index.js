import React from 'react';
import {Image as RNImage} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {ThemeManager} from '../../style';

export default class Image extends BaseComponent {
  static propTypes = {
    sourceTransformer: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.sourceTransformer =
      props.sourceTransformer ||
      _.get(ThemeManager.components, 'Image.sourceTransformer');
  }

  getImageSource() {
    if (this.sourceTransformer) {
      return this.sourceTransformer(this.props);
    }
    return this.props.source;
  }

  render() {
    const source = this.getImageSource();
    return <RNImage {...this.props} source={source}/>;
  }
}
