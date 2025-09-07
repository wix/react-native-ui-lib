import _isUndefined from "lodash/isUndefined";
import React, { PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Colors } from "../../style";
import View from "../view";
import Assets from "../../assets";
const OVERLY_TYPES = {
  VERTICAL: 'vertical',
  TOP: 'top',
  BOTTOM: 'bottom',
  SOLID: 'solid'
};
export let OverlayIntensityType = /*#__PURE__*/function (OverlayIntensityType) {
  OverlayIntensityType["LOW"] = "low";
  OverlayIntensityType["MEDIUM"] = "medium";
  OverlayIntensityType["HIGH"] = "high";
  return OverlayIntensityType;
}({});
/**
 * @description: Overlay view with types (default, top, bottom, solid)
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 */
class Overlay extends PureComponent {
  static displayName = 'Overlay';
  static overlayTypes = OVERLY_TYPES;
  static intensityTypes = OverlayIntensityType;
  getStyleByType(type = this.props.type) {
    const {
      color,
      intensity
    } = this.props;
    switch (type) {
      case OVERLY_TYPES.TOP:
        return [styles.top, color && {
          tintColor: color
        }];
      case OVERLY_TYPES.BOTTOM:
        return [styles.bottom, color && {
          tintColor: color
        }];
      case OVERLY_TYPES.SOLID:
        {
          if (_isUndefined(color)) {
            const opacity = intensity === OverlayIntensityType.HIGH ? 0.75 : intensity === OverlayIntensityType.MEDIUM ? 0.55 : 0.4;
            return {
              backgroundColor: Colors.rgba(Colors.grey10, opacity)
            };
          } else if (color === Colors.white) {
            const opacity = intensity === OverlayIntensityType.HIGH ? 0.85 : intensity === OverlayIntensityType.MEDIUM ? 0.7 : 0.45;
            return {
              backgroundColor: Colors.rgba(Colors.white, opacity)
            };
          } else {
            return {
              backgroundColor: color
            };
          }
        }
      default:
        break;
    }
  }
  renderCustomContent = () => {
    const {
      customContent
    } = this.props;
    return <View pointerEvents="box-none" style={styles.customContent}>
        {customContent}
      </View>;
  };
  renderImage = (style, source) => {
    return <Image style={[styles.container, style]} resizeMode={'stretch'} source={source} />;
  };
  getImageSource = (type, intensity) => {
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
    const {
      type,
      intensity,
      customContent,
      borderRadius
    } = this.props;
    const imageSource = this.getImageSource(type, intensity);
    return <View flex style={{
      overflow: 'hidden',
      borderRadius
    }}>
        {type === OVERLY_TYPES.VERTICAL ? <>
            {this.renderImage([this.getStyleByType(OVERLY_TYPES.TOP), styles.vertical], imageSource)}
            {this.renderImage([this.getStyleByType(OVERLY_TYPES.BOTTOM), styles.vertical], imageSource)}
            {customContent && this.renderCustomContent()}
          </> : <>
            {type && this.renderImage(this.getStyleByType(), imageSource)}
            {customContent && this.renderCustomContent()}
          </>}
      </View>;
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: undefined
  },
  top: {
    bottom: undefined,
    height: '75%'
  },
  bottom: {
    top: undefined,
    transform: [{
      scaleY: -1
    }],
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