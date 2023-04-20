import React, {useContext, useMemo} from 'react';
import View from '../../components/view';
import {getWeekNumbersOfMonth} from './helpers/DateUtils';
import {MonthProps} from './types';
import Week from './Week';
import CalendarContext from './CalendarContext';


function Month(props: MonthProps) {
  const {year, month} = props;
  const {firstDayOfWeek} = useContext(CalendarContext);

  const weekNumbers = useMemo(() => {
    return getWeekNumbersOfMonth(year, month, firstDayOfWeek);
  }, [year, month, firstDayOfWeek]);

  return (
    <View>
      {weekNumbers.map(weekNumber => {
        return <Week key={weekNumber} weekNumber={weekNumber} year={year} month={month}/>;
      })}
    </View>
  );
}

export default Month;
