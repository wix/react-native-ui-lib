import _isUndefined from "lodash/isUndefined";
import _get from "lodash/get";
import React, { PureComponent } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { StyleSheet, Image as RNImage, ImageBackground } from 'react-native';
import { Constants, asBaseComponent } from "../../commons/new";
import { getAsset, isSvg } from "../../utils/imageUtils";
import Overlay from "../overlay";
import SvgImage from "../svgImage";
import View from "../view";
import { Colors } from "../../style";
/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 * @notes: please note that for SVG support you need to add both
 * `react-native-svg` and `react-native-svg-transformer`,
 * and also configure them (see `metro.config.js`)
 */
class Image extends PureComponent {
  static displayName = 'Image';
  static defaultProps = {
    assetGroup: 'icons'
  };
  static overlayTypes = Overlay.overlayTypes;
  static overlayIntensityType = Overlay.intensityTypes;
  constructor(props) {
    super(props);
    this.sourceTransformer = this.props.sourceTransformer;
    this.state = {
      error: false,
      prevSource: props.source
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
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
      const {
        source
      } = this.props;
      const url = _get(source, 'uri');
      const isGif = /(http(s?):)([/|.|\w|\s|-])*\.gif/.test(url ?? '');
      return isGif;
    }
  }
  shouldUseImageBackground() {
    const {
      overlayType,
      customOverlayContent
    } = this.props;
    return !!overlayType || this.isGif() || !_isUndefined(customOverlayContent);
  }
  getVerifiedSource(source) {
    if (_get(source, 'uri') === null || _get(source, 'uri') === '') {
      // @ts-ignore
      return {
        ...source,
        uri: undefined
      };
    }
    return source;
  }
  getImageSource() {
    const {
      assetName,
      assetGroup,
      source
    } = this.props;
    if (!_isUndefined(assetName)) {
      return getAsset(assetName, assetGroup);
    }
    if (this.sourceTransformer) {
      return this.sourceTransformer(this.props);
    }
    return this.getVerifiedSource(source);
  }
  getImageStyle = () => {
    const {
      imageStyle,
      borderRadius
    } = this.props;
    if (this.shouldUseImageBackground()) {
      return borderRadius ? [{
        borderRadius
      }, imageStyle] : imageStyle;
    }
  };
  onError = event => {
    if (event.nativeEvent.error) {
      this.setState({
        error: true
      });
      this.props.onError?.(event);
    }
  };
  renderSvg = () => {
    const {
      source,
      recorderTag,
      ...others
    } = this.props;
    return <SvgImage data={source} fsTagName={recorderTag} {...others} />;
  };
  renderImageWithContainer = () => {
    const {
      style,
      cover,
      modifiers,
      width,
      height
    } = this.props;
    const {
      margins
    } = modifiers;
    return <View style={[{
      width,
      height
    }, margins, style, styles.errorImageContainer, cover && styles.coverImage]}>
        {this.renderImage(true)}
      </View>;
  };
  renderImage = useImageInsideContainer => {
    const {
      error
    } = this.state;
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
      ...others
    } = this.props;
    const shouldFlipRTL = supportRTL && Constants.isRTL;
    const ImageView = this.shouldUseImageBackground() ? ImageBackground : RNImage;
    const {
      margins
    } = modifiers;
    return (
      // @ts-ignore
      <ImageView style={[tintColor && {
        tintColor
      }, shouldFlipRTL && styles.rtlFlipped, width && {
        width
      }, height && {
        height
      }, borderRadius && {
        borderRadius
      }, cover && styles.coverImage, this.isGif() && styles.gifImage, aspectRatio && {
        aspectRatio
      }, !useImageInsideContainer && margins, useImageInsideContainer && styles.containImage, style, useImageInsideContainer && styles.shrink]} accessible={false} accessibilityRole={'image'} fsTagName={recorderTag} {...others}
      // NOTE: imageStyle prop is only relevant for when rendering ImageBackground component
      imageStyle={this.getImageStyle()} onError={this.onError} source={source}>
        {(overlayType || customOverlayContent) && <Overlay type={overlayType} intensity={overlayIntensity} color={overlayColor} customContent={customOverlayContent} borderRadius={borderRadius} />}
      </ImageView>
    );
  };
  renderRegularImage() {
    const {
      error
    } = this.state;
    const {
      useBackgroundContainer
    } = this.props;
    if (error || useBackgroundContainer) {
      return this.renderImageWithContainer();
    } else {
      return this.renderImage(false);
    }
  }
  render() {
    const {
      source
    } = this.props;
    if (isSvg(source)) {
      return this.renderSvg();
    } else {
      return this.renderRegularImage();
    }
  }
}
const styles = StyleSheet.create({
  rtlFlipped: {
    transform: [{
      scaleX: -1
    }]
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
export { Image };
export default asBaseComponent(Image, {
  modifiersOptions: {
    margins: true
  }
});