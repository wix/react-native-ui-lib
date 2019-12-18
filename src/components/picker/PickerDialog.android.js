import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {BaseComponent} from '../../commons';
import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import {Colors, BorderRadiuses} from '../../style';
import {WheelPicker} from '../../nativeComponents';

class PickerDialog extends BaseComponent {
  static propTypes = {
    selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func,
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.array,
    /**
     * Pass props for the WheelPicker (Android only)
     */
    wheelPickerProps: PropTypes.shape(WheelPicker.propTypes),
    /**
     * select label style
     */
    selectLabelStyle: Text.propTypes.style,
    /**
     * cancel label style
     */
    cancelLabelStyle: Text.propTypes.style
  };

  state = {};

  renderHeader() {
    const {topBarProps} = this.props;
    const title = _.get(topBarProps, 'title');
    const titleStyle = _.get(topBarProps, 'titleStyle');

    if (title) {
      return (
        <View style={styles.header}>
          <Text text60 dark10 style={titleStyle}>
            {title}
          </Text>
        </View>
      );
    }
  }

  renderFooter() {
    const {onDone, onCancel, topBarProps, selectLabelStyle, cancelLabelStyle} = this.props;
    const doneLabel = _.get(topBarProps, 'doneLabel', 'OK');
    const cancelLabel = _.get(topBarProps, 'cancelLabel', 'CANCEL');

    return (
      <View style={styles.footer}>
        <Text text80 blue30 onPress={onCancel} style={cancelLabelStyle}>
          {cancelLabel}
        </Text>
        <Text text80 blue30 marginL-15 onPress={onDone} style={selectLabelStyle}>
          {doneLabel}
        </Text>
      </View>
    );
  }

  renderPicker() {
    const {children, onValueChange, selectedValue, renderNativePicker, wheelPickerProps} = this.props;
    if (_.isFunction(renderNativePicker)) {
      return renderNativePicker(this.props);
    }
    return (
      <WheelPicker onValueChange={onValueChange} selectedValue={selectedValue} {...wheelPickerProps}>
        {children}
      </WheelPicker>
    );
  }

  render() {
    const dialogProps = Dialog.extractOwnProps(this.props);
    return (
      <Dialog {...dialogProps} migrate height="50%" width="77%">
        <View style={styles.dialog}>
          {this.renderHeader()}
          <View flex center paddingH-24>
            {this.renderPicker()}
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
    paddingHorizontal: 24
  },
  header: {
    paddingTop: 21
  },
  footer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default PickerDialog;
