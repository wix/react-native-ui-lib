import React from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
import { BaseComponent } from "../commons";
import { ThemeManager } from "../style";
import TouchableOpacity from "../components/touchableOpacity";
/** THIS IS DEPRECATED */
/**
 * BaseListItem component
 */
export default class BaseListItem extends BaseComponent {
    renderLeft() {
        return null;
    }
    renderMiddle() {
        return (<View>
        {this.renderMiddleTop()}
        {this.renderMiddleBottom()}
      </View>);
    }
    renderMiddleTop() {
        return null;
    }
    renderMiddleBottom() {
        return null;
    }
    renderRight() {
        return null;
    }
    generateStyles(overrides) {
        this.styles = createStyles(overrides);
    }
    render() {
        const { onPress } = this.props;
        const Container = onPress ? TouchableOpacity : View;
        const animationProps = this.extractAnimationProps();
        return (<Container style={this.styles.container} onPress={onPress}>
        <Animatable.View style={this.styles.innerContainer} {...animationProps}>
          <View style={this.styles.leftContainer}>{this.renderLeft()}</View>
          <View style={this.styles.middleContainer}>{this.renderMiddle()}</View>
          <View style={this.styles.rightContainer}>{this.renderRight()}</View>
        </Animatable.View>
      </Container>);
    }
}
BaseListItem.displayName = "IGNORE";
function createStyles(overrides) {
    return StyleSheet.create(_.merge({
        container: {},
        innerContainer: {
            flexDirection: "row",
            flex: 1
        },
        leftContainer: {},
        middleContainer: {
            flex: 1,
            justifyContent: "center",
            paddingRight: 19,
            borderBottomWidth: 1,
            borderColor: ThemeManager.dividerColor
        },
        middleTopContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3
        },
        middleBottomContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        rightContainer: {}
    }, overrides));
}
