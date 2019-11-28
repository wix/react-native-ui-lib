import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Colors} from '../../style';
import {PureBaseComponent} from '../../commons';
import View from '../view';

const OVERLY_TYPES = {
  VERTICAL: 'vertical',
  TOP: 'top',
  BOTTOM: 'bottom',
  SOLID: 'solid'
};
const gradientImage = require('./assets/GradientOverlay.png');

/**
 * @description: Overlay view with types (default, top, bottom, solid)
 * @extends: Image
 * @extendsLink: https://facebook.github.io/react-native/docs/image
 */
export default class Overlay extends PureBaseComponent {
  static displayName = 'Overlay';

  static propTypes = {
    /**
     * The type of overlay to set on top of the image
     */
    type: PropTypes.oneOf(_.values(OVERLY_TYPES))
  };

  static overlayTypes = OVERLY_TYPES;

  constructor(props) {
    super(props);
    this.flatStyle = StyleSheet.flatten(props.style);
  }

  getStyleByType() {
    switch (this.props.type) {
      case OVERLY_TYPES.TOP:
        return styles.top;
      case OVERLY_TYPES.BOTTOM:
        return styles.bottom;
      case OVERLY_TYPES.SOLID:
        return styles.solid;
      default:
        break;
    }
  }

  static getAttributeStyles(flatStyle, attNames) {
    let attributes;

    if (flatStyle) {
      attributes = _.chain(flatStyle)
        .pickBy((value, key) => _.includes(attNames, key))
        .value();
    }

    return attributes;
  }

  getStyle = typeStyle => {
    const {type} = this.props;
    const marginStyle =
      type !== OVERLY_TYPES.VERTICAL || !typeStyle ? Overlay.getAttributeStyles(this.flatStyle, 'margin') : undefined;
    const absoluteStyle = Overlay.getAttributeStyles(this.flatStyle, [
      'position',
      'bottom',
      'top',
      'left',
      'right',
      'start',
      'end',
      'height',
      'width'
    ]);

    if (absoluteStyle.position === 'absolute') {
      const marginTop = type === OVERLY_TYPES.TOP ? -marginStyle.margin - absoluteStyle.bottom : undefined;

      return {...absoluteStyle, ...typeStyle, ...marginStyle, marginTop};
    } else {
      return {...styles.container, ...typeStyle, ...marginStyle};
    }
  };

  renderImage(typeStyle) {
    const {type} = this.props;
    const image = type !== OVERLY_TYPES.SOLID ? gradientImage : undefined;
    const style = this.getStyle(typeStyle);

    return <Image style={[style]} resizeMode={'stretch'} source={image}/>;
  }

  render() {
    const {type} = this.props;

    if (type === OVERLY_TYPES.VERTICAL) {
      const style = this.getStyle();

      return (
        <View style={[styles.container, style]}>
          {this.renderImage(styles.top)}
          {this.renderImage(styles.bottom)}
        </View>
      );
    }

    return this.renderImage(this.getStyleByType());
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: undefined
  },
  top: {
    bottom: undefined,
    top: 0,
    height: '50%'
  },
  bottom: {
    bottom: 0,
    top: undefined,
    height: '50%',
    transform: [{scaleY: -1}]
  },
  solid: {
    backgroundColor: Colors.rgba(Colors.dark10, 0.4)
  }
});
