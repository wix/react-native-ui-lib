import {isUndefined} from 'lodash';
import React, {PureComponent} from 'react';
import {StyleSheet, Image, ImageProps, ImageSourcePropType} from 'react-native';
import {Colors} from '../../style';
import View from '../view';
import Assets from '../../assets';
import Constants from '../../commons/Constants';

const OVERLY_TYPES = {
  VERTICAL: 'vertical',
  TOP: 'top',
  BOTTOM: 'bottom',
  SOLID: 'solid'
};

export enum OverlayIntensityType {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export type OverlayTypeType = (typeof OVERLY_TYPES)[keyof typeof OVERLY_TYPES];

export type OverlayTypes = Pick<ImageProps, 'borderRadius'> & {
  /**
   * The type of overlay to set on top of the image
   */
  type?: OverlayTypeType;
  /**
   * The intensity of the gradient, default is 'LOW'.
   */
  intensity?: OverlayIntensityType | `${OverlayIntensityType}`;
  /**
   * The overlay color
   */
  color?: string;
  /**
   * Custom overlay content to be rendered on top of the image
   */
  customContent?: React.ReactElement | React.ReactElement[];
};

/**
 * @description: Overlay view with types (default, top, bottom, solid)
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */
class Overlay extends PureComponent<OverlayTypes> {
  static displayName = 'Overlay';
  static overlayTypes = OVERLY_TYPES;
  static intensityTypes = OverlayIntensityType;

  getStyleByType(type = this.props.type) {
    const {color, intensity} = this.props;

    switch (type) {
      case OVERLY_TYPES.TOP:
        return [styles.top, color && {tintColor: color}];
      case OVERLY_TYPES.BOTTOM:
        return [styles.bottom, color && {tintColor: color}];
      case OVERLY_TYPES.SOLID: {
        if (isUndefined(color)) {
          const opacity =
            intensity === OverlayIntensityType.HIGH ? 0.75 : intensity === OverlayIntensityType.MEDIUM ? 0.55 : 0.4;
          return {backgroundColor: Colors.rgba(Colors.grey10, opacity)};
        } else if (color === Colors.white) {
          const opacity =
            intensity === OverlayIntensityType.HIGH ? 0.85 : intensity === OverlayIntensityType.MEDIUM ? 0.7 : 0.45;
          return {backgroundColor: Colors.rgba(Colors.white, opacity)};
        } else {
          return {backgroundColor: color};
        }
      }
      default:
        break;
    }
  }

  renderCustomContent = () => {
    const {customContent} = this.props;
    return (
      <View pointerEvents="box-none" style={styles.customContent}>
        {customContent}
      </View>
    );
  };

  renderImage = (style: any, source: ImageSourcePropType) => {
    return <Image style={[styles.container, style]} resizeMode={'stretch'} source={source}/>;
  };

  getImageSource = (type?: OverlayTypeType, intensity?: OverlayTypes['intensity']) => {
    if (type !== OVERLY_TYPES.SOLID) {
      if (intensity === OverlayIntensityType.MEDIUM) {
        return Assets.internal.images.gradientOverlayMedium;
      } else if (intensity === OverlayIntensityType.HIGH) {
        return Assets.internal.images.gradientOverlayHigh;
      } else {
        return Assets.internal.images.gradientOverlayLow;
      }
    }
  };

  render() {
    const {type, intensity, customContent, borderRadius} = this.props;
    const imageSource = this.getImageSource(type, intensity);

    return (
      <View flex style={{overflow: 'hidden', borderRadius}}>
        {type === OVERLY_TYPES.VERTICAL ? (
          <>
            {this.renderImage([this.getStyleByType(OVERLY_TYPES.TOP), styles.vertical], imageSource)}
            {this.renderImage([this.getStyleByType(OVERLY_TYPES.BOTTOM), styles.vertical], imageSource)}
            {customContent && this.renderCustomContent()}
          </>
        ) : (
          <>
            {type && this.renderImage(this.getStyleByType(), imageSource)}
            {customContent && this.renderCustomContent()}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: Constants.isWeb ? '100%' : undefined
  },
  top: {
    bottom: undefined,
    height: '75%'
  },
  bottom: {
    top: undefined,
    transform: [{scaleY: -1}],
    height: '75%'
  },
  vertical: {
    height: '40%'
  },
  customContent: {
    ...StyleSheet.absoluteFillObject
  }
});

export default Overlay;
