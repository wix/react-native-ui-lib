import React, {PropTypes} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {BlurView} from 'react-native-blur';
import {Colors, Typography, ThemeManager} from '../../style';
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
    const Container = (Constants.isIOS && enableModalBlur) ? BlurView : View;
    return (
      <Modal
        animationType={'slide'}
        transparent={(Constants.isIOS && enableModalBlur)}
        visible={visible}
        onRequestClose={onCancel}
      >
        <Container style={this.styles.container} blurType="light">
          <Modal.TopBar onDone={onDone} onCancel={onCancel}/>
          <ScrollView>
            <View style={this.styles.modalBody}>
              {children}
            </View>
          </ScrollView>
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
