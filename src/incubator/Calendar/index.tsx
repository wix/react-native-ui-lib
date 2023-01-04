import React, {PropsWithChildren, useMemo} from 'react';
import View from '../../components/view';
import CalendarItem from './CalendarItem';
import {CalendarProps, FirstDayOfWeek} from './types';
import CalendarContext from './CalendarContext';

function Calendar(props: PropsWithChildren<CalendarProps>) {
  const {children, firstDayOfWeek = FirstDayOfWeek.Monday} = props;

  const contextValue = useMemo(() => {
    return {
      firstDayOfWeek
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
