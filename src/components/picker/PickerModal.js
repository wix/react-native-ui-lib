import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import {Modal} from '../../screensComponents';

class PickerModal extends BaseComponent {
  static displayName = 'IGNORE';
  static propTypes = {
    ...Modal.propTypes,
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {visible, enableModalBlur, topBarProps, children} = this.props;
    return (
      <Modal
        animationType={'slide'}
        transparent={(Constants.isIOS && enableModalBlur)}
        enableModalBlur={Constants.isIOS && enableModalBlur}
        visible={visible}
        onRequestClose={topBarProps.onCancel}
      >
        <Modal.TopBar {...topBarProps}/>
        <ScrollView>
          <View style={this.styles.modalBody}>
            {children}
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    modalBody: {
      paddingTop: 30,
    },
  });
}

export default PickerModal;
