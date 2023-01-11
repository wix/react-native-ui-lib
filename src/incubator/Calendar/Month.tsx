import React, {useMemo} from 'react';
import View from '../../components/view';
import {getWeekNumbersOfMonth} from './helpers/DateUtils';
import {MonthProps} from './types';
import Week from './Week';

function Month(props: MonthProps) {
  const {year, month} = props;

  const weekNumbers = useMemo(() => {
    return getWeekNumbersOfMonth(year, month);
  }, [year, month]);

  return (
    <View>
      {weekNumbers.map(weekNumber => {
        return <Week key={weekNumber} weekNumber={weekNumber} year={year}/>;
      })}
    </View>
  );
}

export default Month;
