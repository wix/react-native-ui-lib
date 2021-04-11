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

const days = _.times(365, i => i + 1);

const useData = (initialMonth?: string, initialYear?: string, initialDays?: number) => {

  const [selectedMonth, setMonth] = useState<string | undefined>(initialMonth);
  const [selectedYear, setYear] = useState<string | undefined>(initialYear);
  const [selectedDays, setDays] = useState<number | undefined>(initialDays);

  const onMonthChange = (item: string | undefined, _: number) => {
    setMonth(item);
  };

  const onYearChange = (item: string | undefined, _: number) => {
    setYear(item);
  };

  const onDaysChange = (item: number | undefined, _: number) => {
    setDays(item);
  };

  const getMonths = useCallback(() => {
    return _.map(months, item => ({label: item, value: item}));
  }, []);

  const getYears = useCallback(() => {
    return _.map(years, item => ({label: '' + item, value: item}));
  }, []);

  const getDays = useCallback(() => {
    return _.map(days, item => ({label: '' + item, value: item}));
  }, []);


  return {
    getMonths, 
    getYears,
    getDays,
    onMonthChange,
    onYearChange,
    onDaysChange,
    selectedMonth,
    selectedYear,
    selectedDays
  };
};

export default () => {
  
  const {selectedMonth, onMonthChange, getMonths, selectedYear, onYearChange, getYears, selectedDays, onDaysChange, getDays} = useData('February', undefined, 5);

  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>
      
      <View flex marginT-20 centerH>
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
          <Incubator.WheelPicker onChange={onYearChange} selectedValue={selectedYear} items={getYears()}/>
        </View>

        <Text h3 style={{marginTop: -50}}>Days</Text>
        <View height={100} width={'100%'}>
          <Incubator.WheelPicker onChange={onDaysChange} selectedValue={selectedDays} rightLabel={selectedDays === 1 ? 'Day' : 'Days'} items={getDays()}/>
        </View>
      </View>
    </View>
  );
};
