import React, {useCallback} from 'react';
import {View, Text, Incubator, Colors, Typography} from 'react-native-ui-lib';
import _ from 'lodash';
import {ItemProps} from 'src/incubator/WheelPicker/Item';

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

  const onChange = useCallback((index: number, item?: ItemProps) => {
    console.log(item, index);
  }, []);

  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>
      <View flex centerV centerH paddingT-page>
        <Text h3>Months</Text>
        <Incubator.WheelPicker
          onChange={onChange}
          activeTextColor={Colors.primary}
          inactiveTextColor={Colors.grey20}
          items={_.map(months, i => ({text: i, value: i}))}
          textStyle={{...Typography.text60R}}
        />

        <Text h3 marginT-s5>Years</Text>
        <Incubator.WheelPicker onChange={onChange} items={_.map(years, i => ({text: '' + i, value: i}))} />
      </View>
    </View>
  );
};
