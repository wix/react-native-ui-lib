import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  View,
  Colors,
  Text,
  TextInput,
  TextArea,
  Typography,
} from 'react-native-ui-lib'; //eslint-disable-line
import {KeyboardAwareInsetsView} from 'react-native-keyboard-tracking-view';

const LONG_TEXT = 'Concept, edition and design direction for the editorial piece “La Forma Bruta” by the photographer' +
  'Martín Bollati. In this piece';
const INPUT_SPACING = 10;

const transformPrice = (value) => {
  let cleanValue;
  let priceText = '';
  if (value) {
    [cleanValue] = value.match(/^(?:(?:-?(?:0|\d{1,9}))(?:\.\d{0,2})?)|-/) || [
      '',
    ];
    priceText = cleanValue;
  }
  return priceText;
};

export default class InputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  render() {
    return (
      <View flex>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
          getTextInputRefs={() => [this.noUnderline, this.hugeText]}
        >
          <Text style={{marginBottom: 20}} text40>
            Inputs
          </Text>

          <TextInput
            text70
            floatingPlaceholder
            placeholder="floatingPlaceholder & helperText"
            helperText="this is an helper text"
            onChangeText={text => this.setState({error: text ? '' : 'This field is required'})}
            error={this.state.error}
          />

          <TextInput
            text70
            floatingPlaceholder
            placeholder="multiline & helperText"
            multiline
            helperText="this is an helper text"
          />

          <TextInput
            text70
            title="title"
            placeholder="character counter & error"
            maxLength={3}
            showCharacterCounter
            onChangeText={text => this.setState({error: text ? '' : 'This field is required'})}
            error={this.state.error}
          />

          <TextInput
            text70
            title="Title"
            placeholder="character counter & error & multiline"
            multiline
            maxLength={32}
            showCharacterCounter
            onChangeText={text => this.setState({error: text ? '' : 'This field is required'})}
            error={this.state.error}
            autoCapitalize="words"
          />

          <TextInput
            text70
            floatingPlaceholder
            placeholder="character counter & expandable"
            expandable
            containerStyle={{marginBottom: INPUT_SPACING}}
            maxLength={20}
            showCharacterCounter
          />

          <TextInput
            text70
            floatingPlaceholder
            placeholderTextColor={Colors.cyan30}
            floatingPlaceholderColor={Colors.cyan30}
            placeholder="underline colors & error"
            onChangeText={text => this.setState({error: text ? '' : 'This field is required'})}
            error={this.state.error}
            underlineColor={{focus: Colors.purple50, error: Colors.yellow60}}
          />

          <TextInput
            text70
            floatingPlaceholder
            placeholder="multiline & numberOfLines = 3"
            multiline
            numberOfLines={3}
          />

          <TextInput
            text40
            placeholder="write something.."
            containerStyle={{marginBottom: INPUT_SPACING}}
            hideUnderline
          />

          <TextInput
            text30
            placeholder="write something.."
            containerStyle={{marginBottom: INPUT_SPACING}}
            centered
            hideUnderline
          />

          <TextInput
            text70
            placeholder="Share your story"
            value={'Share Your Story exists to provide spaces to hear people\'s stories, in order to inspire us to' +
            'live better ones ourselves.'
            }
            multiline
          />

          <TextInput
            text70
            floatingPlaceholder
            placeholder="Tell us about yourself"
            value={LONG_TEXT}
            expandable
            containerStyle={{marginBottom: INPUT_SPACING}}
          />

          <TextInput
            text70
            floatingPlaceholder
            placeholder="with price transformer"
            value={this.state.value}
            transformer={transformPrice}
          />

          <Text dark40>Text Area</Text>
          <View
            style={{
              height: 150,
              borderWidth: 1,
              marginBottom: INPUT_SPACING,
              padding: 10,
              borderColor: Colors.dark60,
            }}
          >
            <TextArea placeholder="write something.." />
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
        <KeyboardAwareInsetsView/>
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
