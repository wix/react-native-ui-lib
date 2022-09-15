import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {TextPropTypes} from 'deprecated-react-native-prop-types';
import Colors from '../../style/colors';
import Typography from '../../style/typography';
import View from '../view';
import Text from '../text';
import {WheelPicker} from '../../nativeComponents';
import {PickerPackage, CommunityPickerPackage} from '../../../src/optionalDependencies';

export default class WheelPickerDialog extends Component {
  static displayName = 'IGNORE';

  static propTypes = {
    /**
     * Array of items as objects {value, label}
     */
    items: PropTypes.array,
    /**
     * The selected value
     */
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * The component's title
     */
    title: PropTypes.string,
    /**
     * Pass props for the WheelPicker (Android only)
     */
    wheelPickerProps: PropTypes.shape(WheelPicker.propTypes),
    /**
    * select label style
    */
    selectLabelStyle: TextPropTypes.style,
    /**
    * cancel label style
    */
    cancelLabelStyle: TextPropTypes.style,
    /**
     * onCancel callback invoked when 'Cancel' button is pressed
     */
    onCancel: PropTypes.func,
    /**
     * onSelect callback invoked when 'Ok' button is pressed
     */
    onSelect: PropTypes.func,
    /**
     * onValueChange callback invoked when the value in the wheel changes
     */
    onValueChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      initialSelectedValue: props.selectedValue,
      currentValue: false
    };

    if (!PickerPackage) {
      if (CommunityPickerPackage) {
        // eslint-disable-next-line max-len
        console.warn(`RNUILib Picker will soon migrate to use "@react-native-picker/picker" package instead of '@react-native-community/picker'`);
      } else {
        console.error(`RNUILib Picker requires installing "@react-native-picker/picker" dependency`);
      }
    }
  }

  onValueChange = (value, index) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(value, index);
    }
    this.setState({currentValue: value});
  }

  onSelect = () => {
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
          selectedValue={this.state.currentValue || this.state.initialSelectedValue}
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

const styles = StyleSheet.create({
  container: {
    height: 295,
    width: 280,
    flex: 0,
    alignSelf: 'center',
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
