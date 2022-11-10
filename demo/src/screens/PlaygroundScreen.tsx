// TODO: Fix month scroll after moving CalendarList to FlashList
import _ from 'lodash';
import React, {Component, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, FlatList, TextInput} from 'react-native';
import {View, Text, Card, TextField, Button, Constants, TouchableOpacity, Colors} from 'react-native-ui-lib'; //eslint-disable-line
import {FlashList} from '@shopify/flash-list';
import Reanimated, {
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  scrollTo,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  runOnJS,
  measure,
  useAnimatedProps,
  useDerivedValue
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const AnimatedTextInput = Reanimated.createAnimatedComponent(TextInput);
const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);
const AnimatedFlashList = Reanimated.createAnimatedComponent(FlashList);

const viewabilityConfig = {
  minimumViewTime: 100,
  waitForInteraction: true
};

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-grey80 flex>
        <Calendar>
          <Header/>
          <Expandable expandedElement={<CalendarMonthsList/>} collapsedElement={<CalendarWeeksList/>}/>
          <AgendaList/>
        </Calendar>
      </View>
    );
  }
}

const CalendarContext = React.createContext<{
  currentDate: SharedValue<string>;
  setDate:(date: string) => void;
  prevMonth: (date: string) => void;
  nextMonth: (date: string) => void;
}>();
const Calendar = ({children}) => {
  const listRef = useAnimatedRef();
  const currentDate = useSharedValue(MONTHS_ITEMS[0] + '-13');
  const offset = useSharedValue(0);
  // const [currentDate, setDate] = useState('');

  const setDate = useCallback((date: string) => {
    'worklet';
    currentDate.value = date;
  }, []);

  const prevMonth = useCallback((date: string) => {
    'worklet';

    offset.value -= Constants.screenWidth;
    scrollTo(listRef, offset.value, 0, true);
  }, []);

  const nextMonth = useCallback((date: string) => {
    'worklet';
    offset.value += Constants.screenWidth;

    scrollTo(listRef, offset.value, 0, true);
    // listRef.current.scrollToOffset({animated: true, offset: offset.value});
  }, []);

  const contextValue = useMemo(() => {
    return {
      currentDate,
      setDate,
      listRef,
      prevMonth,
      nextMonth
    };
  }, []);
  return <CalendarContext.Provider value={contextValue}>{children}</CalendarContext.Provider>;
};

const Expandable = ({expandedElement, collapsedElement}) => {
  const expandedRef = useAnimatedRef();
  const collapsedRef = useAnimatedRef();
  const expanded = useSharedValue(1);
  const expandedHeight = useSharedValue<number | undefined>(undefined);
  const collapsedHeight = useSharedValue<number | undefined>(undefined);

  const onExpandedLayout = useCallback(() => {
    if (!expandedHeight.value) {
      expandedRef.current?.measure?.((_x, _y, _width, height) => {
        expandedHeight.value = height;
      });
    }
  }, []);

  const onCollapsedLayout = useCallback(() => {
    if (!collapsedHeight.value) {
      collapsedRef.current?.measure?.((_x, _y, _width, height) => {
        collapsedHeight.value = height;
      });
    }
  }, []);

  const drag = Gesture.Tap().onEnd(() => {
    if (!expandedHeight.value) {
      const expandedMeasure = measure(expandedRef);
      expandedHeight.value = expandedMeasure.height;
    }

    if (!collapsedHeight.value) {
      const collapsedMeasure = measure(collapsedRef);
      collapsedHeight.value = collapsedMeasure.height;
    }

    expanded.value = Number(!expanded.value);
  });

  const containerStyle = useAnimatedStyle(() => {
    if (expandedHeight.value && collapsedHeight.value) {
      return {
        overflow: 'hidden',
        minHeight: collapsedHeight.value,
        height: withTiming(expanded.value ? expandedHeight.value : collapsedHeight.value)
      };
    }

    return {};
  });

  const expandedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(Number(expanded.value)),
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    };
  });

  const collapsedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(Number(!expanded.value))
      // position: 'absolute',
      // left: 0,
      // right: 0,
      // top: 0,
    };
  });

  return (
    <View>
      <View reanimated style={containerStyle}>
        <View reanimated ref={expandedRef} style={expandedStyle} onLayout={onExpandedLayout}>
          {expandedElement}
        </View>
        <View reanimated ref={collapsedRef} style={collapsedStyle} onLayout={onCollapsedLayout}>
          {collapsedElement}
        </View>
      </View>
      <GestureDetector gesture={drag}>
        <View reanimated center paddingV-s4>
          <Text>KNOB</Text>
        </View>
      </GestureDetector>
    </View>
  );
};

