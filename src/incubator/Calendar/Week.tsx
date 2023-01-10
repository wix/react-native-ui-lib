import _ from 'lodash';
import React, {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import View from '../../components/view';
import Text from '../../components/text';
import Day from './Day';
import {WeekProps} from './types';
import {getDaysOfWeekNumber} from './helpers/DateUtils';
import CalendarContext from './CalendarContext';

const Week = (props: WeekProps) => {
  const {weekNumber, year} = props;

  const {firstDayOfWeek} = useContext(CalendarContext);

  const days = useMemo(() => {
    return getDaysOfWeekNumber(year, weekNumber, firstDayOfWeek);
  }, [year, weekNumber, firstDayOfWeek]);

  return (
    <View row>
      <Text style={styles.weekNumber}>{weekNumber}</Text>
      {_.map(days, day => (
        <Day date={day}/>
      ))}
    </View>
  );
};

export default Week;

const styles = StyleSheet.create({
  weekNumber: {
    borderWidth: 1,
    width: 24,
    color: 'grey'
  }
});
