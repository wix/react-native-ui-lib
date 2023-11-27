import _ from 'lodash';
import React, { CSSProperties, PureComponent } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {
  StyleSheet,
  Image as RNImage,
  NativeSyntheticEvent,
  ImageErrorEventData
} from 'react-native';
// @ts-expect-error No typings available for 'deprecated-react-native-prop-types'
import { ImagePropTypes } from 'deprecated-react-native-prop-types';
import {
  Constants,
  asBaseComponent,
  ForwardRefInjectedProps,
  BaseComponentInjectedProps
} from '../../commons/new';
import { getAsset, isSvg } from '../../utils/imageUtils';
import Overlay from '../overlay';
import SvgImage from '../svgImage';
import View from '../view';
import { Colors } from '../../style';
import { ImageProps } from './index';


type Props = ImageProps & ForwardRefInjectedProps & BaseComponentInjectedProps;

type State = {
  error: boolean;
  prevSource: ImagePropTypes.source;
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

  sourceTransformer?: (props: any) => ImagePropTypes.source;

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
      const { source } = this.props;
      const url = _.get(source, 'uri');
      const isGif = /(http(s?):)([/|.|\w|\s|-])*\.gif/.test(url ?? '');
      return isGif;
    }
  }

  shouldUseImageBackground() {
    const { overlayType, customOverlayContent } = this.props;

    return !!overlayType || this.isGif() || !_.isUndefined(customOverlayContent);
  }

  getVerifiedSource(source?: ImagePropTypes.source) {
    if (_.get(source, 'uri') === null || _.get(source, 'uri') === '') {
      // @ts-ignore
      return { ...source, uri: undefined };
    }
    return source;
  }

  getImageSource() {
    const { assetName, assetGroup, source } = this.props;

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
      this.setState({ error: true });
      this.props.onError?.(event);
    }
  };

  renderSvg = () => {
    const { source, recorderTag, ...others } = this.props;
    return <SvgImage data={source} fsTagName={recorderTag} {...others} />;
  };

  renderImageWithContainer = () => {
    const { style, cover, modifiers, width, height } = this.props;
    const { margins } = modifiers;

    return (
      <View style={[{ width, height }, margins, style, styles.errorImageContainer, cover && styles.coverImage]}>
        {this.renderImage(true)}
      </View>
    );
  };

  renderImage = (useImageInsideContainer: boolean) => {
    const { error } = this.state;
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
      ...others
    } = this.props;
    const shouldFlipRTL = supportRTL && Constants.isRTL;
    const { margins } = modifiers;
    const imageViewStyle = [
      tintColor && { tintColor },
      shouldFlipRTL && styles.rtlFlipped,
      width && { width },
      height && { height },
      cover && styles.coverImage,
      this.isGif() && styles.gifImage,
      aspectRatio && { aspectRatio },
      !useImageInsideContainer && margins,
      useImageInsideContainer && styles.containImage,
      style,
      useImageInsideContainer && styles.shrink
    ];

    const finalSource = source.uri ?? source;

    return (
      // @ts-expect-error
      <View style={imageViewStyle}>
        {/* @ts-expect-error */}
        <img
          {...others}
          src={finalSource}
          style={StyleSheet.flatten([imageViewStyle, styles.containImage]) as CSSProperties}
          alt={''}
        />
        {(overlayType || customOverlayContent) &&
          <Overlay
            type={overlayType}
            intensity={overlayIntensity}
            color={overlayColor}
            customContent={customOverlayContent}
          />
        }
      </View>
    );
  };

  renderRegularImage() {
    const { error } = this.state;
    const { useBackgroundContainer } = this.props;
    if (error || useBackgroundContainer) {
      return this.renderImageWithContainer();
    } else {
      return this.renderImage(false);
    }
  }

  render() {
    const { source } = this.props;
    if (isSvg(source)) {
      return this.renderSvg();
    } else {
      return this.renderRegularImage();
    }
  }
}

const styles = StyleSheet.create({
  rtlFlipped: {
    transform: [{ scaleX: -1 }]
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
    objectFit: 'cover',
    height: '100%'
  }
});

hoistNonReactStatic(Image, RNImage);
export { Image };
export default asBaseComponent<ImageProps, typeof Image & typeof RNImage>(Image, { modifiersOptions: { margins: true } });
