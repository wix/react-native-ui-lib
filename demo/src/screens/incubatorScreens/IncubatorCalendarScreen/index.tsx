import React, {Component} from 'react';
import {View, Incubator} from 'react-native-ui-lib';
import {data} from './MockData';

export default class CalendarScreen extends Component {
  state = {};

  render() {
    return (
      <View flex>
        <Incubator.Calendar data={data} staticHeader>
          <Incubator.Calendar.Agenda/>
        </Incubator.Calendar>
      </View>
    );
  }
}
