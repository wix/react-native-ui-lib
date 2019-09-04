import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {Image as RNImage, StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {PureBaseComponent} from '../../commons';
import Assets from '../../assets';
import View from '../view';
import Overlay from '../overlay';


/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendslink: https://facebook.github.io/react-native/docs/image.html
 */
class Image extends PureBaseComponent {
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
    supportRTL: PropTypes.bool,
    /**
     * Show image as a cover, full width, image (according to aspect ratio, default: 16:8)
     */
    cover: PropTypes.bool,
    /**
     * The aspect ratio for the image
     */
    aspectRatio: PropTypes.number,
    /**
     * The type of overly to place on top of the image
     */
    overlayType: Overlay.propTypes.type
  };

  static defaultProps = {
    assetGroup: 'icons'
  };

  static overlayTypes = Overlay.overlayTypes;

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

  renderImage() {
    const source = this.getImageSource();
    const {tintColor, style, supportRTL, cover, aspectRatio, ...others} = this.getThemeProps();
    const shouldFlipRTL = supportRTL && Constants.isRTL;

    return (
      <RNImage
        style={[
          {tintColor},
          shouldFlipRTL && styles.rtlFlipped,
          cover && styles.coverImage,
          aspectRatio && {aspectRatio},
          style
        ]}
        accessible
        accessibilityRole={'image'}
        {...others}
        source={source}
      />
    );
  }

  render() {
    const {style, overlayType} = this.getThemeProps();
  
    if (overlayType) {
      return (
        <View>
          {this.renderImage()}
          <Overlay style={style} type={overlayType}/>
        </View>
      );
    }
    return this.renderImage();
  }
}

const styles = StyleSheet.create({
  rtlFlipped: {
    transform: [{scaleX: -1}]
  },
  coverImage: {
    width: Constants.screenWidth,
    aspectRatio: 16 / 8
  }
});

hoistNonReactStatic(Image, RNImage);
export default Image;
