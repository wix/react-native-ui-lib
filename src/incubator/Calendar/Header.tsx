import React, {useContext, useCallback} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Reanimated, {useAnimatedProps} from 'react-native-reanimated';
import {Colors} from '../../style';
import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import {getDateObject, addMonths, getMonthForIndex} from './helpers/DateUtils';
import {HeaderProps, DayNamesFormat} from './types';
import CalendarContext from './CalendarContext';
import WeekDaysNames from './WeekDaysNames';

const AnimatedTextInput = Reanimated.createAnimatedComponent(TextInput);

const Header = (props: HeaderProps) => {
  const {month, year} = props;
  const {selectedDate, setDate} = useContext(CalendarContext);
  const isStaticHeader = month === undefined && year === undefined;

  const onLeftArrowPress = useCallback(() => {
    setDate(addMonths(selectedDate.value, -1));
  }, [selectedDate.value, setDate]);

  const onRightArrowPress = useCallback(() => {
    setDate(addMonths(selectedDate.value, 1));
  }, [selectedDate.value, setDate]);

  const animatedProps = useAnimatedProps(() => {
    const dateObject = getDateObject(selectedDate.value);
    const monthString = getMonthForIndex(isStaticHeader ? dateObject.month : month!);
    const dateString = isStaticHeader ? monthString + ` ${dateObject.year}` : monthString + ` ${year}`;
    return {
      text: dateString
    };
  });

  const renderTitle = () => {
    return (
      <AnimatedTextInput 
        {...{animatedProps}}
        editable={false}
        style={styles.title}
      />
    );
  };

  const renderArrow = (label: string, onPress: () => void) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderNavigation = () => {
    return (
      <View row spread>
        {renderArrow('<<', onLeftArrowPress)}
        {renderTitle()}
        {renderArrow('>>', onRightArrowPress)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderNavigation()}
      <WeekDaysNames format={DayNamesFormat.LONG_ABBREVIATION}/>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    
  },
  title: {
    color: Colors.$textDefault,
    paddingVertical: 0 // for Android inner paddings
  }
});
