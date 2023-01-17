import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Incubator} from 'react-native-ui-lib';
import {data} from './MockData';

export default class CalendarScreen extends Component {
  state = {};

  render() {
    return (
      <View flex>
        <Incubator.Calendar data={data}>
          <Incubator.Calendar.Agenda/>
        </Incubator.Calendar>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
