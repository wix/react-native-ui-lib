import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {MARGIN} from './config';

interface SortableGridItemProps {
    color: string;
    itemSize: number
}

const SortableGridItem: React.FC<SortableGridItemProps> = ({color, itemSize}) => {
  return (
    <View style={[tileStyles.tile, {backgroundColor: color, width: itemSize, height: itemSize}]}/>
  );
};

export default SortableGridItem;

const tileStyles = StyleSheet.create({
  tile: {
    borderRadius: MARGIN,
    margin: MARGIN * 2
  }
});
