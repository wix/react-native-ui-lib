import React, {PropsWithChildren, useCallback, useMemo, useRef, useState} from 'react';
import {useSharedValue, useAnimatedReaction, runOnJS} from 'react-native-reanimated';
import {FlashListPackage} from 'optionalDeps';
import {Constants} from '../../commons/new';
import {generateMonthItems} from './helpers/CalendarProcessor';
import {addHeaders} from './helpers/DataProcessor';
import {isSameMonth, getTimestamp, addYears} from './helpers/DateUtils';
import {CalendarContextProps, CalendarProps, FirstDayOfWeek, UpdateSource, DateObjectWithOptionalDay} from './types';
import CalendarContext from './CalendarContext';
import CalendarItem from './CalendarItem';
import Agenda from './Agenda';
import TodayButton from './TodayButton';
import Header from './Header';
import {useDidUpdate} from 'hooks';

const {FlashList} = FlashListPackage;

const VIEWABILITY_CONFIG = {itemVisiblePercentThreshold: 95, minimumViewTime: 200};
const YEARS_RANGE = 1;
const PAGE_RELOAD_THRESHOLD = 3;
const NOW = Date.now(); // so the 'initialDate' effect won't get called since the now differes on every rerender 

function Calendar(props: PropsWithChildren<CalendarProps>) {
  const {
    data,
    children,
    initialDate = NOW,
    firstDayOfWeek = FirstDayOfWeek.MONDAY,
    staticHeader = false,
    showExtraDays = true
  } = props;

  const initialItems = generateMonthItems(initialDate, YEARS_RANGE, YEARS_RANGE);
  const [items, setItems] = useState<DateObjectWithOptionalDay[]>(initialItems);

  const getItemIndex = useCallback((date: number) => {
    'worklet';
    for (let i = 0; i < items.length; i++) {
      if (isSameMonth(items[i], date)) {
        return i;
      }
    }
    return -1;
  }, [items]);

  const flashListRef = useRef();
  const current = useSharedValue<number>(initialDate);
  const initialMonthIndex = useRef(getItemIndex(current.value));
  const lastUpdateSource = useSharedValue<UpdateSource>(UpdateSource.INIT);
  const processedData = useMemo(() => addHeaders(data), [data]);
  const scrolledByUser = useSharedValue<boolean>(false);
  const headerHeight = useSharedValue(0);

  const setDate = useCallback<CalendarContextProps['setDate']>((date: number, updateSource: UpdateSource) => {
    current.value = date;
    lastUpdateSource.value = updateSource;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    scrolledByUser.value = false;
    // @ts-expect-error
    flashListRef.current?.scrollToIndex({index, animated: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getItemIndex]);

  useDidUpdate(() => {
    setDate(initialDate, UpdateSource.PROP_UPDATE);
  }, [initialDate]);

  useDidUpdate(() => {
    const index = getItemIndex(current.value);
    scrollToIndex(index);
  }, [items, getItemIndex]);

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
      headerHeight
    };
  }, []);

  /** Pages reload */

  const mergeArrays = (prepend: boolean, array: DateObjectWithOptionalDay[], newArray: DateObjectWithOptionalDay[]) => {
    const arr: DateObjectWithOptionalDay[] = array.slice();
    if (prepend) {
      arr.unshift(...newArray);
    } else {
      arr.push(...newArray);
    }
    return arr;
  };

  const addPages = useCallback((index: number) => {
    const prepend = index < PAGE_RELOAD_THRESHOLD;
    const append = index > items.length - PAGE_RELOAD_THRESHOLD;
    const pastRange = prepend ? YEARS_RANGE : 0;
    const futureRange = append ? YEARS_RANGE : 0;
    const newDate = addYears(current.value, prepend ? -1 : 1);
    const newItems = generateMonthItems(newDate, pastRange, futureRange);
    const newArray = mergeArrays(prepend, items, newItems);
    setItems(newArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const shouldAddPages = useCallback((index: number) => {
    'worklet';
    return index !== -1 && 
      (index < PAGE_RELOAD_THRESHOLD || index > items.length - PAGE_RELOAD_THRESHOLD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useAnimatedReaction(() => {
    return current.value;
  },
  (selected, previous) => {
    const index = getItemIndex(selected);
    const shouldReloadPages = shouldAddPages(index);

    if (lastUpdateSource.value !== UpdateSource.MONTH_SCROLL) {
      if (previous && !isSameMonth(selected, previous)) {
        if (!shouldReloadPages) {
          runOnJS(scrollToIndex)(index);
        }
      }
    }

    if (shouldReloadPages) {
      runOnJS(addPages)(index);
    }
  }, [getItemIndex]);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const item = viewableItems?.[0]?.item;
    if (item && scrolledByUser.value) {
      if (!isSameMonth(item, current.value)) {
        const newDate = getTimestamp({year: item.year, month: item.month, day: 1});
        setDate(newDate, UpdateSource.MONTH_SCROLL);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMomentumScrollBegin = useCallback(() => {
    scrolledByUser.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScrollBeginDrag = useCallback(() => {
    scrolledByUser.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCalendarItem = useCallback(({item}) => {
    return <CalendarItem year={item.year} month={item.month}/>;
  }, []);

  return (
    <CalendarContext.Provider value={contextValue}>
      {staticHeader && <Header/>}
      <FlashList
        ref={flashListRef}
        estimatedItemSize={Constants.screenWidth}
        data={items}
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
