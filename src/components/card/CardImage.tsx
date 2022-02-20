import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Image, {ImageProps} from '../image';
import * as CardPresenter from './CardPresenter';
import asCardChild, {asCardChildProps} from './asCardChild';

export type CardImageProps = ImageProps & {
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
};

type Props = CardImageProps & asCardChildProps;

/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 */
class CardImage extends PureComponent<Props> {
  static displayName = 'Card.Image';

  styles: any;

  constructor(props: Props) {
    super(props);

    this.styles = createStyles(props);
  }

  render() {
    const {
      style,
      context: {borderStyle},
      /* Note: Destruct position to avoid passing it to Image component cause it crashes Android (position is a saved prop) */
      // eslint-disable-next-line
      position,
      ...others
    } = this.props;

    return (
      <View style={[this.styles.container, borderStyle, style]}>
        <Image style={[this.styles.image]} {...others}/>
      </View>
    );
  }
}

function createStyles({width, height, context: {position}}: Props) {
  const {top, left, right, bottom} = CardPresenter.extractPositionValues(position);
  return StyleSheet.create({
    container: {
      height: left || right ? undefined : height,
      width: top || bottom ? undefined : width,
      overflow: 'hidden'
    },
    image: {
      width: undefined,
      height: undefined,
      flex: 1,
      resizeMode: 'cover'
    }
  });
}

export default asCardChild<CardImageProps>(CardImage);
