import React from 'react';
import {Image as RNImage} from 'react-native';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {ThemeManager} from '../../style';
import Assets from '../../assets';

/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 */
class Image extends BaseComponent {
  static displayName = 'Image';

  static propTypes = {
    /**
     * custom source transform handler for manipulating the image source (great for size control)
     */
    sourceTransformer: PropTypes.func,
    /**
     * if provided image source we be drriven from asset name
     */
    assetName: PropTypes.string,
    /**
     * the asset group, default is "icons"
     */
    assetGroup: PropTypes.string,
  };

  static defaultProps = {
    assetGroup: 'icons',
  };

  constructor(props) {
    super(props);

    this.sourceTransformer = props.sourceTransformer || _.get(ThemeManager.components, 'Image.sourceTransformer');
  }

  getImageSource() {
    const {assetName, assetGroup} = this.props;
    if (!_.isUndefined(assetName)) {
      return _.get(Assets, `${assetGroup}.${assetName}`);
    }

    if (this.sourceTransformer) {
      return this.sourceTransformer(this.props);
    }

    const {source} = this.props;
    if (_.get(source, 'uri') === null) {
      return {...source, uri: undefined};
    }

    return source;
  }

  render() {
    const source = this.getImageSource();
    return <RNImage {...this.props} source={source} />;
  }
}

hoistNonReactStatic(Image, RNImage);
export default Image;
