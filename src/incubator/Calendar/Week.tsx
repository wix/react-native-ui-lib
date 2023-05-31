import _ from 'lodash';
import React, {useContext, useMemo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import View from '../../components/view';
import Text from '../../components/text';
import {getDaysOfWeekNumber, getDateObject} from './helpers/DateUtils';
import {WeekProps} from './types';
import CalendarContext from './CalendarContext';
import Day from './Day';


const WEEK_NUMBER_WIDTH = 20;

const Week = (props: WeekProps) => {
  const {weekNumber, year, month} = props;

  const {firstDayOfWeek, showWeeksNumbers} = useContext(CalendarContext);

  const days = useMemo(() => {
    return getDaysOfWeekNumber(year, weekNumber, firstDayOfWeek);
  }, [year, weekNumber, firstDayOfWeek]);

  const renderWeekNumbers = () => {
    if (showWeeksNumbers) {
      return <Text center $textNeutral numberOfLines={1} style={styles.weekNumber}>{weekNumber}</Text>;
    }
  };

  const isExtraDay = useCallback((day: number) => {
    const dayMonth = getDateObject(day).month;
    return dayMonth !== month;
  }, [month]);

  return (
    <View row>
      {renderWeekNumbers()}
      {_.map(days, day => (
        <Day key={day} date={day} inactive={isExtraDay(day)}/>
      ))}
    </View>
  );
};

export default Week;

const styles = StyleSheet.create({
  weekNumber: {
    width: WEEK_NUMBER_WIDTH,
    alignSelf: 'center'
  }
});
