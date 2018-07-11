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
 * @extendslink: https://facebook.github.io/react-native/docs/image.html
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
    /**
     * the asset tint
     */
    tintColor: PropTypes.string,
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
    if (_.get(source, 'uri') === null || _.get(source, 'uri') === '') {
      return {...source, uri: undefined};
    }

    return source;
  }

  render() {
    const source = this.getImageSource();
    const {tintColor} = this.getThemeProps();
    
    return <RNImage {...this.props} source={source} style={{tintColor}}/>;
  }
}

hoistNonReactStatic(Image, RNImage);
export default Image;
