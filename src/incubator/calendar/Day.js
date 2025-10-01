import React, { useContext, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { Colors } from "../../style";
import { getDateObject, isSameDay } from "./helpers/DateUtils";
import { UpdateSource } from "./types";
import CalendarContext from "./CalendarContext";
const DAY_SIZE = 32;
const NO_COLOR = Colors.transparent;
const TEXT_COLOR = Colors.$textPrimary;
const TODAY_BACKGROUND_COLOR = Colors.$backgroundPrimaryLight;
const SELECTED_BACKGROUND_COLOR = Colors.$backgroundPrimaryHeavy;
const SELECTED_TEXT_COLOR = Colors.$textDefaultLight;
const INACTIVE_TEXT_COLOR = Colors.$textNeutralLight;
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
  const [selected, setSelected] = useState(false);
  const dateObject = useMemo(() => getDateObject(date), [date]);
  const day = dateObject ? dateObject.day : '';
  useAnimatedReaction(() => date ? isSameDay(selectedDate.value, date) : false, (selected, prevSelected) => {
    if (selected !== prevSelected) {
      runOnJS(setSelected)(selected);
    }
  });
  const _onPress = useCallback(() => {
    setDate(date, UpdateSource.DAY_SELECT);
    onPress?.(date);
  }, [setDate, date, onPress]);
  const isToday = isSameDay(today, date);
  const inactive = dateObject ? dateObject.month !== currentMonth : false;
  const isHidden = !showExtraDays && inactive;
  const textStyle = useMemo(() => {
    if (isHidden) {
      return styles.textHidden;
    } else if (inactive) {
      return styles.textInactive;
    } else if (selected) {
      return styles.textSelected;
    }
    return styles.text;
  }, [selected, inactive, isHidden]);
  return <TouchableWithoutFeedback onPress={_onPress}>
      <View style={styles.container}>
        {isToday && <View style={styles.todayIndicator} />}
        {selected && <View style={styles.selectedIndicator} />}
        <Text style={textStyle}>{day}</Text>
      </View>
    </TouchableWithoutFeedback>;
};
export default Day;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: DAY_SIZE,
    height: DAY_SIZE
  },
  text: {
    color: TEXT_COLOR
  },
  textSelected: {
    color: SELECTED_TEXT_COLOR
  },
  textInactive: {
    color: INACTIVE_TEXT_COLOR
  },
  textHidden: {
    color: NO_COLOR
  },
  selectedIndicator: {
    position: 'absolute',
    width: DAY_SIZE,
    height: DAY_SIZE,
    flex: 1,
    borderRadius: 999,
    backgroundColor: SELECTED_BACKGROUND_COLOR
  },
  todayIndicator: {
    position: 'absolute',
    width: DAY_SIZE,
    height: DAY_SIZE,
    flex: 1,
    borderRadius: 999,
    backgroundColor: TODAY_BACKGROUND_COLOR
  }
});