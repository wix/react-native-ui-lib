

import React, {Component} from 'react';
import {View, Text, Card} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
console.log('index.js');
export default class PlaygroundScreen extends Component {
  render() {
    console.log('PlaygroundScreen');
    return (
      <View bg-grey80 flex padding-20>
        <View marginT-20/>
        <DateTimePicker value={new Date()} mode="date" display="default"/>
        <Card height={100} center padding-20>
          <Text text50>Playground Screen</Text>
        </Card>
        <View flex center>
        </View>
      </View>
    );
  }
}
