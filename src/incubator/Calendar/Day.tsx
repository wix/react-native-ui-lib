import isNull from 'lodash/isNull';
import React, {useContext, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Reanimated, {useSharedValue, useAnimatedStyle, useAnimatedReaction} from 'react-native-reanimated';
import {Colors} from 'style';
import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import {getDayOfDate, isSameDay} from './helpers/DateUtils';
import {DayProps} from './types';
import CalendarContext from './CalendarContext';


const AnimatedText = Reanimated.createAnimatedComponent(Text);

const Day = (props: DayProps) => {
  const {date, onPress} = props;
  const {selectedDate, setDate} = useContext(CalendarContext);

  const shouldMarkSelected = !isNull(date) ? isSameDay(selectedDate.value, date) : false;
  const isSelected = useSharedValue(shouldMarkSelected);
  const isToday = !isNull(date) ? isSameDay(Date.now(), date) : false;

  const backgroundColor = isToday ? Colors.$backgroundSuccessHeavy : Colors.transparent;
  const textColor = isToday ? Colors.$textDefaultLight : Colors.$backgroundPrimaryHeavy;
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: isSelected.value ? Colors.$backgroundPrimaryHeavy : backgroundColor,
      color: isSelected.value ? Colors.$textDefaultLight : textColor
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      color: isSelected.value ? Colors.$textDefaultLight : textColor
    };
  });

  useAnimatedReaction(() => {
    return selectedDate.value;
  }, (selected) => {
    isSelected.value = isSameDay(selected, date!);
  }, []);

  const _onPress = useCallback(() => {
    if (date !== null) {
      isSelected.value = true;
      setDate(date);
      onPress?.(date);
    }
  }, [date, setDate, onPress]);
  
  const renderDay = () => {
    const day = !isNull(date) ? getDayOfDate(date) : '';
    return (
      <View center>
        <View reanimated style={[styles.selection, animatedStyles]}/>
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
    borderWidth: 1,
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
