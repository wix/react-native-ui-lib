import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from '../../commons/new';
import View from '../../components/view';
import {CalendarItemProps} from './types';
import CalendarContext from './CalendarContext';
import Month from './Month';
import Header from './Header';

function CalendarItem(props: CalendarItemProps) {
  const {year, month} = props;
  const {staticHeader} = useContext(CalendarContext);

  if (month !== undefined) {
    return (
      <View style={[styles.container, {height: 250 - (staticHeader ? 61 : 0)}]}>
        {!staticHeader && <Header month={month} year={year}/>}
        <Month month={month} year={year}/>
      </View>
    );
  }
  return null;
}

export default CalendarItem;

const styles = StyleSheet.create({
  container: {
    width: Constants.screenWidth,
    borderBottomWidth: 1
  }
});
