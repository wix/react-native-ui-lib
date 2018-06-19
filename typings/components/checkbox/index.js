import React from "react";
import { Image, StyleSheet } from "react-native";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import TouchableOpacity from "../touchableOpacity";
import Assets from "../../assets";
import { Colors } from "../../style";
const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;
const DEFAULT_ICON_COLOR = Colors.white;
/**
 * Checkbox component for toggling boolean value related to some context
 */
class Checkbox extends BaseComponent {
    constructor() {
        super(...arguments);
        this.onPress = () => {
            _.invoke(this.props, "onValueChange", !this.props.value);
        };
    }
    generateStyles() {
        this.styles = createStyles(this.getThemeProps());
    }
    render() {
        const { value, selectedIcon, style } = this.getThemeProps();
        return (<TouchableOpacity activeOpacity={1} style={[
            this.styles.container,
            value && this.styles.containerSelected,
            style
        ]} onPress={this.onPress}>
        {value && (<Image style={this.styles.selectedIcon} source={selectedIcon || Assets.icons.checkSmall}/>)}
      </TouchableOpacity>);
    }
}
Checkbox.displayName = "Checkbox";
function createStyles({ color = DEFAULT_COLOR, iconColor = DEFAULT_ICON_COLOR, size = DEFAULT_SIZE, borderRadius }) {
    return StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderRadius: borderRadius || size / 2,
            borderWidth: 1,
            borderColor: color,
            alignItems: "center",
            justifyContent: "center"
        },
        containerSelected: {
            backgroundColor: color
        },
        selectedIcon: {
            tintColor: iconColor
        }
    });
}
export default Checkbox;
