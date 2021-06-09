import _pt from "prop-types";
import React, { PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Colors } from "../../style";
import View from "../view";

const gradientImage = require("./assets/GradientOverlay.png");

const OVERLY_TYPES = {
  VERTICAL: 'vertical',
  TOP: 'top',
  BOTTOM: 'bottom',
  SOLID: 'solid'
};

/**
 * @description: Overlay view with types (default, top, bottom, solid)
 * @extends: Image
 * @extendsLink: https://facebook.github.io/react-native/docs/image
 */
class Overlay extends PureComponent {
  static propTypes = {
    /**
       * The overlay color
       */
    color: _pt.string,

    /**
       * Custom overlay content to be rendered on top of the image
       */
    customContent: _pt.element
  };
  static displayName = 'Overlay';
  static overlayTypes = OVERLY_TYPES;

  getStyleByType(type = this.props.type) {
    const {
      color
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
        return [styles.solid, color && {
          backgroundColor: color
        }];

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

  render() {
    const {
      type,
      customContent
    } = this.props;
    const image = type !== OVERLY_TYPES.SOLID ? gradientImage : undefined;

    if (type === OVERLY_TYPES.VERTICAL) {
      return <>
          {this.renderImage([this.getStyleByType(OVERLY_TYPES.TOP), styles.vertical], image)}
          {this.renderImage([this.getStyleByType(OVERLY_TYPES.BOTTOM), styles.vertical], image)}
          {customContent && this.renderCustomContent()}
        </>;
    }

    return <>
        {type && this.renderImage(this.getStyleByType(), image)}
        {customContent && this.renderCustomContent()}
      </>;
  }

}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject,
    width: undefined
  },
  top: {
    bottom: undefined,
    top: 0,
    height: '75%'
  },
  bottom: {
    bottom: 0,
    top: undefined,
    height: '75%',
    transform: [{
      scaleY: -1
    }]
  },
  vertical: {
    height: '40%'
  },
  solid: {
    backgroundColor: Colors.rgba(Colors.dark10, 0.4)
  },
  customContent: { ...StyleSheet.absoluteFillObject
  }
});
export default Overlay;