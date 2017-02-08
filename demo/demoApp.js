import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import {Colors, Button, Badge} from 'react-native-ui-lib'; //eslint-disable-line

export default class uilib extends Component {
  render() {
    return (
      <View style={[styles.container, {backgroundColor: Colors.dark40}]}>
        <Button label="Hello" onPress={() => { alert('welcome to UI-Lib'); }} />
        <Badge label="1" color={Colors.red10} />
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
  },
});

AppRegistry.registerComponent('uilib', () => uilib);
