import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';
import * as CardPresenter from './CardPresenter';

/**
 * CardImage belongs inside the Card component
 */
export default class CardImage extends BaseComponent {

  static displayName = 'CardImage';

  static propTypes = {
    /**
     * Image source, either remote source or local
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Image width
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Image height
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Image position to determine the right flex-ness of the image and border radius (for Android)
     * this prop derived automatically from Card parent component
     */
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    testID: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {imageSource, style, position, ...others} = this.props;
    const borderStyle = CardPresenter.generateBorderRadiusStyle({position});
    if (imageSource) {
      return (
        <View style={[this.styles.container, borderStyle]}>
          <Image source={imageSource} style={[this.styles.image, borderStyle, style]} {...others} />
        </View>
      );
    }

    return null;
  }
}

function createStyles({width, height, position}) {
  const {top, left, right, bottom} = CardPresenter.extractPositionValues(position);
  return StyleSheet.create({
    container: {
      height: (left || right) ? undefined : height,
      width: (top || bottom) ? undefined : width,
    },
    image: {
      width: null,
      height: null,
      flex: 1,
      resizeMode: 'cover',
    },
  });
}
