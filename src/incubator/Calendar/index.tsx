import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import View from '../../components/view';
import CalendarItem from './CalendarItem';
import {CalendarProps, FirstDayOfWeek} from './types';
import CalendarContext from './CalendarContext';

function Calendar(props: PropsWithChildren<CalendarProps>) {
  const {children, firstDayOfWeek = FirstDayOfWeek.Monday} = props;
  const current = useSharedValue<number>(Date.now());

  const setDate = useCallback((date: number) => {
    current.value = date;
  }, []);

  const contextValue = useMemo(() => {
    return {
      firstDayOfWeek,
      date: current,
      setDate
    };
  }, []);

  return (
    <CalendarContext.Provider value={contextValue}>
      <View>
        <CalendarItem year={2020} month={0}/>
        <CalendarItem year={2022} month={0}/>
        <CalendarItem year={2023} month={0}/>
      </View>
      {children}
    </CalendarContext.Provider>
  );
}

export default Calendar;
