import React, {useMemo} from 'react';
import {MonthProps} from './types';
import Week from './Week';

import View from '../../components/view';
import {getWeekNumbersOfMonth} from './helpers/DateUtils';

function Month(props: MonthProps) {
  const {year, month} = props;

  const weekNumbers = useMemo(() => {
    return getWeekNumbersOfMonth(year, month);
  }, [year, month]);

  return (
    <View>
      {weekNumbers.map(weekNumber => {
        return <Week weekNumber={weekNumber} year={year}/>;
      })}
    </View>
  );
}

export default Month;
