import React, {PureComponent} from 'react';
import {View, StyleSheet, ImageSourcePropType, ViewProps} from 'react-native';
import {BorderRadiuses} from '../../style';
// import {BaseComponent} from '../../commons';
import Image, {ImageProps} from '../image';
import * as CardPresenter from './CardPresenter';

export type CardImagePropTypes = ViewProps &
  ImageProps & {
    /**
     * Image source, either remote source or local. Note: for remote pass object {uri: <remote_uri_string>}
     */
    imageSource?: ImageSourcePropType;
    /**
     * Image width
     */
    width?: number | string;
    /**
     * Image height
     */
    height?: number | string;
    /**
     * The Image position which determines the appropriate flex-ness of the image and border radius (for Android)
     * this prop derived automatically from Card parent component if it rendered as a direct child of the
     * Card component
     */
    position?: string[];
    /**
     * border radius, basically for Android since overflow doesn't work well
     */
    borderRadius?: number;
  };

/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
class CardImage extends PureComponent<CardImagePropTypes> {
  styles: any;
  static displayName = 'Card.Image';

  static defaultProps = {
    borderRadius: BorderRadiuses.br40,
  };

  constructor(props: CardImagePropTypes) {
    super(props);
    this.styles = createStyles(this.props);
  }

  render() {
    const {
      imageSource,
      style,
      position,
      borderRadius,
      testID,
      overlayType,
    } = this.props;
    const borderStyle = CardPresenter.generateBorderRadiusStyle({
      position,
      borderRadius,
    });
    if (imageSource) {
      return (
        <View style={[this.styles.container, borderStyle, style]}>
          <Image
            testID={testID}
            source={imageSource}
            style={[this.styles.image /* , borderStyle */]}
            overlayType={overlayType}
          />
        </View>
      );
    }
    return null;
  }
}

function createStyles({width, height, position}: CardImagePropTypes) {
  const {top, left, right, bottom} = CardPresenter.extractPositionValues(
    position
  );
  return StyleSheet.create({
    container: {
      height: left || right ? undefined : height,
      width: top || bottom ? undefined : width,
      overflow: 'hidden',
    },
    image: {
      width: undefined,
      height: undefined,
      flex: 1,
      resizeMode: 'cover',
    },
  });
}

export default CardImage;
