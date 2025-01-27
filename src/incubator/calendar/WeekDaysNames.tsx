import React, {useContext} from 'react';
import View from '../../components/view';
import Text from '../../components/text';
import {getWeekDayNames} from './helpers/DateUtils';
import {WeekDaysNamesProps} from './types';
import CalendarContext from './CalendarContext';


const WeekDaysNames = (props: WeekDaysNamesProps) => { //TODO: memoize
  const {containerStyle, textStyle, format} = props;
  const {firstDayOfWeek} = useContext(CalendarContext);

  const dayNames = getWeekDayNames(firstDayOfWeek, format);

  const renderWeekDaysNames = () => {
    return dayNames.map((name: string, index: number) => (
      <Text
        key={index}
        $textNeutral
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
    <View row spread style={containerStyle}>
      {renderWeekDaysNames()}
    </View>
  );
};

export default WeekDaysNames;
