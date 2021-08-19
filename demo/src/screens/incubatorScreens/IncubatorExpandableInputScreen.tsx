import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, View, Text, Incubator, Modal, TouchableOpacity} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';

const COLOR_OPTIONS: {[key: string]: string} = {
  red: Colors.red30,
  green: Colors.green30,
  yellow: Colors.yellow30,
  blue: Colors.blue30
};

export default class TextFieldScreen extends Component {
  expandableInputRef = React.createRef();
  expandablePickerRef = React.createRef();

  state = {
    textFieldValue: '',
    selectedColor: 'red'
  };

  updateText = (value: string) => this.setState({textFieldValue: value});

  onDone = () => this.expandableInputRef.current.closeExpandable();

  onPickItem = ({customValue: color}: {customValue: string}) => {
    this.setState({selectedColor: color});
    this.expandablePickerRef.current.closeExpandable();
  };

  renderInputModal = () => {
    const {textFieldValue} = this.state;
    return (
      <>
        <Modal.TopBar title="Edit Input" onDone={this.onDone}/>
        <View bg-white br20 padding-s4>
          <Incubator.TextField
            autoFocus
            preset={null}
            value={textFieldValue}
            multiline
            placeholder="Enter text"
            containerStyle={{minHeight: 300}}
            onChangeText={this.updateText}
          />
        </View>
      </>
    );
  };

  renderColorRow = (colorKey: string) => {
    return (
      <View row centerV height={48}>
        <View width={20} height={20} br100 backgroundColor={COLOR_OPTIONS[colorKey]}/>
        <Text marginL-s2 body style={styles.colorRowText}>
          {colorKey}
        </Text>
      </View>
    );
  };

  renderPickerContent = () => {
    return (
      <View bg-white br20 padding-s3 paddingB-60>
        {_.map(COLOR_OPTIONS, (_color, key) => {
          return (
            <TouchableOpacity customValue={key} onPress={this.onPickItem}>
              {this.renderColorRow(key)}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderExpandableFieldExample() {
    const {textFieldValue} = this.state;
    return (
      <>
        <Text h3 marginB-s4 primary>
          Expandable TextField
        </Text>
        <Incubator.ExpandableInput
          ref={this.expandableInputRef}
          modalProps={{animationType: 'slide'}}
          expandableContent={this.renderInputModal()}
          dialogProps={{bottom: true}}
        >
          <Incubator.TextField placeholder="Expandable input" value={textFieldValue}/>
        </Incubator.ExpandableInput>
      </>
    );
  }

  renderExpandablePickerExample() {
    const {selectedColor} = this.state;
    return (
      <>
        <Text h3 marginB-s4 primary>
          Expandable Picker
        </Text>
        <Incubator.ExpandableInput
          ref={this.expandablePickerRef}
          useDialog
          expandableContent={this.renderPickerContent()}
          dialogProps={{bottom: true}}
        >
          {this.renderColorRow(selectedColor)}
        </Incubator.ExpandableInput>
      </>
    );
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View padding-page>
          <Text h2 marginB-s5>
            ExpandableInput
          </Text>

          {this.renderExpandableFieldExample()}
          {this.renderExpandablePickerExample()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  colorRowText: {
    textTransform: 'capitalize'
  }
});
