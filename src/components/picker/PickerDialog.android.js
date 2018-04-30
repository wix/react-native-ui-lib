import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {BaseComponent} from '../../commons';
import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import {Colors, BorderRadiuses} from '../../style';
import WheelPicker from '../../nativeComponents/WheelPicker';

class PickerDialog extends BaseComponent {
  static propTypes = {
    selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func,
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.array,
  };

  state = {};

  renderHeader() {
    const {topBarProps} = this.props;
    const title = _.get(topBarProps, 'title');

    if (title) {
      return (
        <View style={styles.header}>
          <Text text60 dark10>{title}</Text>
        </View>
      );
    }
  }

  renderFooter() {
    const {onDone, onCancel, topBarProps} = this.props;
    const doneLabel = _.get(topBarProps, 'doneLabel', 'OK');
    const cancelLabel = _.get(topBarProps, 'cancelLabel', 'CANCEL');

    return (
      <View style={styles.footer}>
        <Text text80 blue30 onPress={onCancel}>
          {cancelLabel}
        </Text>
        <Text text80 blue30 marginL-15 onPress={onDone}>
          {doneLabel}
        </Text>
      </View>
    );
  }

  render() {
    const {children, onValueChange, selectedValue} = this.props;
    const dialogProps = Dialog.extractOwnProps(this.props);
    return (
      <Dialog {...dialogProps} visible height="50%" width="77%">
        <View style={styles.dialog}>
          {this.renderHeader()}
          <View flex centerV paddingH-24>
            <WheelPicker onValueChange={onValueChange} selectedValue={selectedValue}>
              {children}
            </WheelPicker>
          </View>
          {this.renderFooter()}
        </View>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    borderRadius: BorderRadiuses.br10,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 21,
  },
  footer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default PickerDialog;
