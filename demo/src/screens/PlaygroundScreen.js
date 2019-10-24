import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native-ui-lib'; //eslint-disable-line


export default class PlaygroundScreen extends Component {

  render() {
    return (
      <View center bg-dark80 flex>
        <Text text50>Playground Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
