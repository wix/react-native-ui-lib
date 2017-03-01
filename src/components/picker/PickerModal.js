import React, {PropTypes} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {BlurView} from 'react-native-blur';
import {Colors, Typography, ThemeManager} from '../../style';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';

class PickerModal extends BaseComponent {

  static propTypes = {
    onCancel: PropTypes.func,
    onDone: PropTypes.func,
    showDone: PropTypes.bool,
    ...Modal.propTypes,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {visible, onCancel, onDone, showDone, enableModalBlur, children} = this.props;
    const Container = (Constants.isIOS && enableModalBlur) ? BlurView : View;
    return (
      <Modal
        animationType={'slide'}
        transparent={(Constants.isIOS && enableModalBlur)}
        visible={visible}
        onRequestClose={onCancel}
      >
        <Container style={this.styles.container} blurType="light">
          <View style={this.styles.modalHeader}>
            <View style={[this.styles.modalHeaderPart, this.styles.modalHeaderLeft]}>
              <TouchableOpacity onPress={onCancel}>
                <Text style={this.styles.headerActionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={[this.styles.modalHeaderPart, this.styles.modalHeaderMiddle]}>
              <Text style={[this.styles.headerText, {fontWeight: '500'}]}>Modal Header</Text>
            </View>
            <View style={[this.styles.modalHeaderPart, this.styles.modalHeaderRight]}>
              {showDone &&
              <TouchableOpacity onPress={onDone}>
                <Text style={this.styles.headerActionText}>Done</Text>
              </TouchableOpacity>}
            </View>
          </View>
          <View style={this.styles.modalBody}>
            {children}
          </View>
        </Container>
      </Modal>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
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
    headerActionText: {
      ...Typography.text70,
      color: ThemeManager.primaryColor,
    },
    modalBody: {
      paddingTop: 30,
    },
  });
}

export default PickerModal;
