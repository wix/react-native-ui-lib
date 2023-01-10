import React, {useContext, useCallback} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Reanimated, {useAnimatedProps} from 'react-native-reanimated';
import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import {HeaderProps, DayNamesFormat} from './types';
import CalendarContext from './CalendarContext';
import {getDateObject, addMonths} from './helpers/DateUtils';
import WeekDaysNames from './WeekDaysNames';

const AnimatedTextInput = Reanimated.createAnimatedComponent(TextInput);

const Header = (props: HeaderProps) => {
  const {date, setDate} = useContext(CalendarContext);
  
  const onLeftArrowPress = useCallback(() => {
    setDate(addMonths(date.value, -1));
  }, [date.value, setDate]);

  const onRightArrowPress = useCallback(() => {
    setDate(addMonths(date.value, 1));
  }, [date.value, setDate]);

  const animatedProps = useAnimatedProps(() => {
    const dateObject = getDateObject(date.value);
    const dateString = `${dateObject.month + 1}-${dateObject.year}`;
    return {
      text: dateString
    };
  });

  const renderTitle = () => {
    return (
      <AnimatedTextInput {...{animatedProps}} editable={false}/>
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
    
  }
});
