import _ from 'lodash';
import React, {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import View from '../../components/view';
import Text from '../../components/text';
import {getDaysOfWeekNumber} from './helpers/DateUtils';
import {WeekProps} from './types';
import CalendarContext from './CalendarContext';
import Day from './Day';

const Week = (props: WeekProps) => {
  const {weekNumber, year} = props;

  const {firstDayOfWeek, showWeeksNumbers} = useContext(CalendarContext);

  const days = useMemo(() => {
    return getDaysOfWeekNumber(year, weekNumber, firstDayOfWeek);
  }, [year, weekNumber, firstDayOfWeek]);

  const renderWeekNumbers = () => {
    if (showWeeksNumbers) {
      return <Text center $textNeutral style={styles.weekNumber}>{weekNumber}</Text>;
    }
  };

  return (
    <View row>
      {renderWeekNumbers()}
      {_.map(days, day => (
        <Day date={day}/>
      ))}
    </View>
  );
};

export default Week;

const styles = StyleSheet.create({
  weekNumber: {
    width: 18,
    alignSelf: 'center'
  }
});
