import {Constants, Typography, Colors} from 'react-native-ui-lib'; //eslint-disable-line
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {DeviceEventEmitter, requireNativeComponent, Picker, StyleSheet, View} from 'react-native';
import WheelPickerItem from './WheelPickerItem';

const WheelPickerNative = requireNativeComponent('WheelPicker', null);

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
     * pass custom label style: fontSize, fontFamily, color<br>
     * Note: label's color will override the text color (hex only)
     */
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * The height of the selected item
     */
    itemHeight: PropTypes.number,
    /**
     * The color of the wheel picker (hex only)
     */
    color: PropTypes.string,
    /**
     * padd custom style for the picker item
     */
    itemStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]), //eslint-disable-line
  };

  static defaultProps = {
    labelStyle: {fontSize: Typography.text70.fontSize, fontFamily: Typography.text70.fontFamily},
    color: Colors.blue30
  };

  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this); //eslint-disable-line
    this.getItems();
    DeviceEventEmitter.addListener('log', this.onLogReceived); // TODO: consider moving to a more generic place (base class?)
  }

  state = {
    items: this.getItems(),
  };

  onLogReceived = (event) => {
    console[event.LogType](event.TAG, event.text);
  }

  onValueChange(event) {
    const index = event.nativeEvent.itemIndex;
    const {onValueChange} = this.props;
    if (onValueChange) {
      const {items} = this.state;
      onValueChange(items[index].value, index);
    }
  }

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

  render() {
    const {style, color, labelStyle, itemHeight} = this.props;
    const {fontSize, fontFamily} = labelStyle;
    let {color: labelColor} = labelStyle;

    return (
      <View collapsable={false} style={styles.container} >
        <WheelPickerNative
          data={this.extractLabelsFromItems()}
          initialIndex={this.getInitialIndex()}
          onChange={this.onValueChange}
          style={[styles.wheelPicker, style]}
          color={color}
          labelColor={labelColor || color}
          fontSize={fontSize}
          itemHeight={itemHeight}
          fontFamily={fontFamily}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  wheelPicker: {
    width: 200,
    height: 200,
  },
});

WheelPicker.Item = WheelPickerItem;

export default (Constants.isAndroid ? WheelPicker : Picker);
