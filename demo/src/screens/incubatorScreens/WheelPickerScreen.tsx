import React, {useCallback, useState} from 'react';
import {View, Text, Incubator, Colors, Typography} from 'react-native-ui-lib';
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

const useData = (initialMonth?: string, initialYear?: string) => {

  const [selectedMonth, setMonth] = useState<string | undefined>(initialMonth);
  const [selectedYear, setYear] = useState<string | undefined>(initialYear);

  const onMonthChange = (item: string | undefined, _: number) => {
    setMonth(item);
  }

  const onYearChange = (item: string | undefined, _: number) => {
    setYear(item);
  }

  const getMonths = useCallback(() => {
    return _.map(months, item => ({label: item, value: item}));
  }, []);

  const getYears = useCallback(() => {
    return _.map(years, item => ({label: '' + item, value: item}));
  }, []);

  return {
    getMonths, 
    getYears,
    onMonthChange,
    onYearChange,
    selectedMonth,
    selectedYear
  }
}

export default () => {
  
  const {selectedMonth, onMonthChange, getMonths, selectedYear, onYearChange, getYears} = useData('February', undefined);

  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>
      
      <View flex centerV centerH>
        <Text h3>Months</Text>
          <Incubator.WheelPicker
            style={{width: '100%'}}
            onChange={onMonthChange}
            activeTextColor={Colors.primary}
            inactiveTextColor={Colors.grey20}
            items={getMonths()}
            textStyle={Typography.text60R}
            selectedValue={selectedMonth}
          />
        
        <Text h3>Years</Text>
        <View height={300} width={'100%'}>
          <Incubator.WheelPicker onChange={onYearChange} selectedValue={selectedYear} items={getYears()} />
        </View>
      </View>
    </View>
  );
};
