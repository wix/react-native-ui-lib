import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import View from '../../components/view';
import CalendarItem from './CalendarItem';
import {CalendarProps, FirstDayOfWeek} from './types';
import CalendarContext from './CalendarContext';
import Agenda from './Agenda';
import {FlashList} from '@shopify/flash-list';

// TODO: Move this logic elsewhere
// This is temporary just so we'll have enough items to play with
const ITEMS_RANGE = 5;
function generateMonthItems() {
  const today = new Date();
  const currentYear = today.getFullYear();

  const monthItems = [];

  for (let year = currentYear - ITEMS_RANGE; year <= currentYear + ITEMS_RANGE; year++) {
    for (let month = 0; month < 12; month++) {
      monthItems.push({year, month});
    }
  }

  return monthItems;
}
const MONTH_ITEMS = generateMonthItems();

function Calendar(props: PropsWithChildren<CalendarProps>) {
  const {data, children, initialDate = Date.now(), firstDayOfWeek = FirstDayOfWeek.Monday} = props;
  const current = useSharedValue<number>(initialDate);

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

  const renderCalendarItem = useCallback(({item}) => {
    return <CalendarItem year={item.year} month={item.month}/>;
  }, []);

  return (
    <CalendarContext.Provider value={contextValue}>
      {/* <View> */}
      <FlashList
        data={MONTH_ITEMS}
        // initialScrollIndex={Math.floor(MONTH_ITEMS.length / 2)}
        renderItem={renderCalendarItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      {/* </View> */}
      {children}
    </CalendarContext.Provider>
  );
}

Calendar.Agenda = Agenda;

export default Calendar;
