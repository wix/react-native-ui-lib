import _ from 'lodash';
import React, {PureComponent} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {
  StyleSheet,
  Image as RNImage,
  ImageProps as RNImageProps,
  ImageBackground,
  ImageBackgroundProps,
  NativeSyntheticEvent,
  ImageErrorEventData
} from 'react-native';
import {
  Constants,
  asBaseComponent,
  ForwardRefInjectedProps,
  BaseComponentInjectedProps,
  MarginModifiers
} from '../../commons/new';
import {RecorderProps} from '../../typings/recorderTypes';
import {getAsset, isSvg, extractImageSource} from '../../utils/imageUtils';
import Overlay, {OverlayTypeType, OverlayIntensityType} from '../overlay';
import SvgImage from '../svgImage';
import View from '../view';
import {Colors} from '../../style';
import {ComponentStatics} from 'src/typings/common';

export type ImageSourceType = string | RNImageProps['source'];

export type ImageProps = Omit<RNImageProps, 'source'> &
  Pick<ImageBackgroundProps, 'imageStyle'> &
  MarginModifiers &
  RecorderProps & {
    /**
     * custom source transform handler for manipulating the image source (great for size control)
     */
    sourceTransformer?: (props: any) => ImageSourceType;
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
     * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.tsx
     */
    overlayType?: OverlayTypeType;
    /**
     * The intensity of the overlay ('LOW' | 'MEDIUM' | 'HIGH'), default is 'LOW'.
     */
    overlayIntensity?: OverlayIntensityType;
    /**
     * Pass a custom color for the overlay
     */
    overlayColor?: string;
    /**
     * Render an overlay with custom content
     */
    customOverlayContent?: React.ReactElement | React.ReactElement[];
    /**
     * Default image source in case of an error
     */
    errorSource?: ImageSourceType;
    /**
     * An imageId that can be used in sourceTransformer logic
     */
    imageId?: string;
    /**
     * Use a container for the Image, this can solve issues on
     * Android when animation needs to be performed on the same
     * view; i.e. animation related crashes on Android.
     */
    useBackgroundContainer?: boolean;
    /**
     * The image width
     */
    width?: string | number;
    /**
     * The image height
     */
    height?: string | number;
    source: ImageSourceType;
  };

type Props = ImageProps & ForwardRefInjectedProps & BaseComponentInjectedProps;

type State = {
  error: boolean;
  prevSource: ImageSourceType;
};

/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 * @notes: please note that for SVG support you need to add both
 * `react-native-svg` and `react-native-svg-transformer`,
 * and also configure them (see `metro.config.js`)
 */
class Image extends PureComponent<Props, State> {
  static displayName = 'Image';

  static defaultProps = {
    assetGroup: 'icons'
  };

  public static overlayTypes = Overlay.overlayTypes;
  public static overlayIntensityType = Overlay.intensityTypes;

  sourceTransformer?: (props: any) => ImageSourceType;

  constructor(props: Props) {
    super(props);

    this.sourceTransformer = this.props.sourceTransformer;

    this.state = {
      error: false,
      prevSource: props.source
    };
  }

  static getDerivedStateFromProps(nextProps: Partial<Props>, prevState: State) {
    if (nextProps.source !== prevState.prevSource) {
      return {
        error: false,
        prevSource: nextProps.source
      };
    }
    return null;
  }

  isGif() {
    if (Constants.isAndroid) {
      const {source} = this.props;
      const url = _.get(source, 'uri');
      const isGif = /(http(s?):)([/|.|\w|\s|-])*\.gif/.test(url ?? '');
      return isGif;
    }
  }

  shouldUseImageBackground() {
    const {overlayType, customOverlayContent} = this.props;

    return !!overlayType || this.isGif() || !_.isUndefined(customOverlayContent);
  }

  getVerifiedSource(source?: ImageSourceType) {
    const sourceUri = _.get(source, 'uri');
    if (sourceUri === null || sourceUri === '') {
      // @ts-ignore
      return {...source, uri: undefined};
    }
    return extractImageSource(source);
  }

