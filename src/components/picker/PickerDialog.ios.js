import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import {Colors} from '../../style';
import WheelPicker from '../../nativeComponents/WheelPicker';

class PickerDialog extends Component {
  static propTypes = {
    selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func,
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.array,
  };

  state = {};

  renderHeader() {
    const {onDone, onCancel} = this.props;

    return (
      <View style={styles.header}>
        <Text text70 blue30 onPress={onCancel}>
          Cancel
        </Text>
        <Text text70 blue30 onPress={onDone}>
          Done
        </Text>
      </View>
    );
  }

  render() {
    const {children, onValueChange, selectedValue} = this.props;
    const dialogProps = Dialog.extractOwnProps(this.props);
    return (
      <Dialog {...dialogProps} visible height={250} width="100%" bottom animationConfig={{duration: 300}}>
        <View flex bg-white>
          {this.renderHeader()}
          <View centerV flex>
            <WheelPicker onValueChange={onValueChange} selectedValue={selectedValue}>
              {children}
            </WheelPicker>
          </View>
        </View>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 44,
    backgroundColor: Colors.dark80,
    paddingHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PickerDialog;
