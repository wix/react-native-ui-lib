import React, {PropTypes} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {Colors, Typography} from '../../style';
import {Constants} from '../../helpers';

const PickerModal = ({visible, onCancel, onDone, showDone, children}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <View style={[styles.modalHeaderPart, styles.modalHeaderLeft]}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.headerText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.modalHeaderPart, styles.modalHeaderMiddle]}>
            <Text style={[styles.headerText, {fontWeight: '500'}]}>Modal Header</Text>
          </View>
          <View style={[styles.modalHeaderPart, styles.modalHeaderRight]}>
            {showDone &&
            <TouchableOpacity onPress={onDone}>
              <Text style={styles.headerText}>Done</Text>
            </TouchableOpacity>}
          </View>
        </View>
      </View>
      <View style={styles.modalBody}>
        {children}
      </View>
    </Modal>
  );
};

PickerModal.propTypes = {
  onCancel: PropTypes.func,
  onDone: PropTypes.func,
  showDone: PropTypes.bool,
  ...Modal.propTypes,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  modalHeader: {
    height: 32 + Constants.statusBarHeight,
    flexDirection: 'row',
  },
  modalHeaderPart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  modalHeaderLeft: {
    paddingLeft: 20,
  },
  modalHeaderMiddle: {
    justifyContent: 'center',
  },
  modalHeaderRight: {
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  headerText: {
    ...Typography.text70,
    color: Colors.dark10,
  },
  modalBody: {
    paddingTop: 30,
  },
});

export default PickerModal;
