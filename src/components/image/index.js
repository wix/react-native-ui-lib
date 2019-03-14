import React from 'react';
import {Image as RNImage, I18nManager} from 'react-native';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
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
     * if provided image source will be driven from asset name
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
    /**
     * whether the image should flip horizontally on RTL locals
     */
    supportRTL: PropTypes.bool
  };

  static defaultProps = {
    assetGroup: 'icons'
  };

  constructor(props) {
    super(props);

    this.sourceTransformer = this.getThemeProps().sourceTransformer;
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
    const {tintColor, style, supportRTL, ...others} = this.getThemeProps();
    const shouldFlipRTL = supportRTL && I18nManager.isRTL;

    return (
      <RNImage 
        style={[{tintColor}, style, shouldFlipRTL && {transform: [{scaleX: -1}]}]} 
        {...others} 
        source={source}
      />
    );
  }
}

hoistNonReactStatic(Image, RNImage);
export default Image;
