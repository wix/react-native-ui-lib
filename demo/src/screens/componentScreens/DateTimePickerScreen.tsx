import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {DateTimePicker, Text, TouchableOpacity} from 'react-native-ui-lib'; // eslint-disable-line

export default class DateTimePickerScreen extends Component {
  getCustomInputValue = (value: string) => {
    if (!value) {
      return 'Default';
    }
    return value.includes((new Date().getFullYear() + 1).toString()) ? 'Next Year' : value;
  };

  renderCustomInput = (props: {value: string}, toggle: (shouldToggle: boolean) => void) => {
    const {value} = props;
    return (
      <TouchableOpacity
        flex
        row
        spread
        onPress={() => {
          toggle(true);
        }}
      >
        <Text>Valid from</Text>
        <Text absR $textPrimary text80BO>
          {this.getCustomInputValue(value)}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={{padding: 14}}>
        <Text text40>Date Time Picker</Text>
        <DateTimePicker
          // @ts-expect-error
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
        <Text text60R marginT-40>
          Custom Input
        </Text>
        <DateTimePicker
          containerStyle={{marginVertical: 20}}
          title={'Date'}
          placeholder={'Select a date'}
          renderInput={this.renderCustomInput}
          dateFormat={'MMM D, YYYY'}
          // value={new Date('2015-03-25T12:00:00-06:30')}
        />
      </ScrollView>
    );
  }
}
