import React from "react";
import { StyleSheet } from "react-native";
import _ from "lodash";
import View from "../view";
import Text from "../text";
import { Colors, Typography, Spacings } from "../../style";
import { BaseComponent } from "../../commons";
import { Constants } from "../../helpers";
import TouchableOpacity from "../touchableOpacity";
/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.js
 */
export default class TabBarItem extends BaseComponent {
    constructor(props) {
        super(props);
        this.onLayout = event => {
            _.invoke(this.props, "onLayout", event);
            // HACK: for indicator width in TabBar
            this.setState({ fontStyle: {} });
        };
        this.state = {
            fontStyle: this.getFontStyle(props)
        };
    }
    // HACK: for indicator width in TabBar
    getFontStyle(props) {
        return props.selectedLabelStyle || this.styles.labelSelected;
    }
    generateStyles() {
        this.styles = createStyles(this.props);
    }
    render() {
        const { label, labelStyle, maxLines, selected, selectedLabelStyle, showDivider, width, onPress, testID } = this.props;
        return (<TouchableOpacity activeOpacity={1} onPress={onPress} style={width ? { width } : this.styles.container} testID={testID} onLayout={this.onLayout}>
        <View flex center style={[
            showDivider && this.styles.divider,
            { paddingHorizontal: Spacings.s4 }
        ]}>
          {!_.isEmpty(label) && (<Text numberOfLines={maxLines} style={[
            this.styles.label,
            labelStyle,
            selected && this.styles.labelSelected,
            selected && selectedLabelStyle,
            this.state.fontStyle
        ]}>
              {label}
            </Text>)}
          {this.props.children}
        </View>
      </TouchableOpacity>);
    }
}
TabBarItem.displayName = "TabBar.Item";
TabBarItem.defaultProps = {
    maxLines: 1
};
function createStyles() {
    return StyleSheet.create({
        container: {
            flex: 1
        },
        label: {
            color: Colors.dark10,
            ...Typography.text90
        },
        labelSelected: {
            color: Colors.blue30,
            fontWeight: Constants.isIOS ? "600" : "700"
        },
        divider: {
            borderRightWidth: 1,
            borderRightColor: Colors.dark70,
            marginVertical: 14
        }
    });
}