const Header = () => {
  const context = useContext(CalendarContext);

  const monthTitle = useDerivedValue(() => {
    console.log('ethan - derived', context.currentDate.value);
    const {month} = getDateObject(context.currentDate.value);
    return `Month ${month}`;
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: monthTitle.value
    };
  });

  const backPress = Gesture.Tap().onEnd(() => {
    const newDate = updateMonth(context.currentDate.value, -1);
    context.setDate(newDate);
  });

  const nextPress = Gesture.Tap().onEnd(() => {
    const newDate = updateMonth(context.currentDate.value, 1);
    context.setDate(newDate);
  });

  return (
    <View row spread padding-s2>
      <GestureDetector gesture={backPress}>
        <View padding-s2>
          <Text>PREV</Text>
        </View>
      </GestureDetector>
      {/* <Reanimated.Text {...{animatedProps}}/> */}
      <AnimatedTextInput {...{animatedProps}} editable={false}/>
      <GestureDetector gesture={nextPress}>
        <View padding-s2>
          <Text>NEXT</Text>
        </View>
      </GestureDetector>
    </View>
  );
};

const CalendarMonthsList = () => {
  const context = useContext(CalendarContext);
  const listRef = useRef<FlashList<string>>();
  // const aref = useAnimatedRef();

  const scrollToMonth = (monthItem: string) => {
    listRef.current?.scrollToItem({animated: true, item: monthItem});
  };

  useAnimatedReaction(() => context.currentDate.value,
    (date: string, prevDate: string | null) => {
      if (prevDate && date) {
        const {month, year} = getDateObject(date);
        const {month: prevMonth} = getDateObject(prevDate);

        const monthDiff = month - prevMonth;
        if (monthDiff) {
          // monthDiff > 0 ? context.nextMonth(date) : context.prevMonth(date);

          const monthItem = `${year}-${month}`;
          runOnJS(scrollToMonth)(monthItem);
        }
      }
    });

  const keyExtractor = useCallback(item => item, []);
  const renderItem = useCallback(({item}) => {
    return <MonthView item={item}/>;
  }, []);

  const renderList = () => {
    return (
      <AnimatedFlashList
        ref={listRef}
        data={MONTHS_ITEMS}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        keyExtractor={keyExtractor}
        estimatedItemSize={Constants.screenWidth}
      />
    );
    // return (
    //   <AnimatedFlatList
    //     ref={context.listRef}
    //     data={DATA}
    //     renderItem={renderItem}
    //     horizontal
    //     pagingEnabled
    //     keyExtractor={keyExtractor}
    //     initialNumToRender={3}
    //     maxToRenderPerBatch={2}
    //     windowSize={4}
    //     // updateCellsBatchingPeriod={15000}
    //   />
    // );
  };

  return <View>{renderList()}</View>;
};

const CalendarWeeksList = () => {
  const listRef = useRef<FlashList<string>>();

  const keyExtractor = useCallback(item => item, []);
  const renderItem = useCallback(({item}: {item: string}) => {
    const [dateString, weekNumber] = item.split('/');
    return <WeekView item={dateString} weekNumber={weekNumber}/>;
  }, []);

  return (
    <AnimatedFlashList
      ref={listRef}
      data={WEEK_ITEMS}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      keyExtractor={keyExtractor}
      estimatedItemSize={Constants.screenWidth}
    />
  );
};

