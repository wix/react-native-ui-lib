import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, View, Text, Incubator, TouchableOpacity, ExpandableOverlayMethods, PickerMethods} from 'react-native-ui-lib';
import _ from 'lodash';

const COLOR_OPTIONS: {[key: string]: string} = {
  red: Colors.red30,
  green: Colors.green30,
  yellow: Colors.yellow30,
  blue: Colors.blue30
};

export default class TextFieldScreen extends Component {
  expandableInputRef = React.createRef<ExpandableOverlayMethods>();
  expandablePickerRef = React.createRef<PickerMethods>();

  state = {
    textFieldValueDraft: '',
    textFieldValue: '',
    selectedColor: 'red'
  };

  updateText = (value: string) => this.setState({textFieldValueDraft: value});

  onDone = () => {
    this.setState({textFieldValue: this.state.textFieldValueDraft});
    this.expandableInputRef.current?.closeExpandable();
  };
  onCancel = () => {
    this.setState({textFieldValueDraft: this.state.textFieldValue});
    this.expandableInputRef.current?.closeExpandable();
  };

  onPickItem = ({customValue: color}: {customValue: string}) => {
    this.setState({selectedColor: color});
    this.expandablePickerRef.current?.closeExpandable();
  };

  renderInputModal = () => {
    const {textFieldValueDraft} = this.state;
    return (
      <>
        <View br20 padding-s4>
          <Incubator.TextField
            autoFocus
            preset={null}
            value={textFieldValueDraft}
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
      <View bg-$backgroundDefault br20 padding-s3 paddingB-60>
        {_.map(COLOR_OPTIONS, (_color, key) => {
          return (
            <TouchableOpacity key={key} customValue={key} onPress={this.onPickItem}>
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
        <Incubator.ExpandableOverlay
          ref={this.expandableInputRef}
          modalProps={{animationType: 'slide', onDismiss: () => console.warn('Modal is dismissed')}}
          expandableContent={this.renderInputModal()}
          showTopBar
          topBarProps={{title: 'Edit Input', doneLabel: 'Done', onCancel: this.onCancel, onDone: this.onDone}}
        >
          <Incubator.TextField placeholder="Expandable input" value={textFieldValue}/>
        </Incubator.ExpandableOverlay>
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
        <Incubator.ExpandableOverlay
          ref={this.expandablePickerRef}
          useDialog
          expandableContent={this.renderPickerContent()}
          dialogProps={{bottom: true, onDismiss: () => console.warn('Dialog is dismissed')}}
        >
          {this.renderColorRow(selectedColor)}
        </Incubator.ExpandableOverlay>
      </>
    );
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View padding-page>
          <Text h2 marginB-s5>
            ExpandableOverlay
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
