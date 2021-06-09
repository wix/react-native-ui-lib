import _pt from "prop-types";
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { LogService } from "../../services"; // import {BaseComponent} from '../../commons';

import Image from "../image";
import * as CardPresenter from "./CardPresenter";
import asCardChild from "./asCardChild"; // TODO: Remove omitting source after imageSource deprecation (since it's required for Image)

/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 */
class CardImage extends PureComponent {
  static propTypes = {
    /**
       * Image width
       */

    /*TODO: Remove after imageSource deprecation - should take it from ImageProps*/
    width: _pt.oneOfType([_pt.number, _pt.string]),

    /**
       * Image height
       */
    height: _pt.oneOfType([_pt.number, _pt.string]),

    /**
       * The Image position which determines the appropriate flex-ness of the image and border radius (for Android)
       * this prop derived automatically from Card parent component if it rendered as a direct child of the
       * Card component
       */
    position: _pt.arrayOf(_pt.string),

    /**
       * border radius, basically for Android since overflow doesn't work well (deprecated)
       */
    borderRadius: _pt.number
  };
  static displayName = 'Card.Image';

  constructor(props) {
    super(props);
    this.styles = createStyles(props);

    if (props.imageSource) {
      LogService.deprecationWarn({
        component: 'CardImage',
        oldProp: 'imageSource',
        newProp: 'source'
      });
    }

    if (props.borderRadius) {
      LogService.deprecationWarn({
        component: 'CardImage',
        oldProp: 'borderRadius'
      });
    }
  }

  render() {
    const {
      imageSource,
      source,
      style,
      testID,
      overlayType,
      context: {
        borderStyle
      }
    } = this.props;
    const finalSource = source || imageSource;

    if (finalSource) {
      return <View style={[this.styles.container, borderStyle, style]}>
          <Image testID={testID} source={finalSource} style={[this.styles.image]} overlayType={overlayType} />
        </View>;
    }

    return null;
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