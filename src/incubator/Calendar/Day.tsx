import isNull from 'lodash/isNull';
import React, {useContext, useCallback} from 'react';
import {useSharedValue} from 'react-native-reanimated';
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
  const _date = useSharedValue(!isNull(date) ? new Date(date).getTime() : date);

  const _onPress = useCallback(() => {
    if (!isNull(_date.value)) {
      console.warn('onPress: ', _date.value);
      setDate(_date.value);
      onPress?.(_date.value);
    }
  }, [setDate, onPress, _date.value]);
  
  const renderDay = () => {
    const day = !isNull(_date.value) ? getDayOfDate(_date.value) : '';
    return <Text>{day}</Text>;
  };

  return (
    <TouchableOpacity center style={styles.dayContainer} onPress={_onPress}>
      {renderDay()}
    </TouchableOpacity>
  );
};

export default Day;
