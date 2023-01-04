import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import View from '../../components/view';
import CalendarItem from './CalendarItem';
import {CalendarProps, FirstDayOfWeek} from './types';
import CalendarContext from './CalendarContext';
import Agenda from './Agenda';

function Calendar(props: PropsWithChildren<CalendarProps>) {
  const {children, initialDate = Date.now(), firstDayOfWeek = FirstDayOfWeek.Monday} = props;
  const current = useSharedValue<number>(initialDate);

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
      </View>
      {children}
    </CalendarContext.Provider>
  );
}

Calendar.Agenda = Agenda;

export default Calendar;
