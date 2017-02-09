import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-ui-lib';//eslint-disable-line

export default class ButtonsScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Button label="Button" />
        <Button label="Disabled Button" disabled />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
});
