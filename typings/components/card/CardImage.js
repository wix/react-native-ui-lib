import React from "react";
import { View, StyleSheet } from "react-native";
import Image from "../image";
import { BorderRadiuses } from "../../style";
import { BaseComponent } from "../../commons";
import * as CardPresenter from "./CardPresenter";
/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
export default class CardImage extends BaseComponent {
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    render() {
        const { imageSource, style, position, borderRadius, testID } = this.props;
        const borderStyle = CardPresenter.generateBorderRadiusStyle({
            position,
            borderRadius
        });
        if (imageSource) {
            return (<View style={[this.styles.container, borderStyle, style]}>
          <Image testID={testID} source={imageSource} style={[this.styles.image, borderStyle]}/>
        </View>);
        }
        return null;
    }
}
CardImage.displayName = "Card.Image";
CardImage.defaultProps = {
    borderRadius: BorderRadiuses.br40
};
function createStyles({ width, height, position }) {
    const { top, left, right, bottom } = CardPresenter.extractPositionValues(position);
    return StyleSheet.create({
        container: {
            height: left || right ? undefined : height,
            width: top || bottom ? undefined : width
        },
        image: {
            width: null,
            height: null,
            flex: 1,
            resizeMode: "cover"
        }
    });
}
