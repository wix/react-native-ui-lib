import React, {Component} from 'react';
import {DateTimePicker, View, Text, Button} from 'react-native-ui-lib'; // eslint-disable-line

export default class DateTimePickerScreen extends Component {

  getCustomInputValue = value => {
    if (!value) {
      return '';
    }
    return value.includes(new Date().getFullYear() + 1) ? 'Next Year' : value;
  };

  renderCustomInput = (props, toggle) => {
    const {value} = props;
    return (
      <View>
        <Button
          label={'Select a date'}
          style={{backgroundColor: 'red', height: 40, width: '100%'}}
          {...props}
          onPress={() => {
            toggle(true);
          }}
        />
        <Text>{this.getCustomInputValue(value)}</Text>
      </View>
    );
  };

  render() {
    return (
      <View flex padding-s5>
        <Text text40>Date Time Picker</Text>
        <DateTimePicker
          containerStyle={{marginVertical: 20}}
          title={'Date'}
          placeholder={'Select a date'}
          // timeFormat={'h:mm A'}
          // value={new Date('2015-03-25T12:00:00-06:30')}
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
          renderExpandableInput={this.renderCustomInput}
          // timeFormat={'h:mm A'}
          // value={new Date('2015-03-25T12:00:00-06:30')}
        />
      </View>
    );
  }
}
