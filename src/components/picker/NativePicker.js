import _ from 'lodash';
import React from 'react';
import {BaseComponent} from '../../commons';
import View from '../view';
import TextInput from '../inputs/TextInput';
import WheelPicker from '../../nativeComponents/WheelPicker';
import PickerDialog from './PickerDialog';


class Picker extends BaseComponent {
  state = {
    selectedItem: this.props.value,
    items: this.extractPickerItems(this.props),
  };

  extractPickerItems(props) {
    const {children, useNativePicker} = props;
    if (useNativePicker) {
      const items = React.Children.map(children, child => ({value: child.props.value.value, label: child.props.value.label}));
      return items;
    }
  }

  onCancel = () => {
    this.setState({
      selectedItem: this.props.value,
    });
    this.input.toggleExpandableModal(false);
  };

  onDone = () => {
    const {selectedItem} = this.state;
    _.invoke(this.props, 'onChange', selectedItem);
    this.input.toggleExpandableModal(false);
  };

  onValueChange = (selectedItem) => {
    const {items} = this.state;
    this.setState({
      selectedItem: _.find(items, {value: selectedItem}),
    });
  };

  getLabel() {
    const {value, getLabel} = this.props;
    if (_.isFunction(getLabel)) {
      return getLabel(value);
    }

    const {items} = this.state;
    const selectedItem = _.find(items, {value: _.get(value, 'value')});
    return _.get(selectedItem, 'label');
  }

  appendPropsToChildren = children => React.Children.map(children, child => 
    React.cloneElement(child, {
      value: child.props.value.value,
      label: child.props.value.label,
    }));

  renderPickerDialog = () => {
    const {selectedItem} = this.state;

    return (
      <PickerDialog
        {...this.getThemeProps()}
        onDismiss={this.onCancel}
        onValueChange={this.onValueChange}
        selectedValue={_.get(selectedItem, 'value')}
        onDone={this.onDone}
        onCancel={this.onCancel}
      >
        {this.appendPropsToChildren(this.props.children)}
      </PickerDialog>
    );
  };

  render() {
    const textInputProps = TextInput.extractOwnProps(this.props);
    const label = this.getLabel();
    
    return (
      <View>
        <TextInput
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
