import React from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent} from 'react-native';

const WheelPicker = requireNativeComponent('WheelPicker', null);


class WheelPickerView extends React.Component {
  constructor(props) {
    super(props);
    this._onValueChange = this._onValueChange.bind(this);
  }

  state = {
    ...this.stateFromProps(this.props),
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
        label: child.props.label,
      });
    });
    console.warn(selectedIndex, items);
    return {selectedIndex, items};
  }

  extractLabelsFromItems() {
    return this.state.items.map(item => item.label);
  }

  _onValueChange(event) {
    console.warn(event.nativeEvent.itemIndex);
    if (!this.props.onValueChange) {
      return;
    }
    this.props.onValueChange(this.state.items[event.nativeEvent.itemIndex].value, event.nativeEvent.itemIndex);
  }

  render() {
    console.warn(this.state);
    console.warn(this.extractLabelsFromItems());
    return (
      <WheelPicker data={this.extractLabelsFromItems()} selectedIndex={this.state.selectedIndex} onChange={this._onValueChange} style={this.props.style}/>
    );
  }
}

WheelPickerView.propTypes = {
  selectedValue: PropTypes.any,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
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
