import React from 'react';
import {View, Text, Incubator} from 'react-native-ui-lib';
import _ from 'lodash';

const items = [
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

export default () => {
  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>
      <View flex centerH paddingT-page>
        <Incubator.WheelPicker
          items={_.map(items, (i) => ({text: i, value: i}))}
        />
      </View>
    </View>
  );
};
