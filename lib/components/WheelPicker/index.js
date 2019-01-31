import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {requireNativeComponent, Picker, StyleSheet, Platform, View} from 'react-native';
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

    this.getItems();
  }

  state = {
    items: this.getItems(),
  };

  getItems() {
    const items = _.map(React.Children.toArray(this.props.children), child => ({
      value: child.props.value,
      label: child.props.label,
    }));
    return items;
  }

  getInitialIndex() {
    const {items} = this.state;
    const {selectedValue} = this.props;
    return _.findIndex(items, {value: selectedValue});
  }

  extractLabelsFromItems() {
    return _.map(this.state.items, 'label');
  }

  onValueChange(event) {
    const index = event.nativeEvent.itemIndex;
    const {onValueChange} = this.props;
    if (onValueChange) {
      const {items} = this.state;
      onValueChange(items[index].value, index);
    }
  }

  render() {
    const {style} = this.props;
    return (
      <View collapsable={false}>
        <WheelPickerNative
          data={this.extractLabelsFromItems()}
          initialIndex={this.getInitialIndex()}
          onChange={this.onValueChange}
          style={[styles.container, style]}
        />
      </View>
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
