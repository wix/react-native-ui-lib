import React, {useContext, useCallback} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Reanimated, {useAnimatedProps} from 'react-native-reanimated';
import View from '../../components/view';
import TouchableOpacity from '../../components/touchableOpacity';
import Text from '../../components/text';
import {HeaderProps} from './types';
import CalendarContext from './CalendarContext';
import {getDateObject, addMonths} from './helpers/DateUtils';

const AnimatedTextInput = Reanimated.createAnimatedComponent(TextInput);

const Header = (props: HeaderProps) => {
  const {date, setDate} = useContext(CalendarContext);
  console.warn(date.value);
  
  const onLeftArrowPress = useCallback(() => {
    setDate(addMonths(date.value, -1));
  }, [date.value, setDate]);

  const onRightArrowPress = useCallback(() => {
    setDate(addMonths(date.value, 1));
  }, [date.value, setDate]);

  const animatedProps = useAnimatedProps(() => {
    const dateObject = getDateObject(date.value);
    console.warn(dateObject);

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
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    
  }
});
