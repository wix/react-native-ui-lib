import _ from "lodash";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemeManager } from "../../style";
import { BaseComponent } from "../../commons";
import TouchableOpacity from "../touchableOpacity";
import View from "../view";
function getColorStyle(color, inactiveColor, index, currentPage) {
    const compColor = color || ThemeManager.primaryColor;
    return {
        borderColor: index === currentPage ? compColor : inactiveColor || compColor,
        backgroundColor: index === currentPage ? compColor : inactiveColor || "transparent"
    };
}
function getSizeStyle(size, enlargeActive, index, currentPage) {
    const temp = enlargeActive ? (index === currentPage ? size + 2 : size) : size;
    return { width: temp, height: temp, borderRadius: temp / 2 };
}
/**
 * @description: Page indicator, typically used in paged scroll-views
 * @image: https://user-images.githubusercontent.com/33805983/34663655-76698110-f460-11e7-854b-243d27f66fec.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PageControlScreen.js
 */
export default class PageControl extends BaseComponent {
    render() {
        const { numOfPages, currentPage, color, inactiveColor, containerStyle, onPagePress, size, spacing, enlargeActive } = this.props;
        return (<View style={[styles.container, containerStyle]}>
        {_.map([...new Array(numOfPages)], (item, index) => (<TouchableOpacity disabled={_.isUndefined(onPagePress)} onPress={() => onPagePress && onPagePress(index)} key={index} style={[
            styles.pageIndicator,
            { marginRight: spacing / 2, marginLeft: spacing / 2 },
            getColorStyle(color, inactiveColor, index, currentPage),
            getSizeStyle(size, enlargeActive, index, currentPage)
        ]}/>))}
      </View>);
    }
}
PageControl.displayName = "PageControl";
PageControl.defaultProps = {
    size: 10,
    spacing: 4,
    enlargeActive: false
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    pageIndicator: {
        backgroundColor: "transparent",
        borderWidth: 1
    }
});
