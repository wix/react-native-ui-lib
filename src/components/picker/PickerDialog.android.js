import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {TextPropTypes} from 'deprecated-react-native-prop-types';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import {Colors, BorderRadiuses} from '../../style';

class PickerDialog extends Component {
  static displayName = 'PickerDialog';
  static propTypes = {
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.array,
    /**
     * select label style
     */
    selectLabelStyle: TextPropTypes.style,
    /**
     * cancel label style
     */
    cancelLabelStyle: TextPropTypes.style
  };

  state = {};

  renderHeader() {
    const {topBarProps} = this.props;
    const title = _.get(topBarProps, 'title');
    const titleStyle = _.get(topBarProps, 'titleStyle');

    if (title) {
      return (
        <View style={styles.header}>
          <Text text60 grey10 style={titleStyle}>
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
        <Text text80 primary onPress={onCancel} accessibilityRole={onCancel ? 'button' : undefined} style={cancelLabelStyle}>
          {cancelLabel}
        </Text>
        <Text text80 primary marginL-15 onPress={onDone} accessibilityRole={onDone ? 'button' : undefined} style={selectLabelStyle}>
          {doneLabel}
        </Text>
      </View>
    );
  }

  render() {
    const {panDirection, visible, pickerModalProps} = this.props;
    return (
      <Dialog {...pickerModalProps} visible={visible} height="50%" width="77%" panDirection={panDirection}>
        <View style={styles.dialog}>
          {this.renderHeader()}
          <View flex center paddingH-24>
            {this.props.children}
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
    backgroundColor: Colors.$backgroundDefault,
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
