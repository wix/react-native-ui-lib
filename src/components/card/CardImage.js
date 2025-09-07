import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Image from "../image";
import * as CardPresenter from "./CardPresenter";
import asCardChild from "./asCardChild";
/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 */
class CardImage extends PureComponent {
  static displayName = 'Card.Image';
  constructor(props) {
    super(props);
    this.styles = createStyles(props);
  }
  render() {
    const {
      style,
      context: {
        borderStyle
      },
      /* Note: Destruct position to avoid passing it to Image component cause it crashes Android (position is a saved prop) */
      // eslint-disable-next-line
      position,
      ...others
    } = this.props;
    return <View style={[this.styles.container, borderStyle, style]}>
        <Image style={[this.styles.image]} {...others} />
      </View>;
  }
}
function createStyles({
  width,
  height,
  context: {
    position
  }
}) {
  const {
    top,
    left,
    right,
    bottom
  } = CardPresenter.extractPositionValues(position);
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
export default asCardChild(CardImage);