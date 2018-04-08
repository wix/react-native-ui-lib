import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import View from '../view';
import Text from '../text';
import Colors from '../../style/colors';
import Typography from '../../style/typography';

import WheelPicker from '../../nativeComponents/WheelPicker';


export default class WheelPickerDialog extends Component {
  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  state = {
    currentValue: this.props.selectedValue,

  }

  UNSAFE_componentWillReceiveProps(nextProps) {  //eslint-disable-line
    this.setState({currentValue: this.props.selectedValue});
  }

  onValueChange(value, index) {
    if (this.props.onValueChange) {
      this.props.onValueChange(value, index);
    }
    this.setState({currentValue: value });
  }

  onSelect() {
    if (this.props.onSelect) {
      this.props.onSelect(this.state.currentValue);
    }
  }

  render() {
    return (
      <View style={styles.container} bg-white center>
        <View style={styles.titleContainer}>
          <Text style={styles.title} >
            {this.props.title}
          </Text>
        </View>

        <WheelPicker
          onValueChange={this.onValueChange}
          selectedValue={this.state.currentValue}
          style={styles.picker}
        >
          {this.props.items.map((item, idx) => {
            return (
              <WheelPicker.Item key={String(idx) + String(item.value)} value={item.value} label={item.label} />
            );
          })}
        </WheelPicker>
        <View style={styles.bottomButtonsContainer}>

          <TouchableOpacity onPress={this.props.onCancel} >
            <Text style={styles.cancelButton} text80-medium>
              {'CANCEL'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onSelect} >
            <Text style={styles.okButton} text80-medium>
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
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  onValueChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    height: 295,
    width: 280,
    flex: 0,
    justifyContent: 'center',
  },
  titleContainer: {
    alignSelf: 'flex-start',
  },
  title: {
    marginTop: 21,
    marginLeft: 24,
    ...Typography.text60,
    color: Colors.black,
  },
  picker: {
    marginTop: 24,
    width: 56,
    height: 148,
  },
  bottomButtonsContainer: {
    alignItems: 'center',
    marginTop: 32,
    flex: 0,
    marginBottom: 8,
    flexDirection: 'row',
    marginLeft: 142,
  },
  cancelButton: {
    color: Colors.blue30,
    width: 75,
    height: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  okButton: {
    color: Colors.blue30,
    width: 47,
    height: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 8,
  },

});

