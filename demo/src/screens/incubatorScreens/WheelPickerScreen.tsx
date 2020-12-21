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
      
      <View flex centerV centerH>
        <Text h3>Months</Text>
        <View height={300} width={'100%'}>
          <Incubator.WheelPicker
            onValueChange={onChange}
            activeTextColor={Colors.primary}
            inactiveTextColor={Colors.grey20}
            items={_.map(months, i => ({label: i, value: i}))}
            textStyle={{...Typography.text60R}}
          />
        </View>
        <Text h3>Years</Text>
        <View height={300} width={'100%'}>
          <Incubator.WheelPicker onValueChange={onChange} items={_.map(years, i => ({label: '' + i, value: i}))} />
        </View>
      </View>
    </View>
  );
};
