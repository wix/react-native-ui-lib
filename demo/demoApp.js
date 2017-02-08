import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Colors, Button} from 'react-native-ui-lib';

export default class uilib extends Component {
  render() {
    return (
      <View style={[styles.container, {backgroundColor: Colors.dark40}]}>
        <Button label="Hello" onPress={() => {alert('welcome to UI-Lib')}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('uilib', () => uilib);
