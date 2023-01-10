import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import View from '../../components/view';
import CalendarItem from './CalendarItem';
import {CalendarProps, FirstDayOfWeek} from './types';
import CalendarContext from './CalendarContext';
import Agenda from './Agenda';
import {getDateObject} from './helpers/DateUtils';

function Calendar(props: PropsWithChildren<CalendarProps>) {
  const {data, children, initialDate = Date.now(), firstDayOfWeek = FirstDayOfWeek.Monday} = props;
  const current = useSharedValue<number>(initialDate);
  const dateObject = getDateObject(initialDate);

  const setDate = useCallback((date: number) => {
    current.value = date;
  }, []);

  const contextValue = useMemo(() => {
    return {
      data,
      firstDayOfWeek,
      selectedDate: current,
      setDate
    };
  }, []);

  return (
    <CalendarContext.Provider value={contextValue}>
      <View>
        <CalendarItem year={dateObject.year} month={dateObject.month}/>
      </View>
      {children}
    </CalendarContext.Provider>
  );
}

Calendar.Agenda = Agenda;

export default Calendar;
