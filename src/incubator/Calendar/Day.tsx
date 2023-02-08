import isNull from 'lodash/isNull';
import React, {useContext, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Reanimated, {useSharedValue, useAnimatedStyle, useAnimatedReaction, withTiming} from 'react-native-reanimated';
import {Colors} from 'style';
import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import {getDayOfDate, isSameDay, isToday, isSameMonth} from './helpers/DateUtils';
import {DayProps, UpdateSource} from './types';
import CalendarContext from './CalendarContext';


const AnimatedText = Reanimated.createAnimatedComponent(Text);

const Day = (props: DayProps) => {
  const {date, onPress} = props;
  const {selectedDate, setDate} = useContext(CalendarContext);

  const isSelected = useSharedValue(!isNull(date) ? isSameDay(selectedDate.value, date) : false);
  const isDayOfCurrentMonth = useSharedValue(!isNull(date) ? isSameMonth(selectedDate.value, date) : false);
  const selectedTextColor = Colors.$textDefaultLight;
  const extraDaysTextColor = Colors.$textDisabled;
  const backgroundColor = isToday(date) ? Colors.$backgroundPrimaryLight : Colors.transparent;
  
  useAnimatedReaction(() => {
    return selectedDate.value;
  }, (selected) => {
    isSelected.value = isSameDay(selected, date!);
    isDayOfCurrentMonth.value = isSameMonth(selectedDate.value, date!);
  }, []);
  
  const animatedSelectionStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: isSelected.value ? Colors.$backgroundPrimaryHeavy : backgroundColor
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      color: withTiming(isSelected.value ? selectedTextColor : 
        isDayOfCurrentMonth.value ? Colors.$backgroundPrimaryHeavy : extraDaysTextColor)
    };
  });

  const _onPress = useCallback(() => {
    if (date !== null) {
      isSelected.value = true;
      setDate(date, UpdateSource.DAY_SELECT);
      onPress?.(date);
    }
  }, [date, setDate, onPress]);
  
  const renderDay = () => {
    const day = !isNull(date) ? getDayOfDate(date) : '';
    return (
      <View center>
        <View reanimated style={[styles.selection, animatedSelectionStyles]}/>
        <AnimatedText style={animatedTextStyles}>{day}</AnimatedText>
      </View>
    );
  };

  return (
    <TouchableOpacity flex center style={styles.dayContainer} onPress={_onPress} activeOpacity={1}>
      {renderDay()}
    </TouchableOpacity>
  );
};

export default Day;

const styles = StyleSheet.create({
  dayContainer: {
    width: 32,
    height: 32
  },
  selection: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12
  }
});
