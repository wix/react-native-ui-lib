import _ from 'lodash';
import React, {PureComponent} from 'react';
//@ts-ignore
import hoistNonReactStatic from 'hoist-non-react-statics';
import {Image as RNImage, ImageProps as RNImageProps, StyleSheet, ImageBackground, ImageSourcePropType} from 'react-native';
import Constants from '../../helpers/Constants';
import {asBaseComponent, ForwardRefInjectedProps} from '../../commons/new';
// @ts-ignore
import Assets from '../../assets';
import Overlay, {OverlayTypeType} from '../overlay';

type ImageProps = RNImageProps & {
  /**
   * custom source transform handler for manipulating the image source (great for size control)
   */
  sourceTransformer?: (props: any) => ImageSourcePropType;
  /**
   * if provided image source will be driven from asset name
   */
  assetName?: string;
  /**
   * the asset group, default is "icons"
   */
  assetGroup?: string;
  /**
   * the asset tint
   */
  tintColor?: string;
  /**
   * whether the image should flip horizontally on RTL locals
   */
  supportRTL?: boolean;
  /**
   * Show image as a cover, full width, image (according to aspect ratio, default: 16:8)
   */
  cover?: boolean;
  /**
   * The aspect ratio for the image
   */
  aspectRatio?: number;
  /**
   * The type of overly to place on top of the image. Note: the image MUST have proper size, see examples in:
   * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.js
   */
  overlayType?: OverlayTypeType;
  /**
   * Pass a custom color for the overlay
   */
  overlayColor?: string;
  /**
   * Render an overlay with custom content
   */
  customOverlayContent?: JSX.Element;
};

type Props = ImageProps & ForwardRefInjectedProps;

/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendslink: https://facebook.github.io/react-native/docs/image.html
 */
class Image extends PureComponent<Props> {
  static displayName = 'Image';

  static defaultProps = {
    assetGroup: 'icons'
  };

  public static overlayTypes = Overlay.overlayTypes;

  sourceTransformer?: (props: any) => ImageSourcePropType;

  constructor(props: Props) {
    super(props);

    this.sourceTransformer = this.props.sourceTransformer;
  }

  isGif() {
    if (Constants.isAndroid) {
      const {source} = this.props;
      const url = _.get(source, 'uri');
      const isGif = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url);
      return isGif;
    }
  }

  shouldUseImageBackground() {
    const {overlayType, customOverlayContent} = this.props;

    return !!overlayType || this.isGif() || !_.isUndefined(customOverlayContent);
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
      // @ts-ignore
      return {...source, uri: undefined};
    }

    return source;
  }

  render() {
    const source = this.getImageSource();
    const {
      tintColor,
      style,
      supportRTL,
      cover,
      aspectRatio,
      overlayType,
      overlayColor,
      customOverlayContent,
      ...others
    } = this.props;
    const shouldFlipRTL = supportRTL && Constants.isRTL;
    const ImageView = this.shouldUseImageBackground() ? ImageBackground : RNImage;

    return (
      // @ts-ignore
      <ImageView
        style={[
          {tintColor},
          shouldFlipRTL && styles.rtlFlipped,
          cover && styles.coverImage,
          this.isGif() && styles.gifImage,
          aspectRatio && {aspectRatio},
          style
        ]}
        accessible={false}
        accessibilityRole={'image'}
        {...others}
        source={source}
      >
        {(overlayType || customOverlayContent) && (
          <Overlay type={overlayType} color={overlayColor} customContent={customOverlayContent}/>
        )}
      </ImageView>
    );
  }
}

const styles = StyleSheet.create({
  rtlFlipped: {
    transform: [{scaleX: -1}]
  },
  coverImage: {
    width: '100%',
    aspectRatio: 16 / 8
  },
  gifImage: {
    overflow: 'hidden'
  }
});

hoistNonReactStatic(Image, RNImage);
export {Image};
export default asBaseComponent<ImageProps>(Image);
