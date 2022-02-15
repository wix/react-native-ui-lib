import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {MARGIN} from './config';

interface SortableGridItemProps {
    color: string;
}

const SortableGridItem: React.FC<SortableGridItemProps> = ({color}) => {
  return (
    <View style={[tileStyles.tile, {backgroundColor: color}]}/>
  );
};

export default SortableGridItem;

const tileStyles = StyleSheet.create({
  tile: {
    borderRadius: MARGIN,
    flex: 1
  }
});
