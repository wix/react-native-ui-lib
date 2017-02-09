import React, {Component} from 'react';
import {ScrollView, StyleSheet, Alert} from 'react-native';
import {Button, Colors} from 'react-native-ui-lib';//eslint-disable-line

const ButtonSpace = 30;

export default class ButtonsScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Button
          label={'Publish'}
          onPress={() => Alert.alert('Button #1')}
          containerStyle={{marginBottom: ButtonSpace}}
        />
        <Button
          label={'This is a button with long text'}
          onPress={() => Alert.alert('Button #2')}
          backgroundColor={Colors.violet50}
          containerStyle={{marginBottom: ButtonSpace}}
          enableShadow
        />
        <Button
          label={'Go!'}
          onPress={() => Alert.alert('Button #3')}
          labelStyle={{fontWeight: '800'}}
          containerStyle={{marginBottom: ButtonSpace}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 25,
  },
});
