import React, {Component} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Assets, Constants, Button, Colors, Text, TextInput, TextArea, Typography} from 'react-native-ui-lib';//eslint-disable-line

const LONG_TEXT = 'Concept, edition and design direction for the editorial piece “La Forma Bruta” by the photographer Martín Bollati. In this piece';
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

export default class InputScreen extends Component {
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
          floatingPlaceholder
          text70
          placeholder="write something.."
          onChangeText={text => this.setState({error: text ? '' : 'This field is required' })}
          error={this.state.error}
          underlineColor={{focus: Colors.orange60, error: Colors.purple50}}
        />

        <TextInput containerStyle={{marginBottom: INPUT_SPACING}} text40 hideUnderline placeholder="write something.."/>

        <TextInput containerStyle={{marginBottom: INPUT_SPACING}} centered text30 hideUnderline placeholder="write something.."/>

        <TextInput
          text70
          placeholder="Tell us about yourself"
          value={LONG_TEXT}
          expandable
          containerStyle={{marginBottom: INPUT_SPACING}}
        />

        <TextInput
          floatingPlaceholder
          text70
          placeholder="with price transformer"
          value={this.state.value}
          transformer={transformPrice}
        />

        <Text dark40>Text Area</Text>
        <View style={{height: 150, borderWidth: 1, marginBottom: INPUT_SPACING, padding: 10, borderColor: Colors.dark60}}>
          <TextArea placeholder="write something.."/>
        </View>

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
