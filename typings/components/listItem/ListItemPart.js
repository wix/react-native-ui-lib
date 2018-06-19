import React from "react";
import { View, StyleSheet } from "react-native";
import { BaseComponent } from "../../commons";
/**
 * @description: ListItem.Part, a sub ListItem component for layout-ing inside a ListItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/listScreens/BasicListScreen.js
 */
export default class ListItemPart extends BaseComponent {
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    render() {
        const { containerStyle } = this.props;
        return (<View style={[this.styles.container, containerStyle]}>
        {this.props.children}
      </View>);
    }
}
ListItemPart.displayName = "ListItem.Part";
function createStyles({ left, right, middle, column }) {
    let justifyContent;
    if (!column) {
        justifyContent = "space-between";
        if (left) {
            justifyContent = "flex-start";
        }
        if (right) {
            justifyContent = "flex-end";
        }
        if (middle) {
            justifyContent = "space-between";
        }
    }
    else {
        justifyContent = "center";
    }
    return StyleSheet.create({
        container: {
            flexDirection: column ? undefined : "row",
            flex: middle ? 1 : 0,
            justifyContent,
            alignItems: column ? undefined : "center"
        }
    });
}
