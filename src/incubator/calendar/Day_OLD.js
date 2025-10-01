import isNull from 'lodash/isNull';
import React, { useContext, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, { useSharedValue, useAnimatedStyle, useAnimatedReaction, withTiming } from 'react-native-reanimated';
import { Colors } from "../../style";
import View from "../../components/view";
import TouchableOpacity from "../../components/touchableOpacity";
import Text from "../../components/text";
import { getDateObject, isSameDay } from "./helpers/DateUtils";
import { UpdateSource } from "./types";
import CalendarContext from "./CalendarContext";
const DAY_SIZE = 32;
const SELECTION_SIZE = 24;
const NO_COLOR = Colors.transparent;
const TEXT_COLOR = Colors.$textPrimary;
const TODAY_BACKGROUND_COLOR = Colors.$backgroundPrimaryLight;
const INACTIVE_TODAY_BACKGROUND_COLOR = Colors.$backgroundNeutral;
const SELECTED_BACKGROUND_COLOR = Colors.$backgroundPrimaryHeavy;
const SELECTED_TEXT_COLOR = Colors.$textDefaultLight;
const INACTIVE_TEXT_COLOR = Colors.$textNeutralLight;
const AnimatedText = Reanimated.createAnimatedComponent(Text);
const Day = props => {
  const {
    date,
    onPress,
    currentMonth
  } = props;
  const {
    selectedDate,
    setDate,
    showExtraDays,
    today
  } = useContext(CalendarContext);
  const dateObject = useMemo(() => {
    return !isNull(date) && getDateObject(date);
  }, [date]);
  const day = dateObject ? dateObject.day : '';
  const isSelected = useSharedValue(!isNull(date) ? isSameDay(selectedDate.value, date) : false);
  const inactive = useMemo(() => {
    // inactive have different look but is still pressable
    if (dateObject) {
      const dayMonth = dateObject.month;
      return dayMonth !== currentMonth;
    }
  }, [dateObject, currentMonth]);
  const isHidden = !showExtraDays && inactive;
  const backgroundColor = useMemo(() => {
    return !isSameDay(date, today) ? NO_COLOR : inactive ? INACTIVE_TODAY_BACKGROUND_COLOR : TODAY_BACKGROUND_COLOR;
  }, [date, inactive, today]);
  const textColor = useMemo(() => {
    return inactive ? showExtraDays ? INACTIVE_TEXT_COLOR : NO_COLOR : TEXT_COLOR;
  }, [inactive, showExtraDays]);
  useAnimatedReaction(() => {
    return selectedDate.value;
  }, selected => {
    isSelected.value = !inactive && isSameDay(selected, date);
  }, []);
  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      color: withTiming(isSelected.value ? SELECTED_TEXT_COLOR : textColor, {
        duration: 100
      })
    };
  });
  const animatedSelectionStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isSelected.value ? SELECTED_BACKGROUND_COLOR : backgroundColor, {
        duration: 100
      })
    };
  });
  const selectionStyle = useMemo(() => {
    return [styles.selection, animatedSelectionStyles];
  }, [animatedSelectionStyles]);
  const _onPress = useCallback(() => {
    if (date !== null && !isHidden) {
      isSelected.value = true;
      setDate(date, UpdateSource.DAY_SELECT);
      onPress?.(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, setDate, onPress]);
  return <TouchableOpacity flex center style={styles.dayContainer} onPress={_onPress} activeOpacity={1}>
      <View center>
        <View reanimated style={selectionStyle} />
        <AnimatedText style={animatedTextStyles}>{day}</AnimatedText>
      </View>
    </TouchableOpacity>;
};
export default Day;
const styles = StyleSheet.create({
  dayContainer: {
    width: DAY_SIZE,
    height: DAY_SIZE
  },
  selection: {
    position: 'absolute',
    width: SELECTION_SIZE,
    height: SELECTION_SIZE,
    borderRadius: SELECTION_SIZE / 2
  }
});