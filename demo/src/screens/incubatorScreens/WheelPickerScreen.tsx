import React, {useCallback, useState} from 'react';
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
  const [selectedValue, setSelectedValue] = useState<string | undefined>('February');

  const onChange = useCallback((item: string | undefined, index: number) => {
    setSelectedValue(item);
  }, []);

  const getMonths = useCallback(() => {
    return _.map(months, value => ({label: value, value: value}));
  }, []);

  const getYears = useCallback(() => {
    return _.map(years, i => ({label: '' + i, value: i}));
  }, []);

  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>
      
      <View flex centerV centerH>
        <Text h3>Months</Text>
          <Incubator.WheelPicker
            style={{width: '100%'}}
            onValueChange={onChange}
            activeTextColor={Colors.primary}
            inactiveTextColor={Colors.grey20}
            items={getMonths()}
            textStyle={Typography.text60R}
            selectedValue={selectedValue}
          />
        
        <Text h3>Years</Text>
        <View height={300} width={'100%'}>
          <Incubator.WheelPicker onValueChange={onChange} items={getYears()} />
        </View>
      </View>
    </View>
  );
};