  getImageSource() {
    const {assetName, assetGroup, source} = this.props;

    if (!_.isUndefined(assetName)) {
      return getAsset(assetName, assetGroup);
    }
    if (this.sourceTransformer) {
      return this.sourceTransformer(this.props);
    }

    return this.getVerifiedSource(source);
  }

  getImageStyle = () => {
    const {imageStyle, borderRadius} = this.props;
    if (this.shouldUseImageBackground()) {
      return borderRadius ? [{borderRadius}, imageStyle] : imageStyle;
    }
  };

  onError = (event: NativeSyntheticEvent<ImageErrorEventData>) => {
    if (event.nativeEvent.error) {
      this.setState({error: true});
      this.props.onError?.(event);
    }
  };

  renderSvg = () => {
    const {source, recorderTag, ...others} = this.props;
    return <SvgImage data={source} fsTagName={recorderTag} {...others}/>;
  };

  renderImageWithContainer = () => {
    const {style, cover, modifiers, width, height} = this.props;
    const {margins} = modifiers;

    return (
      <View style={[{width, height}, margins, style, styles.errorImageContainer, cover && styles.coverImage]}>
        {this.renderImage(true)}
      </View>
    );
  };

  renderImage = (useImageInsideContainer: boolean) => {
    const {error} = this.state;
    const source = error ? this.getVerifiedSource(this.props.errorSource) : this.getImageSource();

    const {
      tintColor,
      style,
      width,
      height,
      supportRTL,
      cover,
      aspectRatio,
      overlayType,
      overlayIntensity,
      overlayColor,
      customOverlayContent,
      modifiers,
      recorderTag,
      borderRadius,
      source: _source,
      ...others
    } = this.props;
    const shouldFlipRTL = supportRTL && Constants.isRTL;
    const ImageView = this.shouldUseImageBackground() ? ImageBackground : RNImage;
    const {margins} = modifiers;

    return (
      // @ts-ignore
      <ImageView
        style={[
          // @ts-ignore
          {width: _source?.width, height: _source?.height},
          tintColor && {tintColor},
          shouldFlipRTL && styles.rtlFlipped,
          width && {width},
          height && {height},
          borderRadius && {borderRadius},
          cover && styles.coverImage,
          this.isGif() && styles.gifImage,
          aspectRatio && {aspectRatio},
          !useImageInsideContainer && margins,
          useImageInsideContainer && styles.containImage,
          style,
          useImageInsideContainer && styles.shrink
        ]}
        accessible={false}
        accessibilityRole={'image'}
        fsTagName={recorderTag}
        {...others}
        // NOTE: imageStyle prop is only relevant for when rendering ImageBackground component
        imageStyle={this.getImageStyle()}
        onError={this.onError}
        source={source}
      >
        {(overlayType || customOverlayContent) && (
          <Overlay
            type={overlayType}
            intensity={overlayIntensity}
            color={overlayColor}
            customContent={customOverlayContent}
            borderRadius={borderRadius}
          />
        )}
      </ImageView>
    );
  };

  renderRegularImage() {
    const {error} = this.state;
    const {useBackgroundContainer} = this.props;
    if (error || useBackgroundContainer) {
      return this.renderImageWithContainer();
    } else {
      return this.renderImage(false);
    }
  }

  render() {
    const {source} = this.props;
    if (isSvg(source)) {
      return this.renderSvg();
    } else {
      return this.renderRegularImage();
    }
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
  },
  errorImageContainer: {
    backgroundColor: Colors.grey70,
    zIndex: -1
  },
  shrink: {
    flexShrink: 1
  },
  containImage: {
    resizeMode: 'contain'
  }
});

hoistNonReactStatic(Image, RNImage);
export {Image};
export default asBaseComponent<ImageProps, ComponentStatics<typeof Image & typeof RNImage>>(Image, {
  modifiersOptions: {margins: true}
});
