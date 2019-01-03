import _ from 'lodash';
import React from 'react';
import {BaseComponent} from '../../commons';
import View from '../view';
import TextField from '../inputs/TextField';
import {WheelPicker} from '../../nativeComponents';
import PickerDialog from './PickerDialog';


class Picker extends BaseComponent {
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
    const {selectedValue} = this.state;
    _.invoke(this.props, 'onChange', selectedValue);
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
      <View>
        <TextField
          ref={r => (this.input = r)}
          floatingPlaceholder={false}
          enableErrors={false}
          {...textInputProps}
          value={label}
          expandable
          renderExpandable={this.renderPickerDialog}
        />
      </View>
    );
  }
}

Picker.Item = WheelPicker.Item;
export default Picker;
