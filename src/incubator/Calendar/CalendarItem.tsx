import React from 'react';
import Month from './Month';
import Header from './Header';
import View from '../../components/view';

function CalendarItem() {
  return (
    <View>
      <Header month={11} year={2022}/>
      <Month month={11} year={2022}/>
    </View>
  );
}

export default CalendarItem;
