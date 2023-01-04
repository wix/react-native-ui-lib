import React from 'react';
import View from '../../components/view';
import CalendarItem from './CalendarItem';

function Calendar() {
  return (
    <View>
      <CalendarItem year={2020} month={0}/>
      <CalendarItem year={2022} month={0}/>
      <CalendarItem year={2023} month={0}/>
    </View>
  );
}

export default Calendar;
