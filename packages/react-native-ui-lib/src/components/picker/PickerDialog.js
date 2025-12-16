import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import {Colors} from '../../style';

class PickerDialog extends Component {
  static displayName = 'PickerDialog';
  static propTypes = {
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


  render() {
    const {panDirection, visible, height, pickerModalProps} = this.props;

    return (
      <Dialog {...pickerModalProps} visible={visible} height={height} width="100%" bottom animationConfig={{duration: 300}} panDirection={panDirection}>
        <View flex bg-$backgroundDefault>
          {this.renderHeader()}
          <View centerV flex>
            {this.props.children}
          </View>
          <View useSafeArea/>
        </View>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 44,
    backgroundColor: Colors.$backgroundNeutralLight,
    paddingHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default PickerDialog;
