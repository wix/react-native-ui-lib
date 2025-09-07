import map from 'lodash/map';
import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import View from "../../components/view";
import Text from "../../components/text";
import { getDaysOfWeekNumber } from "./helpers/DateUtils";
import CalendarContext from "./CalendarContext";
import Day from "./Day";
const WEEK_NUMBER_WIDTH = 20;
const Week = props => {
  const {
    weekNumber,
    year,
    month
  } = props;
  const {
    firstDayOfWeek,
    showWeeksNumbers
  } = useContext(CalendarContext);
  const days = useMemo(() => {
    return getDaysOfWeekNumber(year, weekNumber, firstDayOfWeek);
  }, [year, weekNumber, firstDayOfWeek]);
  const renderWeekNumbers = () => {
    if (showWeeksNumbers) {
      return <Text center $textNeutral numberOfLines={1} style={styles.weekNumber}>
          {weekNumber}
        </Text>;
    }
  };
  return <View row>
      {renderWeekNumbers()}
      {map(days, day => <Day date={day} currentMonth={month} />)}
    </View>;
};
export default Week;
const styles = StyleSheet.create({
  weekNumber: {
    width: WEEK_NUMBER_WIDTH,
    alignSelf: 'center'
  }
});