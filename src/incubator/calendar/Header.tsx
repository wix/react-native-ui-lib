import throttle from 'lodash/throttle';
import React, {useContext, useCallback} from 'react';
import {StyleSheet, TextInput, Text, LayoutChangeEvent} from 'react-native';
import Reanimated, {useAnimatedProps} from 'react-native-reanimated';
import {Colors, Typography} from 'style';
import View from '../../components/view';
import Button from '../../components/button';
import {getDateObject, getMonthForIndex, addMonths} from './helpers/DateUtils';
import {HeaderProps, DayNamesFormat, UpdateSource} from './types';
import CalendarContext from './CalendarContext';
import WeekDaysNames from './WeekDaysNames';

// Note: this fixes the updates on the header month title
Reanimated.addWhitelistedNativeProps({text: true});

const ARROWS_THROTTLE_TIME = 300;
const ARROWS_THROTTLE_OPTIONS = {leading: true, trailing: false};
const WEEK_NUMBER_WIDTH = 32;
const ARROW_NEXT = require('./assets/arrowNext.png');
const ARROW_BACK = require('./assets/arrowBack.png');

const AnimatedTextInput = Reanimated.createAnimatedComponent(TextInput);

const Header = (props: HeaderProps) => {
  const {month, year} = props;
  const {selectedDate, setDate, showWeeksNumbers, staticHeader, setHeaderHeight} = useContext(CalendarContext);

  const getNewDate = useCallback((count: number) => {
    return addMonths(selectedDate.value, count, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLeftArrowPress = useCallback(throttle(() => {
    setDate(getNewDate(-1), UpdateSource.MONTH_ARROW);
  }, ARROWS_THROTTLE_TIME, ARROWS_THROTTLE_OPTIONS),
  [setDate, getNewDate]);

  const onRightArrowPress = useCallback(throttle(() => {
    setDate(getNewDate(1), UpdateSource.MONTH_ARROW);
  }, ARROWS_THROTTLE_TIME, ARROWS_THROTTLE_OPTIONS),
  [setDate, getNewDate]);

  const getTitle = useCallback((date: number) => {
    'worklet';
    const dateObject = getDateObject(date);
    const m = dateObject.month;
    const y = dateObject.year;
    return getMonthForIndex(m) + ` ${y}`;
  }, []);

  const animatedProps = useAnimatedProps(() => {
    // get called only on value update
    return {
      text: getTitle(selectedDate.value)
    };
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight?.(event.nativeEvent.layout.height);
  },
  [setHeaderHeight]);

  const renderTitle = () => {
    if (!staticHeader) {
      const title = getMonthForIndex(month!) + ` ${year}`;
      return <Text style={styles.title}>{title}</Text>;
    }
    return (
      //@ts-expect-error - hack to animate the title text change
      <AnimatedTextInput
        value={getTitle(selectedDate.value)} // setting initial value
        {...{animatedProps}}
        editable={false}
        style={styles.title}
      />
    );
  };

  const renderArrow = (source: number, onPress: () => void) => {
    return <Button link size={Button.sizes.xSmall} iconSource={source} onPress={onPress}/>;
  };

  const renderNavigation = () => {
    return (
      <View row spread style={styles.navigation}>
        {renderArrow(ARROW_BACK, onLeftArrowPress)}
        {renderTitle()}
        {renderArrow(ARROW_NEXT, onRightArrowPress)}
      </View>
    );
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {renderNavigation()}
      <WeekDaysNames
        format={DayNamesFormat.LONG_ABBREVIATION}
        containerStyle={[styles.weekDaysNames, showWeeksNumbers && {marginLeft: WEEK_NUMBER_WIDTH}]}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {},
  navigation: {
    marginTop: 12,
    marginBottom: 16,
    marginHorizontal: 8
  },
  title: {
    color: Colors.$textDefault,
    paddingVertical: 0, // for Android inner paddings
    ...Typography.text60
  },
  weekDaysNames: {
    marginBottom: 8,
    marginHorizontal: 16
  }
});
