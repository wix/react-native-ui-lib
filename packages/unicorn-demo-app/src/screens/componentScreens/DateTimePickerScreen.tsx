import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import moment from 'moment';
import * as LightDate from 'light-date';
import {DateTimePicker, DateTimePickerProps, DateTimePickerMode, View, Text, Switch} from 'react-native-ui-lib';

interface State {
  mode: DateTimePickerMode;
  dateTimeFormatter: 'moment' | 'light-date';
}

export default class DateTimePickerScreen extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: 'time',
      dateTimeFormatter: 'moment'
    };
  }

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

  toggleTimeOrDate = () => {
    this.setState({mode: this.state.mode === 'time' ? 'date' : 'time'});
  };

  toggleFormatter = () => {
    this.setState({dateTimeFormatter: this.state.dateTimeFormatter === 'moment' ? 'light-date' : 'moment'});
  };

  getFormatter = (): DateTimePickerProps['dateTimeFormatter'] => {
    const {dateTimeFormatter} = this.state;
    if (dateTimeFormatter === 'moment') {
      return (value: Date, mode: DateTimePickerMode) =>
        moment(value).format(mode === 'date' ? 'MMM D, YYYY' : 'h:mm A');
    } else {
      return (value: Date, mode: DateTimePickerMode) =>
        LightDate.format(value, mode === 'date' ? '{mm}-{dd}-{yyyy}' : '{HH}:{mm}');
    }
  };

  render() {
    const {mode, dateTimeFormatter} = this.state;
    return (
      <ScrollView>
        <View padding-page>
          <Text text40>Date Time Picker</Text>
          <DateTimePicker
            containerStyle={{marginVertical: 20}}
            label={'Date'}
            placeholder={'Select a date'}
            // textColor={Colors.red30}
            // backgroundColor={Colors.$backgroundDark}
            // cancelButtonProps={{iconStyle: {tintColor: Colors.$iconDefaultLight}}}
            // value={new Date('October 13, 2014')}
          />
          <DateTimePicker
            mode={'time'}
            label={'Time'}
            placeholder={'Select time'}
            // value={new Date('2015-03-25T12:00:00-06:30')}
          />

          <Text text60R marginT-40>
            Disabled
          </Text>
          <DateTimePicker
            containerStyle={{marginBottom: 20}}
            editable={false}
            label={'Date'}
            placeholder={'Select a date'}
          />
          <DateTimePicker
            editable={false}
            mode={'time'}
            label={'Time'}
            placeholder={'Select time'}
            value={new Date('2015-03-25T12:00:00-06:30')}
          />
          <Text text60R marginT-40>
            Custom Input
          </Text>
          <View row marginV-20 centerV spread>
            <View row>
              <Text text80>{mode}</Text>
              <Switch value={mode === 'time'} onValueChange={this.toggleTimeOrDate} marginL-10/>
            </View>
            <View row>
              <Text text80>{dateTimeFormatter}</Text>
              <Switch value={dateTimeFormatter === 'moment'} onValueChange={this.toggleFormatter} marginL-10/>
            </View>
          </View>
          <DateTimePicker
            containerStyle={{marginVertical: 20}}
            renderInput={this.renderCustomInput}
            mode={mode}
            dateTimeFormatter={this.getFormatter()}
            // value={new Date('2015-03-25T12:00:00-06:30')}
          />
        </View>
      </ScrollView>
    );
  }
}
