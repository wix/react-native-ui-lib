import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {BaseComponent} from '../../commons';
import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import {Colors} from '../../style';
import {WheelPicker} from '../../nativeComponents';

class PickerDialog extends BaseComponent {
  static propTypes = {
    selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func,
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
    topBarProps: PropTypes.object,
    children: PropTypes.array
  };

  state = {};

  renderHeader() {
    const {onDone, onCancel, topBarProps} = this.props;

    return (
      <View style={styles.header}>
        <Text text70 blue30 onPress={onCancel}>
          {_.get(topBarProps, 'cancelLabel', 'Cancel')}
        </Text>
        <Text text70 blue30 onPress={onDone}>
          {_.get(topBarProps, 'doneLabel', 'Done')}
        </Text>
      </View>
    );
  }

  renderPicker() {
    const {children, onValueChange, selectedValue, renderNativePicker} = this.props;
    if (_.isFunction(renderNativePicker)) {
      return renderNativePicker(this.props);
    }
    return (
      <WheelPicker onValueChange={onValueChange} selectedValue={selectedValue}>
        {children}
      </WheelPicker>
    );
  }

  render() {
    const dialogProps = Dialog.extractOwnProps(this.props);
    return (
      <Dialog {...dialogProps} height={250} width="100%" migrate bottom animationConfig={{duration: 300}}>
        <View flex bg-white>
          {this.renderHeader()}
          <View centerV flex>
            {this.renderPicker()}
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
    alignItems: 'center'
  }
});

export default PickerDialog;
