import findIndex from 'lodash/findIndex';
import React, {PropsWithChildren, useCallback, useMemo, useRef} from 'react';
import {useSharedValue, useAnimatedReaction, runOnJS} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';
import {generateMonthItems} from './helpers/CalendarProcessor';
import {addHeaders} from './helpers/DataProcessor';
import {isSameMonth, getDateObject} from './helpers/DateUtils';
import {CalendarContextProps, CalendarProps, FirstDayOfWeek, UpdateSource} from './types';
import CalendarContext from './CalendarContext';
import CalendarItem from './CalendarItem';
import Agenda from './Agenda';

// TODO: Move this logic elsewhere to pre-generate on install?
const MONTH_ITEMS = generateMonthItems(5);

function Calendar(props: PropsWithChildren<CalendarProps>) {
  const {data, children, initialDate = Date.now(), firstDayOfWeek = FirstDayOfWeek.MONDAY} = props;
  const flashListRef = useRef();

  const current = useSharedValue<number>(initialDate);
  const lastUpdateSource = useSharedValue<UpdateSource | undefined>(undefined);
  const processedData = useMemo(() => addHeaders(data), [data]);

  const setDate = useCallback<CalendarContextProps['setDate']>((date: number, updateSource: UpdateSource) => {
    current.value = date;
    lastUpdateSource.value = updateSource;
  }, []);

  const contextValue = useMemo<CalendarContextProps>(() => {
    return {
      data: processedData,
      firstDayOfWeek,
      selectedDate: current,
      setDate,
      showWeeksNumbers: true,
      updateSource: lastUpdateSource
    };
  }, []);

  const getIndex = (date: number) => {
    const dateObject = getDateObject(date);
    return findIndex(MONTH_ITEMS, (item) => item.year === dateObject.year && item.month === dateObject.month);
  };

  const scrollToIndex = useCallback((date: number) => {
    flashListRef.current?.scrollToIndex({index: getIndex(date), animated: false});
  }, []);

  useAnimatedReaction(() => {
    return current.value;
  }, (selected, previous) => {
    if (lastUpdateSource.value !== UpdateSource.MONTH_SCROLL) {
      // TODO: !previous || for first load - replace with 'initialScrollIndex' and change to previous &&
      if (!previous || !isSameMonth(selected, previous)) {
        runOnJS(scrollToIndex)(selected);
      }
    }
  }, []);

  const renderCalendarItem = useCallback(({item}) => {
    return <CalendarItem year={item.year} month={item.month}/>;
  }, []);

  return (
    <CalendarContext.Provider value={contextValue}>
      <FlashList
        ref={flashListRef}
        estimatedItemSize={353}
        data={MONTH_ITEMS}
        // initialScrollIndex={Math.floor(MONTH_ITEMS.length / 2)}
        renderItem={renderCalendarItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      {children}
    </CalendarContext.Provider>
  );
}

Calendar.Agenda = Agenda;

export default Calendar;
