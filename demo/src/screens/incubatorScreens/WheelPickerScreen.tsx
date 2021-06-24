import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, Incubator, Colors, Typography, Button, Dialog} from 'react-native-ui-lib';
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
  const [showDialog, setShowDialog] = useState(false);

  const onPickDaysPress = useCallback(() => {
    setShowDialog(true);
  }, []);

  const onDialogDismissed = useCallback(() => {
    setShowDialog(false);
  }, []);

  const onMonthChange = useCallback((item: string | undefined, _: number) => {
    setMonth(item);
  }, []);

  const onYearChange = useCallback((item: string | undefined, _: number) => {
    setYear(item);
  }, []);

  const onDaysChange = useCallback((item: number | undefined, _: number) => {
    setDays(item);
  }, []);

  const monthItems = useMemo(() => {
    return _.map(months, item => ({label: item, value: item}));
  }, []);

  const yearItems = useMemo(() => {
    return _.map(years, item => ({label: '' + item, value: item}));
  }, []);

  const dayItems = useMemo(() => {
    return _.map(days, item => ({label: '' + item, value: item}));
  }, []);

  return {
    monthItems,
    yearItems,
    dayItems,
    onMonthChange,
    onYearChange,
    onDaysChange,
    selectedMonth,
    selectedYear,
    selectedDays,
    onPickDaysPress,
    onDialogDismissed,
    showDialog
  };
};

export default () => {
  const {
    selectedMonth,
    onMonthChange,
    monthItems,
    selectedYear,
    onYearChange,
    yearItems,
    selectedDays,
    onDaysChange,
    dayItems,
    onPickDaysPress,
    onDialogDismissed,
    showDialog
  } = useData('February', undefined, 5);

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
          items={monthItems}
          textStyle={Typography.text60R}
          selectedValue={selectedMonth}
        />

        <Text h3>Years</Text>
        <View width={'100%'}>
          <Incubator.WheelPicker
            onChange={onYearChange}
            numberOfVisibleRows={3}
            selectedValue={selectedYear}
            items={yearItems}
          />
        </View>

        <Button marginT-40 label={'Pick Days'} marginH-120 onPress={onPickDaysPress}/>
        <Dialog width={'90%'} height={260} bottom visible={showDialog} onDismiss={onDialogDismissed}>
          <Incubator.WheelPicker onChange={onDaysChange} selectedValue={selectedDays} label={'Days'} items={dayItems}/>
        </Dialog>
      </View>
    </View>
  );
};
