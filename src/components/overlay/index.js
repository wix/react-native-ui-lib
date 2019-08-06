import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {PureBaseComponent} from '../../commons';
import {Colors} from '../../style';
import View from '../view';


const gradientImage = require('./assets/GradientOverlay.png');
const OVERLY_TYPES = {
  DEFAULT: 'default',
  TOP: 'top',
  BOTTOM: 'bottom',
  SOLID: 'solid'
}
/**
 * @description: Overlay view with types
 */
export default class Overlay extends PureBaseComponent {
  static displayName = 'Overlay';

  static propTypes = {
    type: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(OVERLY_TYPES)), PropTypes.string])
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
        style={[style, styles.image, typeStyle]}
        resizeMode={'stretch'}
        source={image}
      />
    );
  }

  render() {
    const {style, type} = this.props;
    
    if (type === OVERLY_TYPES.DEFAULT) {
      return (
        <View style={[style, styles.container]}>
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
  image: {
    ...StyleSheet.absoluteFillObject, 
    height: '50%'
  },
  top: {
    bottom: undefined,
    top: 0
  },
  bottom: {
    transform: [{scaleY: -1}],
    bottom: 0,
    top: undefined
  },
  solid: {
    backgroundColor: Colors.rgba(Colors.dark10, 0.4), 
    height: '100%'
  }
});
