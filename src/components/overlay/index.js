import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Colors} from '../../style';
import {PureBaseComponent} from '../../commons';
import View from '../view';


const gradientImage = require('./assets/GradientOverlay.png');
const OVERLY_TYPES = {
  DEFAULT: 'default',
  TOP: 'top',
  BOTTOM: 'bottom',
  SOLID: 'solid'
}
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

  getStyleByType() {
    switch (this.props.type) {
      case OVERLY_TYPES.TOP: 
        return styles.top;
      case OVERLY_TYPES.BOTTOM: 
        return styles.bottom;
      case OVERLY_TYPES.SOLID: 
        return styles.solid
      default:
        break;
    }
  }

  renderImage(typeStyle) {
    const {type, style} = this.props;
    const image = type !== OVERLY_TYPES.SOLID ? gradientImage : undefined;

    return (
      <Image
        style={[style, styles.container, typeStyle, {width: undefined}]}
        resizeMode={'stretch'}
        source={image}
      />
    );
  }

  render() {
    const {style, type} = this.props;
    const width = _.get(style, 'width');
    
    if (type === OVERLY_TYPES.DEFAULT) {
      return (
        <View style={[{width}, styles.container]}>
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
    ...StyleSheet.absoluteFillObject
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
