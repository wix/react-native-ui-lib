import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Incubator} from 'react-native-ui-lib';

export default class CalendarScreen extends Component {
  state = {};

  render() {
    return (
      <View flex>
        <Text>Calendar Screen</Text>
        <Incubator.Calendar>
          <View marginT-s10 flex>
            <Incubator.Calendar.Agenda/>
          </View>
        </Incubator.Calendar>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
