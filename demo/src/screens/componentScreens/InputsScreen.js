import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {View, Colors, Text, TextInput, TextArea, Typography, Modal, Button} from 'react-native-ui-lib'; //eslint-disable-line
import {KeyboardAwareInsetsView} from 'react-native-keyboard-tracking-view';

const LONG_TEXT =
  'Concept, edition and design direction for the editorial piece “La Forma Bruta” by the photographer' +
  'Martín Bollati. In this piece';
const INPUT_SPACING = 10;

const transformPrice = (value) => {
  let cleanValue;
  let priceText = '';
  if (value) {
    [cleanValue] = value.match(/^(?:(?:-?(?:0|\d{1,9}))(?:\.\d{0,2})?)|-/) || [''];
    priceText = cleanValue;
  }
  return priceText;
};

export default class InputsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      topError: false,
      customExpandableValue: 'Custom Expandable',
    };
  }

  onButtonPressed = () => {
    const {topError} = this.state;
    this.setState({topError: !topError});
  }

  onChangeText = (text) => {
    let message = '';
    if (text === '') {
      message = 'This field is mandatory';
    }
    if (text === 'Zzz') {
      message = 'Please enter a valid text'
    }
    this.setState({error: message});
  }

  render() {
    const {topError} = this.state;
    const state = topError ? 'On' : 'Off';
    const btnLabel = `Top Errors: ${state}`
    
    return (
      <View flex>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
          getTextInputRefs={() => [this.noUnderline, this.hugeText]}
        >
          <Text style={{marginBottom: 20, marginRight: 20}} text40>
            Inputs
          </Text>
          <Button
            style={{height: 28, alignSelf: 'flex-start', marginBottom: 20}}
            outline={!topError}
            size="small"
            label={btnLabel}
            onPress={this.onButtonPressed}
          />
          
          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholder="floatingPlaceholder & error"
            onChangeText={this.onChangeText}
            error={this.state.error}
            useTopErrors={this.state.topError}
            floatOnFocus
          />

          <TextInput
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholder="placeholder"
            helperText="helperText"
            value="disabled with value"
            maxLength={100}
            showCharacterCounter
            expandable
            editable={false}
            disabledColor={Colors.dark70}
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholder="& helperText"
            helperText="this is an helper text"
            onChangeText={this.onChangeText}
            error={this.state.error}
            useTopErrors={this.state.topError}
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholder="multiline & helperText"
            multiline
            helperText="this is an helper text"
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            title="title"
            placeholder="character counter & error"
            maxLength={3}
            showCharacterCounter
            onChangeText={this.onChangeText}
            error={this.state.error}
            useTopErrors={this.state.topError}
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            title="Title"
            titleStyle={{fontSize: Typography.text70.fontSize}}
            placeholder="multiline & titleStyle"
            multiline
            maxLength={32}
            showCharacterCounter
            onChangeText={this.onChangeText}
            error={this.state.error}
            useTopErrors={this.state.topError}
            autoCapitalize="words"
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholder="character counter & expandable"
            expandable
            maxLength={20}
            showCharacterCounter
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholderTextColor={Colors.cyan30}
            floatingPlaceholderColor={Colors.cyan30}
            placeholder="underline colors & error"
            onChangeText={this.onChangeText}
            error={this.state.error}
            useTopErrors={this.state.topError}
            underlineColor={{focus: Colors.purple50, error: Colors.yellow60}}
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholder="multiline & numberOfLines = 3"
            multiline
            numberOfLines={3}
          />

          <TextInput
            text40
            containerStyle={{marginBottom: INPUT_SPACING}}
            placeholder="write something.."
            hideUnderline
          />

          <TextInput
            text30
            containerStyle={{marginBottom: INPUT_SPACING}}
            placeholder="write something.."
            centered
            hideUnderline
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            placeholder="Share your story"
            value={
              "Share Your Story exists to provide spaces to hear people's stories, in order to inspire us to" +
              'live better ones ourselves.'
            }
            multiline
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholder="Tell us about yourself"
            value={LONG_TEXT}
            expandable
          />

          <TextInput
            containerStyle={{marginBottom: INPUT_SPACING}}
            ref={r => (this.input = r)}
            placeholder="placeholder"
            expandable
            value={this.state.customExpandableValue}
            renderExpandable={() => {
              return (
                <Modal visible animationType={'slide'}>
                  <View flex bg-orange70 center>
                    <Text marginB-20 text50>
                      Do Whatever you want here
                    </Text>
                    <Button
                      label="Close Me"
                      onPress={() => {
                        this.setState({customExpandableValue: 'New Value'}, () => {
                          this.input.toggleExpandableModal(false);
                        });
                      }}
                    />
                  </View>
                </Modal>
              );
            }}
          />

          <TextInput
            text70
            containerStyle={{marginBottom: INPUT_SPACING}}
            floatingPlaceholder
            placeholder="with price transformer"
            value={this.state.value}
            transformer={transformPrice}
          />

          <Text dark10 marginB-5>Text Area</Text>
          <View
            style={{
              height: 150,
              borderWidth: 1,
              marginBottom: INPUT_SPACING,
              padding: 10,
              borderColor: Colors.dark60,
            }}
          >
            <TextArea placeholder="write something.."/>
          </View>

          <TextInput
            text50
            floatingPlaceholder
            placeholder="Big Title Text"
            containerStyle={{marginBottom: INPUT_SPACING}}
            helperText="this is an helper text"
          />
          <TextInput
            text20
            placeholder="Huge Text"
            containerStyle={{marginBottom: INPUT_SPACING}}
            ref={input => (this.hugeText = input)}
          />

          <TextInput
            text70
            placeholder="No Underline"
            containerStyle={{marginBottom: INPUT_SPACING}}
            ref={input => (this.noUnderline = input)}
            hideUnderline
          />

          <TextInput
            text10
            placeholder="Centered"
            centered
            containerStyle={{marginBottom: INPUT_SPACING}}
            hideUnderline
          />
        </ScrollView>
        <KeyboardAwareInsetsView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 25,
  },
  title: {
    ...Typography.text20,
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
  },
});
