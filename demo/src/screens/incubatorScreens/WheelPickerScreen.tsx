import React from 'react';
import {View, Text, Incubator} from 'react-native-ui-lib';
import _ from 'lodash';

// Months
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// Years
const years = _.times(2020, i => i);

export default () => {
  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>
      <View flex centerH paddingT-page>
        <Text h3>Months</Text>
        <Incubator.WheelPicker items={_.map(months, i => ({text: i, value: i}))} />
        <Text h3 marginT-s5>Years</Text>
        <Incubator.WheelPicker items={_.map(years, i => ({text: i, value: i}))} />
      </View>
    </View>
  );
};
