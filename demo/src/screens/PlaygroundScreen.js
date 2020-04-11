import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Card, Incubator} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View center bg-dark80 flex>
        <Incubator.WheelPicker/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
