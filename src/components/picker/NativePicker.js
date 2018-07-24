import React from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import View from '../view';
import Image from '../image';
import TextInput from '../inputs/TextInput';
import WheelPicker from '../../nativeComponents/WheelPicker';
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
    const {rightIconSource} = this.props;
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
          editable={false}
          renderExpandable={this.renderPickerDialog}
        />
        {rightIconSource && <Image pointerEvents="none" style={styles.rightIcon} source={rightIconSource} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightIcon: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
});

Picker.Item = WheelPicker.Item;
export default Picker;
