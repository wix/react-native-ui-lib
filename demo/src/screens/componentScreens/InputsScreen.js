import React, {Component} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Assets, Constants, Button, Colors, Text, TextInput, Typography} from 'react-native-ui-lib';//eslint-disable-line

const LONG_TEXT = 'Concept, edition and design direction for the editorial piece “La Forma Bruta” by the photographer Martín Bollati. In this piece';
const INPUT_SPACING = 25;
export default class InputScreen extends Component {

  static id = 'example.components.InputsScreen';

  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps>
        <Text style={{marginBottom: 20}} text40>Inputs</Text>
        <TextInput
          text70
          placeholder="Email"
          floatingPlaceholder
          containerStyle={{marginBottom: INPUT_SPACING}}
          onChangeText={text => this.setState({error: text ? '' : 'This field is required' })}
          error={this.state.error}
        />

        <TextInput
          text70
          placeholder="Tell us about yourself"
          value={LONG_TEXT}
          expandable
          containerStyle={{marginBottom: INPUT_SPACING}}
        />
        <TextInput
          text50
          placeholder="Big Title Text"
          floatingPlaceholder
          containerStyle={{marginBottom: INPUT_SPACING}}
        />
        <TextInput
          text20
          placeholder="Huge Text"
          containerStyle={{marginBottom: INPUT_SPACING}}
        />

        <TextInput
          text70
          hideUnderline
          placeholder="No Underline"
          containerStyle={{marginBottom: INPUT_SPACING}}
        />

        <TextInput
          text10
          hideUnderline
          centered
          placeholder="Centered"
          containerStyle={{marginBottom: INPUT_SPACING}}
        />
      </ScrollView>
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
