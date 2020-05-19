import React, {Component} from 'react';
import {DateTimePicker, View, Text} from 'react-native-ui-lib'; // eslint-disable-line

export default class DateTimePickerScreen extends Component {
  render() {
    return (
      <View flex padding-page>
        <Text text40>Date Time Picker</Text>
        <DateTimePicker
          containerStyle={{marginVertical: 20}}
          title={'Date'}
          placeholder={'Select a date'}
          // dateFormat={'MMM D, YYYY'}
          // value={new Date('October 13, 2014')}
        />
        <DateTimePicker
          mode={'time'}
          title={'Time'}
          placeholder={'Select time'}
          // timeFormat={'h:mm A'}
          // value={new Date('2015-03-25T12:00:00-06:30')}
        />

        <Text text60R marginT-40>
          Disabled
        </Text>
        <DateTimePicker
          containerStyle={{marginBottom: 20}}
          editable={false}
          title={'Date'}
          placeholder={'Select a date'}
        />
        <DateTimePicker
          editable={false}
          mode={'time'}
          title={'Time'}
          placeholder={'Select time'}
          value={new Date('2015-03-25T12:00:00-06:30')}
        />
      </View>
    );
  }
}
