import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, TextField, Spacings} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import {KeyboardAwareInsetsView} from 'react-native-keyboard-tracking-view';

class InputValidationsScreen extends Component {
  state = {};
  render() {
    return (
      <ScrollView>
        <View padding-s5>
          <Text text40 marginB-s5>
            Validations
          </Text>
          <TextField
            title="Required Field"
            containerStyle={styles.input}
            placeholder="Enter Text"
            validate="required"
            errorMessage="This is a mandatory field "
          />
          <TextField
            title="Email"
            containerStyle={styles.input}
            placeholder="Enter valid email"
            validate="email"
            errorMessage="email is invalid"
            validateOnChange
          />
          <TextField
            title="Price"
            containerStyle={styles.input}
            placeholder="Enter price"
            validate="price"
            errorMessage="Price is invalid"
          />
          <TextField
            title="Number"
            containerStyle={styles.input}
            placeholder="Enter a Number"
            validate="number"
            errorMessage="Number is invalid"
          />
          <TextField
            title="URL"
            containerStyle={styles.input}
            placeholder="Enter a url"
            validate="url"
            errorMessage="Url is invalid"
          />

          <TextField
            title="Required Email (2 validations)"
            containerStyle={styles.input}
            placeholder="Enter an email"
            validate={['required', 'email']}
            errorMessage={['This field is required', 'Email is invalid']}
          />
          <TextField
            title="Custom Validation"
            containerStyle={styles.input}
            placeholder="Enter a text that starts with B"
            validate={value => /^B.*/.test(value)}
            errorMessage={'Text does not start with "B"'}
          />
        </View>
        <KeyboardAwareInsetsView/>
      </ScrollView>
    );
  }
}

export default InputValidationsScreen;

Navigation.registerComponent('unicorn.components.InputValidationsScreen', () => InputValidationsScreen);

const styles = StyleSheet.create({
  input: {
    marginBottom: Spacings.s2
  }
});
