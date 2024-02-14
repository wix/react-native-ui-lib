import React, {Component} from 'react';
import {View, Text, Card, TextField, Button, MyColorPicker} from 'react-native-ui-lib';

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-grey80 flex padding-20>
        <MyColorPicker/>
      </View>
    );
  }
}