const MonthView = React.memo(({item}: {item: string}) => {
  const {year, month} = getDateObject(item);
  // const context = useContext(CalendarContext);
  // const isCurrent = useSharedValue(1);

  const numberOfWeeks = getNumberOfWeeksInMonth(year, month);

  const monthDays = useMemo(() => {
    return getMonthDaysArray(year, month);
  }, [year, month]);

  const style = useMemo(() => {
    return {
      width: Constants.screenWidth
      // display: isCurrent.value ? 'flex' : 'none'
    };
  }, []);

  return (
    <View style={style}>
      <WeekDaysHeader/>
      {_.times(numberOfWeeks).map(week => {
        const weekData = monthDays.slice(week * 7, week * 7 + 7);
        return (
          <Week
            key={week}
            //key={`${year}.${month}.${week}`}
            week={weekData}
            item={item}
          />
        );
      })}
    </View>
  );
});

const WeekView = ({item, weekNumber}) => {
  const {year, month} = getDateObject(item);

  const weekDays = useMemo(() => {
    const monthDays = getMonthDaysArray(year, month);
    return monthDays.slice(weekNumber * 7, weekNumber * 7 + 7);
  }, [year, month, weekNumber]);

  const style = useMemo(() => {
    return {
      width: Constants.screenWidth
    };
  }, []);

  return (
    <View style={style}>
      <WeekDaysHeader/>
      <Week week={weekDays} item={item}/>
    </View>
  );
};

const WeekDaysHeader = () => {
  return (
    <View row>
      <Text flex center>
        S
      </Text>
      <Text flex center>
        M
      </Text>
      <Text flex center>
        T
      </Text>
      <Text flex center>
        W
      </Text>
      <Text flex center>
        T
      </Text>
      <Text flex center>
        F
      </Text>
      <Text flex center>
        S
      </Text>
    </View>
  );
};

