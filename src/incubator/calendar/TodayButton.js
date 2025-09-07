import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { /* Animated,  */useAnimatedStyle /* , useSharedValue */ } from 'react-native-reanimated';
import { Colors } from "../../style";
import View from "../../components/view";
import Button from "../../components/button";
import { isSameDay /*, isPastDate*/ } from "./helpers/DateUtils";
import { UpdateSource } from "./types";
import CalendarContext from "./CalendarContext";
const UP_ICON = require("./assets/up.png");
// const DOWN_ICON = require('./assets/down.png');

const TodayButton = props => {
  //TODO: memoize
  const {
    containerStyle,
    buttonProps
  } = props;
  const {
    selectedDate,
    setDate
  } = useContext(CalendarContext);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: isSameDay(selectedDate.value, Date.now()) ? 100 : 0
      }]
    };
  });

  /** animate button's icon */
  // const source = useSharedValue(isPastDate(selectedDate.value) ? DOWN_ICON : UP_ICON);
  // const renderIcon = useCallback((style) => {
  //   return <Animated.Image source={source.value} style={style}/>;
  // }, []);

  const onPress = useCallback(event => {
    setDate(Date.now(), UpdateSource.TODAY_PRESS);
    buttonProps?.onPress?.(event);
  }, [buttonProps]);
  return <View reanimated style={[styles.container, containerStyle, animatedStyle]}>
      <Button outline size={Button.sizes.xSmall} activeOpacity={0.8} style={styles.button} {...buttonProps} iconSource={UP_ICON} //renderIcon
    onPress={onPress} label={'Today'} />
    </View>;
};
export default TodayButton;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 42,
    left: 16
  },
  button: {
    backgroundColor: Colors.$backgroundDefault,
    shadowColor: '#79838A',
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: {
      height: 6,
      width: 0
    },
    elevation: 6
  }
});