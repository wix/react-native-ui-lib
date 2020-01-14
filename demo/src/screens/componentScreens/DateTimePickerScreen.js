import React, {Component} from 'react';
import {DateTimePicker, View, Text} from 'react-native-ui-lib'; // eslint-disable-line


export default class DateTimePickerScreen extends Component {
  
  render() {
    return (
      <View flex padding-20>
        <Text text40 marginB-40>Date Time Picker</Text>
        
        <DateTimePicker 
          title={'Date'} 
          placeholder={'Select a date'} 
          dateFormat={'MMM D, YYYY'}
          // value={new Date('October 13, 2014')} 
        />
        <DateTimePicker 
          mode={'time'} 
          title={'Time'} 
          placeholder={'Select time'}
          timeFormat={'h:mm A'}
          // value={new Date('2015-03-25T12:00:00-06:30')}
        />
      </View>
    );
  }
}
