import _ from 'lodash';
import React, {PureComponent} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {
  StyleSheet,
  Image as RNImage,
  ImageProps as RNImageProps,
  ImageBackground,
  ImageSourcePropType,
  NativeSyntheticEvent,
  ImageErrorEventData
} from 'react-native';
import {Constants, asBaseComponent, ForwardRefInjectedProps, BaseComponentInjectedProps, MarginModifiers} from '../../commons/new';
import {getAsset, isSvg} from '../../utils/imageUtils';
import Overlay, {OverlayTypeType, OverlayIntensityType} from '../overlay';
import SvgImage from '../svgImage';
import View from '../view';
import {Colors} from '../../style';


export type ImageProps = RNImageProps & MarginModifiers & {
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
  customOverlayContent?: JSX.Element;
  /**
   * Default image source in case of an error
   */
  errorSource?: ImageSourcePropType;
  /**
   * An imageId that can be used in sourceTransformer logic
   */
  imageId?: string;
};

type Props = ImageProps & ForwardRefInjectedProps & BaseComponentInjectedProps;

type State = {
  error: boolean,
  prevSource: ImageSourcePropType
}

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

  sourceTransformer?: (props: any) => ImageSourcePropType;

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
      const isGif = /(http(s?):)([/|.|\w|\s|-])*\.gif/.test(url);
      return isGif;
    }
  }

  shouldUseImageBackground() {
    const {overlayType, customOverlayContent} = this.props;

    return !!overlayType || this.isGif() || !_.isUndefined(customOverlayContent);
  }

  getVerifiedSource(source?: ImageSourcePropType) {
    if (_.get(source, 'uri') === null || _.get(source, 'uri') === '') {
      // @ts-ignore
      return {...source, uri: undefined};
    }
    return source;
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

  onError = (event: NativeSyntheticEvent<ImageErrorEventData>) => {
    if (event.nativeEvent.error) {
      this.setState({error: true});
      this.props.onError?.(event);
    }
  };

  renderSvg = () => {
    const {source, ...others} = this.props;
    return <SvgImage data={source} {...others}/>;
  };

  renderErrorImage = () => {
    const {
      style,
      cover,
      modifiers
    } = this.props;
    const {margins} = modifiers;

    return (
      <View
        style={[
          margins,
          style,
          styles.errorImageContainer,
          cover && styles.coverImage
        ]}
      >
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
      supportRTL,
      cover,
      aspectRatio,
      overlayType,
      overlayIntensity,
      overlayColor,
      customOverlayContent,
      modifiers,
      ...others
    } = this.props;
    const shouldFlipRTL = supportRTL && Constants.isRTL;
    const ImageView = this.shouldUseImageBackground() ? ImageBackground : RNImage;
    const {margins} = modifiers;
    const resizeMode = useImageInsideContainer ? 'contain' : undefined;

    return (
      // @ts-ignore
      <ImageView
        style={[
          tintColor && {tintColor},
          shouldFlipRTL && styles.rtlFlipped,
          cover && styles.coverImage,
          this.isGif() && styles.gifImage,
          aspectRatio && {aspectRatio},
          !useImageInsideContainer && margins,
          style,
          useImageInsideContainer && styles.shrink
        ]}
        resizeMode={resizeMode}
        accessible={false}
        accessibilityRole={'image'}
        {...others}
        onError={this.onError}
        source={source}
      >
        {(overlayType || customOverlayContent) && (
          <Overlay
            type={overlayType}
            intensity={overlayIntensity}
            color={overlayColor}
            customContent={customOverlayContent}
          />
        )}
      </ImageView>
    );
  };

  renderRegularImage() {
    const {error} = this.state;
    if (error) {
      return this.renderErrorImage();
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
  }
});

hoistNonReactStatic(Image, RNImage);
export {Image};
export default asBaseComponent<ImageProps, typeof Image>(Image);
