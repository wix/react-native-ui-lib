import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {BaseComponent} from '../../commons';
import {extractComponentProps} from '../../commons/modifiers';
import Dialog from '../dialog';
import View from '../view';
import Text from '../text';
import {Colors, BorderRadiuses} from '../../style';

class PickerDialog extends BaseComponent {
  static displayName = 'IGNORE';
  static propTypes = {
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.array,
    /**
     * select label style
     */
    selectLabelStyle: RNText.propTypes.style,
    /**
     * cancel label style
     */
    cancelLabelStyle: RNText.propTypes.style
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
    const dialogProps = extractComponentProps(Dialog, this.props);
    // TODO: should be taken from dialogProps but there's an issue with "babel-plugin-typescript-to-proptypes" plugin
    const {panDirection} = this.props;
    return (
      <Dialog {...dialogProps} height="50%" width="77%" panDirection={panDirection}>
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
