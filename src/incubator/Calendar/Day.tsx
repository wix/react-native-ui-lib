import isNull from 'lodash/isNull';
import React, {useContext, useCallback} from 'react';
// import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import {DayProps} from './types';
import {styles} from './style';
import {getDayOfDate} from './helpers/DateUtils';
import CalendarContext from './CalendarContext';

const Day = (props: DayProps) => {
  const {date, onPress} = props;
  const {setDate} = useContext(CalendarContext);

  const _onPress = useCallback(() => {
    if (date !== null) {
      console.warn('onPress: ', date);
      setDate(date);
      onPress?.(date);
    }
  }, [setDate, onPress, date]);
  
  const renderDay = () => {
    const day = !isNull(date) ? getDayOfDate(date) : '';
    return <Text>{day}</Text>;
  };

  return (
    <TouchableOpacity center style={styles.dayContainer} onPress={_onPress}>
      {renderDay()}
    </TouchableOpacity>
  );
};

export default Day;