const Week = ({week, item}: {item: string}) => {
  const {year, month} = getDateObject(item);
  const context = useContext(CalendarContext);

  const onPress = useCallback(({customValue: date}) => {
    context.setDate(date);
  }, []);

  return (
    <View row>
      {week.map((day, index) => {
        const dayString = day ? `${year}-${month}-${day}` : '';
        const isSelected = dayString === context.currentDate;
        return (
          <Day
            // key={`${year}.${month}.${day ?? 'empty.' + index}`}
            key={index}
            date={dayString}
            // isSelected={isSelected}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const Day = React.memo(({date, onPress}: {date: string}) => {
  const context = useContext(CalendarContext);
  const isSelected = useSharedValue(Number(date && context.currentDate.value === date));

  useAnimatedReaction(() => Number(date && context.currentDate.value === date),
    (selected, wereSelected) => {
      if (selected && !wereSelected) {
        isSelected.value = 1;
      } else if (!selected && wereSelected) {
        isSelected.value = 0;
      }
    });
  const day = date ? date.split('-')[2] : '';

  const press = Gesture.Tap().onEnd(() => {
    context.setDate(date);
  });

  const style = useAnimatedStyle(() => {
    // const isSelected = date && date === context.currentDate.value;
    // const backgroundColor = isSelected ? 'red' : 'transparent';
    return {
      // backgroundColor: isSelected.value ? 'red' : 'transparent',
      backgroundColor: withTiming(isSelected.value ? Colors.primary : 'transparent', {duration: 60}),
      borderRadius: 999
    };
  });

  return (
    <GestureDetector gesture={press}>
      {/*  <TouchableOpacity
       activeOpacity={1}
       flex
       center
       onPress={onPress}
       customValue={date}
       bg-red30={isSelected}
     > */}
      <View flex center paddingV-s2 reanimated style={style}>
        <Text>{day}</Text>
      </View>
      {/* </TouchableOpacity> */}
    </GestureDetector>
  );
});

const AgendaList = () => {
  const listRef = useRef<FlashList<string>>(null);
  const context = useContext(CalendarContext);

  const scrolledByUser = useSharedValue(false);

  const scrollTo = useCallback(date => {
    listRef.current?.scrollToItem({animated: true, item: date});
  }, []);

  useAnimatedReaction(() => {
    if (!scrolledByUser.value) {
      return context.currentDate.value;
    }
    return null;
  },
  date => {
    if (date) {
      runOnJS(scrollTo)(date);
    }
  });

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const date = viewableItems?.[0]?.item;

    if (scrolledByUser.value) {
      if (date) {
        context.setDate(date);
      }
    }
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onMomentumBegin: () => {
      scrolledByUser.value = true;
    },
    onMomentumEnd: () => {
      scrolledByUser.value = false;
    }
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     listRef.current?.scrollToItem({animated: true, item: '2022-2-17'});
  //   }, 2500);
  // }, []);
  const renderItem = useCallback(({item}) => {
    return (
      <View padding-s4 row style={{borderBottomWidth: 1}}>
        <Card flex padding-s2 onPress={() => {}}>
          <View>
            <Text>{item}</Text>
          </View>
          <View paddingL-s3>
            <Text>Class</Text>
            <Text>3 Members</Text>
            <Text>Dizzingof Center</Text>
          </View>
        </Card>
      </View>
    );
  }, []);

  return (
    <AnimatedFlashList
      ref={listRef}
      data={EVENTS_IDS}
      pagingEnabled={false}
      renderItem={renderItem}
      estimatedItemSize={84}
      onScroll={scrollHandler}
      onViewableItemsChanged={onViewableItemsChanged}
      // Note: This makes onMomentumBegin work on Android
      onMomentumScrollBegin={() => {}}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

const styles = StyleSheet.create({
  container: {}
});

function getDateObject(dateString: string) {
  'worklet';
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    return {year, month, day};
  } catch (error) {
    console.error(`getDateObject failed on`, dateString, error);
  }
}

function updateMonth(dateString: string, monthsCount: number) {
  'worklet';

  const {year, month} = getDateObject(dateString);
  const nextMonth = (month + monthsCount) % 12;
  let nextYear = year;
  if (nextMonth === 0 && monthsCount > 0) {
    nextYear++;
  } else if (nextMonth === 11 && monthsCount < 0) {
    nextYear--;
  }

  return `${nextYear}-${nextMonth}-${1}`;
}

function getNumberOfDaysInMonth(year: number, month: number) {
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  return numberOfDays;
}

function getNumberOfWeeksInMonth(year: number, month: number) {
  const numberOfDays = getNumberOfDaysInMonth(year, month);
  const dayOfTheWeek = getWeekDay(year, month);
  const numberOfWeeks = Math.ceil((numberOfDays + dayOfTheWeek) / 7);
  return numberOfWeeks;
}

function getWeekDay(year: number, month: number, day = 1) {
  return new Date(year, month, day).getDay();
}

function getMonthDaysArray(year, month) {
  const numberOfDays = getNumberOfDaysInMonth(year, month);
  const numberOfWeeks = getNumberOfWeeksInMonth(year, month);
  const dayOfTheWeek = getWeekDay(year, month);

  const monthDays = _.times<number | null>(numberOfWeeks * 7, () => null);
  for (let i = dayOfTheWeek; i < dayOfTheWeek + numberOfDays; i++) {
    monthDays[i] = i - dayOfTheWeek + 1;
  }

  return monthDays;
}

const YEARS = [2022, 2023, 2024, 2025, 2026];
const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MONTHS_ITEMS = YEARS.map(y => MONTHS.map(m => `${y}-${m}` /* ({year: y, month: m}) */)).flat();
const WEEK_ITEMS = MONTHS_ITEMS.map(monthItem => {
  const {year, month} = getDateObject(monthItem);
  const numberOfWeeks = getNumberOfWeeksInMonth(year, month);
  return _.times(numberOfWeeks, weekNumber => {
    return `${monthItem}/${weekNumber}`;
  });
}).flat();

const EVENTS = [];
MONTHS_ITEMS.forEach(item => {
  const {year, month} = getDateObject(item);
  const numberOfDays = getNumberOfDaysInMonth(year, month);
  _.times(numberOfDays).forEach(day => {
    const dateString = `${year}-${month}-${day}`;
    const event = {
      date: dateString,
      title: `Event Title (${dateString})`
    };
    EVENTS.push(event);
  });
});

const EVENTS_IDS = EVENTS.map(e => e.date);