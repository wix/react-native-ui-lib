import React from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, Picker} from 'react-native';
import { Constants} from '../helpers';

const WheelPicker = requireNativeComponent('WheelPicker', null);


class WheelPickerView extends React.Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);  //eslint-disable-line
  }

  state = {
    ...this.stateFromProps(this.props),
  }

  UNSAFE_componentWillReceiveProps(nextProps) {  //eslint-disable-line
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
        label: child.props.label,
      });
    });

    return {selectedIndex, items};
  }

  extractLabelsFromItems() {
    return this.state.items.map(item => item.label);
  }

  onValueChange(event) {
    if (!this.props.onValueChange) {
      return;
    }
    this.props.onValueChange(this.state.items[event.nativeEvent.itemIndex].value, event.nativeEvent.itemIndex);
  }

  render() {
    if (Constants.isIOS) {
      return (
        <Picker
          selectedValue={this.props.selectedValue}
          onValueChange={this.props.onValueChange} style={this.props.style}
        >
          {this.props.children}
        </Picker>
      );
    }
    return (
      <WheelPicker
        data={this.extractLabelsFromItems()}
        selectedIndex={this.state.selectedIndex}
        onChange={this.onValueChange}
        style={this.props.style}
      />
    );
  }
}

WheelPickerView.propTypes = {
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onValueChange: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  children: PropTypes.any,
};

WheelPickerView.Item = class extends React.Component { // eslint-disable-line react/no-multi-comp
  static propTypes = {
    value: PropTypes.any, // string or integer basically
    label: PropTypes.string,
  };

  render() {
    // These items don't get rendered directly.
    return null;
  }
};
export default WheelPickerView;
