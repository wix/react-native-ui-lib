import React from "react";
import { View, StyleSheet } from "react-native";
import { BaseComponent } from "../../commons";
/**
 * @description: Card.Item, a sub Card component for layout-ing inside a card
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
export default class CardItem extends BaseComponent {
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    render() {
        const { style } = this.props;
        return (<View style={[this.styles.container, style]}>{this.props.children}</View>);
    }
}
CardItem.displayName = "Card.Item";
CardItem.defaultProps = {
    row: true
};
function createStyles({ column }) {
    return StyleSheet.create({
        container: {
            flexDirection: column ? "column" : "row"
        }
    });
}
