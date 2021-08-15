import _ from 'lodash';
import React, {Component} from 'react';
import {DeviceEventEmitter, requireNativeComponent, StyleSheet, View, ViewStyle, TextStyle} from 'react-native';

import WheelPickerItem from './WheelPickerItem';
import {Constants} from '../../../src/helpers';
import {Typography, Colors} from '../../../src/style';

import {PickerPackage, CommunityPickerPackage} from '../../../src/optionalDependencies';
const Picker = PickerPackage?.Picker || CommunityPickerPackage?.Picker || (() => null);

if (!PickerPackage) {
  if (CommunityPickerPackage) {
    console.warn(`RNUILib Picker will soon migrate to use "@react-native-picker/picker" package instead of '@react-native-community/picker'`);
  } else {
    console.error(`RNUILib Picker requires installing "@react-native-picker/picker" dependency`);
  }
}

const WheelPickerNative = requireNativeComponent('WheelPicker');

type WheelPickerProps = {
   /**
     * the current selected value of the picker
     */
    selectedValue?: string | number; 
    /**
     * callback for when a value change
     */
    onValueChange?: (value: string | number, index: number) => void;
    /**
     * pass custom style
     */
    style?: ViewStyle;
    /**
     * pass custom label style: fontSize, fontFamily, color<br>
     * Note: label's color will override the text color (hex only)
     */
    labelStyle?: TextStyle;
    /**
     * The height of the selected item
     */
    itemHeight?: number;
    /**
     * The color of the wheel picker (hex only)
     */
    color?: string; 
    /**
     * pass custom style for the picker item
     */
    itemStyle?: ViewStyle;
    children?: JSX.Element | JSX.Element[];
}

class WheelPicker extends Component<WheelPickerProps> {
  static displayName = 'WheelPicker';

  static defaultProps = {
    labelStyle: {fontSize: Typography.text70.fontSize, fontFamily: Typography.text70.fontFamily},
    color: Colors.primary
  };

  static Item: typeof WheelPickerItem;
  
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this); //eslint-disable-line
    this.getItems();
    DeviceEventEmitter.addListener('log', this.onLogReceived); // TODO: consider moving to a more generic place (base class?)
  }

  state = {
    items: this.getItems()
  };

  onLogReceived = event => {
    console[event.LogType](event.TAG, event.text);
  };

  onValueChange(event) {
    const index = event.nativeEvent.itemIndex;
    const {onValueChange} = this.props;
    if (onValueChange) {
      const {items} = this.state;
      onValueChange(items[index].value, index);
    }
  }

  getItems() {
    const {children} = this.props;
      
    const items = _.map(React.Children.toArray(children), child => ({
      value: child.props.value,
      label: child.props.label
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
    const {fontSize, fontFamily, color: labelColor} = labelStyle;

    return (
      <View collapsable={false} style={styles.container}>
        <WheelPickerNative
          // @ts-expect-error
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

WheelPicker.Item = WheelPickerItem;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  wheelPicker: {
    width: 200,
    height: 200
  }
});

export default Constants.isAndroid ? WheelPicker : Picker;
