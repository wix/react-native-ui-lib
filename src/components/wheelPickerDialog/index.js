import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text as RNText} from 'react-native';
import Colors from '../../style/colors';
import Typography from '../../style/typography';
import View from '../view';
import Text from '../text';
import {WheelPicker} from '../../nativeComponents';

export default class WheelPickerDialog extends Component {
  static displayName = 'IGNORE';

  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  state = {
    initalSelectedValue: this.props.selectedValue,
    currentValue: false
  };

  onValueChange(value, index) {
    if (this.props.onValueChange) {
      this.props.onValueChange(value, index);
    }
    this.setState({currentValue: value});
  }

  onSelect() {
    if (this.props.onSelect) {
      this.props.onSelect(this.state.currentValue);
    }
  }

  render() {
    const {title, items, onCancel, wheelPickerProps, selectLabelStyle, cancelLabelStyle} = this.props;
    return (
      <View style={styles.container} bg-white center>
        <Text style={styles.title}>{title}</Text>

        <WheelPicker
          onValueChange={this.onValueChange}
          selectedValue={this.state.currentValue || this.state.initalSelectedValue}
          style={styles.picker}
          {...wheelPickerProps}
        >
          {items.map((item, idx) => {
            return <WheelPicker.Item key={String(idx) + String(item.value)} value={item.value} label={item.label}/>;
          })}
        </WheelPicker>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={[styles.cancelButton, cancelLabelStyle]} text80-medium>
              {'CANCEL'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onSelect}>
            <Text style={[styles.okButton, selectLabelStyle]} text80-medium>
              {'OK'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

WheelPickerDialog.propTypes = {
  /**
   * Pass props for the WheelPicker (Android only)
   */
  wheelPickerProps: PropTypes.shape(WheelPicker.propTypes),
  /**
   * select label style
   */
  selectLabelStyle: RNText.propTypes.style,
  /**
   * cancel label style
   */
  cancelLabelStyle: RNText.propTypes.style,
  items: PropTypes.array,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onSelect: PropTypes.func,
  onValueChange: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    height: 295,
    width: 280,
    flex: 0,
    justifyContent: 'center'
  },
  title: {
    marginTop: 21,
    marginLeft: 24,
    ...Typography.text60,
    color: Colors.black,
    alignSelf: 'flex-start'
  },
  picker: {
    marginTop: 24,
    width: 56,
    height: 148
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 8,
    marginLeft: 142
  },
  cancelButton: {
    color: Colors.primary,
    width: 75,
    height: 36,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  okButton: {
    color: Colors.primary,
    width: 47,
    height: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 8
  }
});
