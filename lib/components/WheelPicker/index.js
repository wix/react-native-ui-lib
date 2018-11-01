import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, Picker, StyleSheet, Platform} from 'react-native';
import WheelPickerItem from './WheelPickerItem';

const WheelPickerNative = requireNativeComponent('WheelPicker', null);
const isAndroid = Platform.OS === 'android';

class WheelPicker extends Component {
  static displayName = 'WheelPicker';

  static propTypes = {
    /**
     * the current selected value of the picker
     */
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //eslint-disable-line
    /**
     * callback for when a value change
     */
    onValueChange: PropTypes.func,
    /**
     * pass custom style
     */
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * padd custom style for the picker item
     */
    itemStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]), //eslint-disable-line
  };

  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this); //eslint-disable-line
  }

  state = {
    ...this.stateFromProps(this.props),
  };

  UNSAFE_componentWillReceiveProps(nextProps) { //eslint-disable-line
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
    const orderedItems = [...items.slice(selectedIndex), ...items.slice(0, selectedIndex)];
    return {selectedIndex, items: orderedItems};
  }

  extractLabelsFromItems() {
    return this.state.items.map(item => item.label);
  }

  onValueChange(event) {
    const {onValueChange} = this.props;
    if (onValueChange) {
      const {items} = this.state;
      onValueChange(items[event.nativeEvent.itemIndex].value, event.nativeEvent.itemIndex);
    }
  }

  render() {
    const {style} = this.props;
    return (
      <WheelPickerNative
        data={this.extractLabelsFromItems()}
        onChange={this.onValueChange}
        style={[styles.container, style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
});

WheelPicker.Item = WheelPickerItem;

export default (isAndroid ? WheelPicker : Picker);
