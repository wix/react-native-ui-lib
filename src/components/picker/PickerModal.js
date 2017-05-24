import React, {PropTypes} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import {Modal} from '../../screensComponents';

class PickerModal extends BaseComponent {

  static propTypes = {
    onCancel: PropTypes.func,
    onDone: PropTypes.func,
    ...Modal.propTypes,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {visible, onCancel, onDone, enableModalBlur, children} = this.props;
    return (
      <Modal
        animationType={'slide'}
        transparent={(Constants.isIOS && enableModalBlur)}
        enableModalBlur={enableModalBlur}
        visible={visible}
        onRequestClose={onCancel}
      >
        <Modal.TopBar onDone={onDone} onCancel={onCancel}/>
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
