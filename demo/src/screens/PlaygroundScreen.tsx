import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Incubator, Text, Card, TextField, Button} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-dark80 flex padding-20>
        <Incubator.WheelPicker/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
