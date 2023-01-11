import React, {useContext} from 'react';
import View from '../../components/view';
import Text from '../../components/text';
import {getWeekDayNames} from './helpers/DateUtils';
import {WeekDaysNamesProps} from './types';
import CalendarContext from './CalendarContext';


const WeekDaysNames = (props: WeekDaysNamesProps) => { //TODO: memoize
  const {textStyle, format} = props;
  const {firstDayOfWeek} = useContext(CalendarContext);

  const dayNames = getWeekDayNames(firstDayOfWeek, format);

  const renderWeekDaysNames = () => {
    return dayNames.map((name: string, index: number) => (
      <Text
        key={index}
        margin-5
        style={textStyle}
        numberOfLines={1}
        allowFontScaling={false}
        accessibilityLabel={name}
      >
        {name}
      </Text>
    ));
  };
  
  return (
    <View row spread>
      {renderWeekDaysNames()}
    </View>
  );
};

export default WeekDaysNames;
