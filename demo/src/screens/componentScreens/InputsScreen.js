import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Assets, Constants, Button, Colors, Text, TextInput, Typography} from 'react-native-ui-lib';//eslint-disable-line


const INPUT_SPACING = 25;
export default class InputScreen extends Component {

  static id = 'example.components.InputsScreen';

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{marginBottom: 20}} text40>Inputs</Text>
        <TextInput
          text70
          placeholder="Write something..."
          floatingPlaceholder
          containerStyle={{marginBottom: INPUT_SPACING}}
        />
        <TextInput
          text50
          placeholder="Big Title Text"
          containerStyle={{marginBottom: INPUT_SPACING}}
        />
        <TextInput
          text20
          placeholder="Huge Text"
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
    flex: 1,
  },
  title: {
    ...Typography.text20,
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
  },
});
