import _ from 'lodash';
import React from 'react';
import {BaseComponent} from '../../commons';
import TextField from '../inputs/TextField';
import {WheelPicker} from '../../nativeComponents';
import PickerDialog from './PickerDialog';

class NativePicker extends BaseComponent {
  state = {
    selectedValue: this.props.value,
    items: this.extractPickerItems(this.props),
  };

  extractPickerItems(props) {
    const {children, useNativePicker} = props;
    if (useNativePicker) {
      const items = React.Children.map(children, child => ({value: child.props.value, label: child.props.label}));
      return items;
    }
  }

  onCancel = () => {
    this.setState({
      selectedValue: this.props.value,
    });
    this.input.toggleExpandableModal(false);
  };

  onDone = () => {
    const {selectedValue, items} = this.state;
    _.invoke(this.props, 'onChange', selectedValue || items[0].value);
    this.input.toggleExpandableModal(false);
  };

  onValueChange = (selectedValue) => {
    this.setState({
      selectedValue,
    });
  };

  getLabel() {
    const {value, getLabel} = this.props;
    if (_.isFunction(getLabel)) {
      return getLabel(value);
    }

    const {items} = this.state;
    const selectedItem = _.find(items, {value});
    return _.get(selectedItem, 'label');
  }

  renderPickerDialog = () => {
    const {selectedValue} = this.state;
    
    return (
      <PickerDialog
        {...this.getThemeProps()}
        disablePan
        onDismiss={this.onCancel}
        onValueChange={this.onValueChange}
        selectedValue={selectedValue}
        onDone={this.onDone}
        onCancel={this.onCancel}
      />
    );
  };

  render() {
    const textInputProps = TextField.extractOwnProps(this.props);
    const label = this.getLabel();
    
    return (
      <TextField
        {...textInputProps}
        ref={r => (this.input = r)}
        enableErrors={false}
        value={label}
        expandable
        renderExpandable={this.renderPickerDialog}
      />
    );
  }
}

NativePicker.Item = WheelPicker.Item;
export default NativePicker;
