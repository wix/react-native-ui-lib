import React, {PropsWithChildren, useCallback, useMemo, useRef, useState} from 'react';
import {useSharedValue, useAnimatedReaction, runOnJS} from 'react-native-reanimated';
import {FlashListPackage} from 'optionalDeps';
import {Constants} from '../../commons/new';
import {generateMonthItems} from './helpers/CalendarProcessor';
import {addHeaders} from './helpers/DataProcessor';
import {isSameMonth, /* addYears, */ getDateObject} from './helpers/DateUtils';
import {CalendarContextProps, CalendarProps, FirstDayOfWeek, UpdateSource, DateObjectWithOptionalDay} from './types';
import CalendarContext from './CalendarContext';
import CalendarItem from './CalendarItem';
import Agenda from './Agenda';
import TodayButton from './TodayButton';
import Header from './Header';
import {useDidUpdate} from 'hooks';

const FlashList = FlashListPackage?.FlashList;

const VIEWABILITY_CONFIG = {itemVisiblePercentThreshold: 95, minimumViewTime: 1000};
const YEARS_RANGE = 5;
const PAGE_RELOAD_THRESHOLD = 3;
const NOW = new Date().setHours(0, 0, 0, 0);

function Calendar(props: PropsWithChildren<CalendarProps>) {
  const {
    data,
    children,
    initialDate = NOW,
    onChangeDate,
    firstDayOfWeek = FirstDayOfWeek.MONDAY,
    staticHeader = false,
    showExtraDays = true
  } = props;

  const [monthItems] = useState<DateObjectWithOptionalDay[]>(() =>
    generateMonthItems(initialDate, YEARS_RANGE, YEARS_RANGE));

  const getItemIndex = useCallback((date: number) => {
    'worklet';
    const dateObject = getDateObject(date);
    for (let i = 0; i < monthItems.length; i++) {
      if (monthItems[i].month === dateObject.month && monthItems[i].year === dateObject.year) {
        return i;
      }
    }
    return -1;
  },
  [monthItems]);

  const flashListRef = useRef(undefined);
  const current = useSharedValue<number>(new Date(initialDate).setHours(0, 0, 0, 0));
  const initialMonthIndex = useRef(getItemIndex(current.value));
  const lastUpdateSource = useSharedValue<UpdateSource>(UpdateSource.INIT);
  const processedData = useMemo(() => addHeaders(data), [data]);
  const scrolledByUser = useSharedValue<boolean>(false);
  const headerHeight = useSharedValue(0);

  const setDate = useCallback<CalendarContextProps['setDate']>((date: number, updateSource: UpdateSource) => {
    current.value = date;
    lastUpdateSource.value = updateSource;
    if (updateSource !== UpdateSource.PROP_UPDATE) {
      onChangeDate?.(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    scrolledByUser.value = false;
    // @ts-expect-error
    flashListRef.current?.scrollToIndex({index, animated: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },
  [getItemIndex]);

  useDidUpdate(() => {
    setDate(initialDate, UpdateSource.PROP_UPDATE);
  }, [initialDate]);

  useDidUpdate(() => {
    console.log('Update items');
    const index = getItemIndex(current.value);
    scrollToIndex(index);
  }, [monthItems, getItemIndex]);

  const setHeaderHeight = useCallback((height: number) => {
    headerHeight.value = height;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo<CalendarContextProps>(() => {
    return {
      data: processedData,
      firstDayOfWeek,
      selectedDate: current,
      setDate,
      showWeeksNumbers: true,
      showExtraDays,
      updateSource: lastUpdateSource,
      staticHeader,
      setHeaderHeight,
      headerHeight,
      today: NOW
    };
  }, [processedData, staticHeader, showExtraDays, firstDayOfWeek]);

  /** Pages reload */

  // const mergeArrays = (prepend: boolean, array: DateObjectWithOptionalDay[], newArray: DateObjectWithOptionalDay[]) => {
  //   const arr: DateObjectWithOptionalDay[] = array.slice();
  //   if (prepend) {
  //     arr.unshift(...newArray);
  //   } else {
  //     arr.push(...newArray);
  //   }
  //   return arr;
  // };

  const addPages = useCallback((/* index: number */) => {
    // const prepend = index < PAGE_RELOAD_THRESHOLD;
    // const append = index > items.length - PAGE_RELOAD_THRESHOLD;
    // const pastRange = prepend ? YEARS_RANGE : 0;
    // const futureRange = append ? YEARS_RANGE : 0;
    // const newDate = addYears(current.value, prepend ? -1 : 1);
    // const newItems = generateMonthItems(newDate, pastRange, futureRange);
    // const newArray = mergeArrays(prepend, items, newItems);
    // setMonthItems(newArray);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  },
  [monthItems]);

  const shouldAddPages = useCallback((index: number) => {
    'worklet';
    return index !== -1 && (index < PAGE_RELOAD_THRESHOLD || index > monthItems.length - PAGE_RELOAD_THRESHOLD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },
  [monthItems]);

  useAnimatedReaction(() => {
    return current.value;
  },
  (selected: number, previous: number | null) => {
    const index = getItemIndex(selected);

    if (shouldAddPages(index)) {
      console.log('Add new pages: ', index, monthItems.length);
      runOnJS(addPages)(/* index */);
    } else if (lastUpdateSource.value !== UpdateSource.MONTH_SCROLL) {
      if (previous && !isSameMonth(selected, previous)) {
        runOnJS(scrollToIndex)(index);
      }
    }
  },
  [getItemIndex]);

  /** Events */

  // eslint-disable-next-line max-len
  const onViewableItemsChanged = useCallback(({viewableItems}: {viewableItems: {item: DateObjectWithOptionalDay}[]}) => {
    const item = viewableItems?.[0]?.item;
    if (item && scrolledByUser.value) {
      if (!isSameMonth(item, current.value)) {
        const newDate = getDateObject({year: item.year, month: item.month, day: 1}).timestamp;
        setDate(newDate, UpdateSource.MONTH_SCROLL);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },
  []);

  const onMomentumScrollBegin = useCallback(() => {
    scrolledByUser.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScrollBeginDrag = useCallback(() => {
    scrolledByUser.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCalendarItem = useCallback(({item}: any) => {
    if (!staticHeader || headerHeight.value) {
      // item is rendered before static header height is calculated so it leaves extra space
      return <CalendarItem year={item.year} month={item.month}/>;
    }
  }, []);

  return (
    <CalendarContext.Provider value={contextValue}>
      {staticHeader && <Header/>}
      <FlashList
        ref={flashListRef}
        estimatedItemSize={Constants.screenWidth}
        data={monthItems}
        initialScrollIndex={initialMonthIndex.current}
        estimatedFirstItemOffset={0}
        renderItem={renderCalendarItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // TODO: Consider moving this shared logic with Agenda to a hook
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollBeginDrag={onScrollBeginDrag}
      />
      {children}
      <TodayButton/>
    </CalendarContext.Provider>
  );
}

Calendar.Agenda = Agenda;

export default Calendar;
