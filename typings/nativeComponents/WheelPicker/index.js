import React, { Component } from "react";
import { requireNativeComponent, Picker, StyleSheet } from "react-native";
import { Constants } from "../../helpers";
import WheelPickerItem from "./WheelPickerItem";
const WheelPickerNative = requireNativeComponent("WheelPicker", null);
class WheelPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.stateFromProps(this.props)
        };
        this.onValueChange = this.onValueChange.bind(this); //eslint-disable-line
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState(this.stateFromProps(nextProps));
    }
    // Translate PickerIOS prop and children into stuff that RCTPickerIOS understands.
    stateFromProps(props) {
        let selectedIndex = 0;
        const items = [];
        React.Children.toArray(props.children).forEach((child, index) => {
            if (child.props.value === props.selectedValue) {
                selectedIndex = index;
            }
            items.push({
                value: child.props.value,
                label: child.props.label
            });
        });
        const orderedItems = [
            ...items.slice(selectedIndex),
            ...items.slice(0, selectedIndex)
        ];
        return { selectedIndex, items: orderedItems };
    }
    extractLabelsFromItems() {
        return this.state.items.map(item => item.label);
    }
    onValueChange(event) {
        const { onValueChange } = this.props;
        if (onValueChange) {
            const { items } = this.state;
            onValueChange(items[event.nativeEvent.itemIndex].value, event.nativeEvent.itemIndex);
        }
    }
    render() {
        const { style } = this.props;
        return (<WheelPickerNative data={this.extractLabelsFromItems()} onChange={this.onValueChange} style={[styles.container, style]}/>);
    }
}
WheelPicker.displayName = "WheelPicker";
const styles = StyleSheet.create({
    container: {
        height: 200
    }
});
WheelPicker.Item = WheelPickerItem;
export default (Constants.isAndroid ? WheelPicker : Picker);
