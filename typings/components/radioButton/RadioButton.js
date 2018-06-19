// TODO: update usage of React Context API to latest (https://reactjs.org/docs/context.html)
import React from "react";
import { StyleSheet } from "react-native";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import TouchableOpacity from "../touchableOpacity";
import { Colors } from "../../style";
import View from "../view";
const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;
/**
 * A Radio Button component, should be wrapped inside a RadioGroup
 */
class RadioButton extends BaseComponent {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onPress = () => {
            const { value } = this.props;
            _.invoke(this.context, "onValueChange", value);
            _.invoke(this.props, "onValueChange", value);
        };
    }
    generateStyles() {
        this.styles = createStyles(this.getThemeProps());
    }
    isSelected() {
        const { value } = this.props;
        const { value: selectedValue } = this.context;
        return value === selectedValue;
    }
    render() {
        const { style } = this.getThemeProps();
        return (<TouchableOpacity activeOpacity={1} style={[this.styles.container, style]} onPress={this.onPress}>
        {this.isSelected() && <View style={this.styles.selectedIndicator}/>}
      </TouchableOpacity>);
    }
}
RadioButton.displayName = "RadioButton";
RadioButton.contextTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func
};
function createStyles({ size = DEFAULT_SIZE, borderRadius = DEFAULT_SIZE / 2, color = DEFAULT_COLOR }) {
    return StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: color,
            width: size,
            height: size,
            borderRadius,
            padding: 3
        },
        selectedIndicator: {
            backgroundColor: color,
            flex: 1,
            borderRadius
        }
    });
}
export default RadioButton;
