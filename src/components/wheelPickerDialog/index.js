import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import View from '../view';
import Text from '../text';

import WheelPicker from '../../nativeComponents/WheelPicker';


export default class WheelPickerDialog extends Component {

  render() {
    return (
      <View style={styles.container} bg-white center>
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={styles.title} text60>
            {this.props.title}
          </Text>
        </View>

        <WheelPicker
          onValueChange={this.props.onValueChange}
          selectedValue={this.props.selectedValue}
          style={styles.picker}
        >
          {this.props.items.map((item, idx) => {
            return (
              <WheelPicker.Item key={String(idx) + String(item.value)} value={item.value} label={item.label} />
            );
          })}
        </WheelPicker>
        <View style={styles.bottomButtons}>

          <TouchableOpacity style={styles.cancelButton}>
            <Text text80>
              {'CANCEL'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.okButton}>
            <Text text80>
              {'OK'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

WheelPickerDialog.propTypes = {
  items: PropTypes.array,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  onValueChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    height: 295,
    width: 280,
    flex: 0,
    justifyContent: 'center',
  },
  cancelButton: {
    width: 75,
    height: 36,
  },
  okButton: {
    width: 47,
    height: 36,
  },
  bottomButtons: {
    marginTop: 32,
    flex: 0,
    flexDirection: 'row',
    marginLeft: 142,
  },
  picker: {
    marginTop: 24,
    width: 56,
    height: 148,
  },
  title: {
    marginTop: 21,
    marginLeft: 24,
    color: '#20303C',
  },
});

