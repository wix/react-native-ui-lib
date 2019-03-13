import PropTypes from 'prop-types';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BorderRadiuses} from '../../style';
import {BaseComponent} from '../../commons';
import Image from '../image';
import * as CardPresenter from './CardPresenter';


/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
export default class CardImage extends BaseComponent {

  static displayName = 'Card.Image';

  static propTypes = {
    /**
     * Image source, either remote source or local. Note: for remote pass object {uri: <remote_uri_string>}
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
     * The Image position which determines the appropriate flex-ness of the image and border radius (for Android)
     * this prop derived automatically from Card parent component if it rendered as a direct child of the
     * Card component
     */
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    /**
     * border radius, basically for Android since overflow doesn't work well
     */
    borderRadius: PropTypes.number
  };

  static defaultProps = {
    borderRadius: BorderRadiuses.br40
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {imageSource, style, position, borderRadius, testID} = this.props;
    const borderStyle = CardPresenter.generateBorderRadiusStyle({position, borderRadius});
    if (imageSource) {
      return (
        <View style={[this.styles.container, borderStyle, style]}>
          <Image testID={testID} source={imageSource} style={[this.styles.image/* , borderStyle */]}/>
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
      overflow: 'hidden'
    },
    image: {
      width: null,
      height: null,
      flex: 1,
      resizeMode: 'cover'
    }
  });
}
