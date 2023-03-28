import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {DateTimePicker, DateTimePickerProps, View, Text} from 'react-native-ui-lib'; // eslint-disable-line

export default class DateTimePickerScreen extends Component {
  getCustomInputValue = (value?: string) => {
    if (!value) {
      return 'Default';
    }
    return value.includes((new Date().getFullYear() + 1).toString()) ? 'Next Year' : value;
  };

  renderCustomInput: DateTimePickerProps['renderInput'] = ({value}) => {
    return (
      <View flex row spread>
        <Text>Valid from</Text>
        <Text absR $textPrimary text80BO>
          {this.getCustomInputValue(value)}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        <View padding-page>
          <Text text40>Date Time Picker</Text>
          <DateTimePicker
            migrateTextField
            containerStyle={{marginVertical: 20}}
            label={'Date'}
            placeholder={'Select a date'}
            // dateFormat={'MMM D, YYYY'}
            // value={new Date('October 13, 2014')}
          />
          <DateTimePicker
            migrateTextField
            mode={'time'}
            label={'Time'}
            placeholder={'Select time'}
            // timeFormat={'h:mm A'}
            // value={new Date('2015-03-25T12:00:00-06:30')}
          />

          <Text text60R marginT-40>
            Disabled
          </Text>
          <DateTimePicker
            migrateTextField
            containerStyle={{marginBottom: 20}}
            editable={false}
            label={'Date'}
            placeholder={'Select a date'}
          />
          <DateTimePicker
            migrateTextField
            editable={false}
            mode={'time'}
            label={'Time'}
            placeholder={'Select time'}
            value={new Date('2015-03-25T12:00:00-06:30')}
          />
          <Text text60R marginT-40>
            Custom Input (date)
          </Text>
          <DateTimePicker
            migrateTextField
            containerStyle={{marginVertical: 20}}
            label={'Date'}
            placeholder={'Select a date'}
            renderInput={this.renderCustomInput}
            dateFormat={'MMM D, YYYY'}
            // useLightDate
            // dateFormat={'{mm}-{dd}-{yyyy}'}
            // value={new Date('2015-03-25T12:00:00-06:30')}
          />
          <Text text60R marginT-40>
            Custom Input (time)
          </Text>
          <DateTimePicker
            migrateTextField
            containerStyle={{marginVertical: 20}}
            mode={'time'}
            label={'Time'}
            placeholder={'Select a date'}
            renderInput={this.renderCustomInput}
            timeFormat={'h:mm A'}
            // useLightDate
            // timeFormat={'{HH}:{mm}'}
            // value={new Date('2015-03-25T12:00:00-06:30')}
          />
        </View>
      </ScrollView>
    );
  }
}
