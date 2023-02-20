import isNull from 'lodash/isNull';
import React, {useContext, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Reanimated, {useSharedValue, useAnimatedStyle, useAnimatedReaction, withTiming} from 'react-native-reanimated';
import {Colors} from 'style';
import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import {getDayOfDate, isSameDay, isToday} from './helpers/DateUtils';
import {DayProps, UpdateSource} from './types';
import CalendarContext from './CalendarContext';


const BACKGROUND_COLOR = Colors.transparent;
const TEXT_COLOR = Colors.$textPrimary;
const TODAY_BACKGROUND_COLOR = Colors.$backgroundPrimaryLight;
const SELECTED_BACKGROUND_COLOR = Colors.$backgroundPrimaryHeavy;
const SELECTED_TEXT_COLOR = Colors.$textDefaultLight;
const INACTIVE_TEXT_COLOR = Colors.$textNeutralLight;

const AnimatedText = Reanimated.createAnimatedComponent(Text);

const Day = (props: DayProps) => {
  const {date, onPress, inactive} = props;
  const {selectedDate, setDate} = useContext(CalendarContext);

  const isSelected = useSharedValue(!isNull(date) ? isSameDay(selectedDate.value, date) : false);
  const backgroundColor = isToday(date) ? TODAY_BACKGROUND_COLOR : BACKGROUND_COLOR;
  
  useAnimatedReaction(() => {
    return selectedDate.value;
  }, (selected) => {
    isSelected.value = isSameDay(selected, date!);
  }, []);

  const animatedSelectionStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: isSelected.value ? SELECTED_BACKGROUND_COLOR : backgroundColor
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      color: withTiming(isSelected.value ? SELECTED_TEXT_COLOR : inactive ? INACTIVE_TEXT_COLOR : TEXT_COLOR)
    };
  });

  const _onPress = useCallback(() => {
    if (date !== null) {
      isSelected.value = true;
      setDate(date, UpdateSource.DAY_SELECT);
      onPress?.(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
