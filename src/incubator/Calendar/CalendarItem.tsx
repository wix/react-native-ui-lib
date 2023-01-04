import React from 'react';
import {CalendarItemProps} from './types';
import Month from './Month';
import Header from './Header';
import View from '../../components/view';

function CalendarItem(props: CalendarItemProps) {
  const {year, month} = props;
  if (month !== undefined) {
    return (
      <View>
        <Header/>
        <Month month={month} year={year}/>
      </View>
    );
  }

  return null;
}

export default CalendarItem;
