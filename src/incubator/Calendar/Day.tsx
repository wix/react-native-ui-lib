import isNull from 'lodash/isNull';
import React from 'react';
import {StyleSheet} from 'react-native';
import View from '../../components/view';
import Text from '../../components/text';
import {DayProps} from './types';
import {getDayOfDate} from './helpers/DateUtils';

const Day = (props: DayProps) => {
  const {date} = props;
  
  const renderDay = () => {
    if (isNull(date)) {
      return;
    }
    const day = getDayOfDate(date);
    return <Text>{day}</Text>;
  };

  return (
    <View center style={styles.container}>
      {renderDay()}
    </View>
  );
};

export default Day;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 32,
    height: 32
  }
});
