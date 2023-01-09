import React, {useContext} from 'react';
import {WeekDaysNamesProps} from './types';
import {getWeekDayNames} from './helpers/DateUtils';
import CalendarContext from './CalendarContext';
import View from '../../components/view';
import Text from '../../components/text';


const WeekDaysNames = (props: WeekDaysNamesProps) => { //TODO: memoize
  const {textStyle, format} = props;
  const {firstDayOfWeek} = useContext(CalendarContext); //TODO: move FDW type to number

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
