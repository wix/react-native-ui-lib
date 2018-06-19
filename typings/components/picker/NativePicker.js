import React from "react";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import TextInput from "../inputs/TextInput";
import WheelPicker from "../../nativeComponents/WheelPicker";
import PickerDialog from "./PickerDialog";
class Picker extends BaseComponent {
    constructor() {
        super(...arguments);
        this.state = {
            selectedValue: this.props.value,
            items: this.extractPickerItems(this.props)
        };
        this.onCancel = () => {
            this.setState({
                selectedValue: this.props.value
            });
            this.input.toggleExpandableModal(false);
        };
        this.onDone = () => {
            const { selectedValue } = this.state;
            _.invoke(this.props, "onChange", selectedValue);
            this.input.toggleExpandableModal(false);
        };
        this.onValueChange = selectedValue => {
            this.setState({
                selectedValue
            });
        };
        this.renderPickerDialog = () => {
            const { selectedValue } = this.state;
            return (<PickerDialog {...this.getThemeProps()} onDismiss={this.onCancel} onValueChange={this.onValueChange} selectedValue={selectedValue} onDone={this.onDone} onCancel={this.onCancel}/>);
        };
    }
    extractPickerItems(props) {
        const { children, useNativePicker } = props;
        if (useNativePicker) {
            const items = React.Children.map(children, child => ({
                value: child.props.value,
                label: child.props.label
            }));
            return items;
        }
    }
    getLabel() {
        const { value, getLabel } = this.props;
        if (_.isFunction(getLabel)) {
            return getLabel(value);
        }
        const { items } = this.state;
        const selectedItem = _.find(items, { value });
        return _.get(selectedItem, "label");
    }
    render() {
        const textInputProps = TextInput.extractOwnProps(this.props);
        const label = this.getLabel();
        return (<TextInput ref={r => (this.input = r)} floatingPlaceholder={false} enableErrors={false} {...textInputProps} value={label} expandable editable={false} renderExpandable={this.renderPickerDialog}/>);
    }
}
Picker.Item = WheelPicker.Item;
export default Picker;
