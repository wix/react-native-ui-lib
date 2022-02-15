import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-ui-lib';
import {MARGIN} from './config';

interface SortableGridItemProps {
    color: string;
}

const SortableGridItem: React.FC<SortableGridItemProps> = ({color}) => {
  return (
    <Card style={[tileStyles.tile, {backgroundColor: color}]} onPress={() => console.log('hello')} enableBlur={false}/>
  );
};

export default SortableGridItem;

const tileStyles = StyleSheet.create({
  tile: {
    borderRadius: MARGIN,
    flex: 1
  }
});
