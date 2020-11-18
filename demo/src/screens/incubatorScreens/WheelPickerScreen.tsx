import React, {useCallback} from 'react';
import {View, Text, Incubator, Typography, Colors} from 'react-native-ui-lib';
import _ from 'lodash';
import { ItemProps } from 'src/incubator/WheelPicker/Item';

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

  const activeFont = Typography.text60BO;
  const inactiveFont = Typography.text60R;
  const activeTextColor = Colors.primary;
  const inactiveTextColor = Colors.grey20;

  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>
      <View flex centerV centerH paddingT-page>
        
        <Text h3>Months</Text>
        <Incubator.WheelPicker onChange={onChange} activeItemTextStyle={{...activeTextColor, ...activeFont}} inactiveItemTextStyle={{color: inactiveTextColor, ...inactiveFont}} items={_.map(months, i => ({text: i, value: i}))} />

        <Text h3 marginT-s5>Years</Text>
        <Incubator.WheelPicker onChange={onChange} items={_.map(years, i => ({text: '' + i, value: i}))} />
      </View>
    </View>
  );
};
