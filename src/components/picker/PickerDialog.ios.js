import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {BaseComponent} from '../../commons';
import {extractComponentProps} from '../../commons/modifiers';
import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import {Colors} from '../../style';
import {WheelPicker} from '../../nativeComponents';

class PickerDialog extends BaseComponent {
  static displayName = 'IGNORE';
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
        <Text text70 primary onPress={onCancel} accessibilityRole={onCancel ? 'button' : undefined}>
          {_.get(topBarProps, 'cancelLabel', 'Cancel')}
        </Text>
        <Text text70 primary onPress={onDone} accessibilityRole={onDone ? 'button' : undefined}>
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
    const dialogProps = extractComponentProps(Dialog, this.props);
    // TODO: should be taken from dialogProps but there's an issue with "babel-plugin-typescript-to-proptypes" plugin
    const {panDirection} = this.props;
    return (
      <Dialog {...dialogProps} height={250} width="100%" migrate bottom animationConfig={{duration: 300}} panDirection={panDirection}>
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
