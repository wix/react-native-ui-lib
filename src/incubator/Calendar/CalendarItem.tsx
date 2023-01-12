import React from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from '../../commons/new';
import {Colors} from '../../style';
import View from '../../components/view';
import {CalendarItemProps} from './types';
import Month from './Month';
import Header from './Header';

function CalendarItem(props: CalendarItemProps) {
  const {year, month} = props;
  
  if (month !== undefined) {
    return (
      <View style={styles.container}>
        <Header month={month} year={year}/>
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
    height: 250,
    backgroundColor: Colors.grey60
  }
});
