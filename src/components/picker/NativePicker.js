import _ from 'lodash';
import React from 'react';
import {BaseComponent} from '../../commons';
import TextField from '../textField';
import PickerDialog from './PickerDialog';
import TouchableOpacity from '../touchableOpacity';
import {Colors} from '../../style';
import {WheelPicker} from '../../incubator';

class NativePicker extends BaseComponent {
  static displayName = 'IGNORE';
  state = {
    selectedValue: this.props.value,
    items: this.extractPickerItems(this.props),
    showDialog: false
  };

  NUMBER_OF_ROWS = 5;
  ROW_HEIGHT = 44;
  MENU_HEIGHT = 44;
  PICKER_HEIGHT = this.NUMBER_OF_ROWS * this.ROW_HEIGHT + this.MENU_HEIGHT;

  extractPickerItems(props) {
    const {children, useNativePicker} = props;
    if (useNativePicker) {
      const items = React.Children.map(children, child => ({value: child.props.value, label: child.props.label}));
      return items;
    }
  }

  onCancel = () => {
    this.setState({
      selectedValue: this.props.value
    });
    this.toggleDialog(false);
  };

  onDone = () => {
    const {selectedValue, items} = this.state;
    _.invoke(this.props, 'onChange', _.isUndefined(selectedValue) ? _.get(items, '[0].value') : selectedValue);
    this.toggleDialog(false);
  };

  onValueChange = selectedValue => {
    this.setState({
      selectedValue
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

  toggleDialog = showDialog => {
    this.setState({showDialog});
  };

  renderPicker = () => {
    const {selectedValue} = this.state;
    const {children, renderNativePicker, pickerStyle, wheelPickerProps, testID} = this.props;
    if (_.isFunction(renderNativePicker)) {
      return renderNativePicker(this.props);
    }
    return (
      <WheelPicker
        style={pickerStyle}
        selectedValue={selectedValue}
        onChange={this.onValueChange}
        testID={`${testID}.wheelPicker`}
        {...wheelPickerProps}
      >
        {children}
      </WheelPicker>
    );
  };

  renderPickerDialog = () => {
    const {showDialog} = this.state;

    return (
      <PickerDialog
        height={this.PICKER_HEIGHT + this.MENU_HEIGHT}
        {...this.getThemeProps()}
        visible={showDialog}
        panDirection={null}
        onDismiss={this.onCancel}
        onDone={this.onDone}
        onCancel={this.onCancel}
      >
        {this.renderPicker()}
      </PickerDialog>
    );
  };

  render() {
    const {renderPicker, customPickerProps, testID} = this.props;

    if (_.isFunction(renderPicker)) {
      const {selectedValue} = this.state;
      return (
        <>
          <TouchableOpacity {...customPickerProps} link onPress={() => this.toggleDialog(true)} testID={testID}>
            {renderPicker(selectedValue)}
          </TouchableOpacity>
          {this.renderPickerDialog()}
        </>
      );
    }

    const textInputProps = TextField.extractOwnProps(this.props);
    const label = this.getLabel();
    return (
      <TextField
        color={Colors.grey10}
        {...textInputProps}
        value={label}
        expandable
        renderExpandable={this.renderPickerDialog}
        onToggleExpandableModal={this.toggleDialog}
      />
    );
  }
}

// TODO: Doesn't seem to be needed
// NativePicker.Item = WheelPicker.Item;
export default NativePicker;
