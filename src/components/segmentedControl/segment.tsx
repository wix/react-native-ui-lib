import React from 'react';
import {StyleSheet, LayoutChangeEvent} from 'react-native';
import {Colors, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';

export type SegmentProps = {
  /**
   * The label of the segment.
   */
  label?: string;
  /**
   * Is the item selected.
   */
  isSelected?: boolean;
  /**
   * The color of the active segment.
   */
  color?: string;
  /**
   * Callback for when segment has pressed.
   */
  onPress: (index: number) => void;
  /**
   * The index of the segment.
   */
  index: number;
  /**
   * onLayout function.
   */
  segmentOnLayout?: (index: number, event: LayoutChangeEvent) => void;
};

/**
 * Segment sub-component for SegmentedControl component
 */
const Segment = (props: SegmentProps) => {
  const {color = Colors.primary, label, isSelected, segmentOnLayout, onPress, index} = props;

  const segmentedColor = isSelected ? color : Colors.grey20;
  const segmentStyle = [styles.segment, {borderColor: segmentedColor}];

  return (
    <TouchableOpacity
      onLayout={event => segmentOnLayout?.(index, event)}
      style={segmentStyle}
      onPress={() => onPress(index)}
    >
      <Text text90 numberOfLines={1} color={segmentedColor}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  segment: {
    paddingHorizontal: Spacings.s3
  }
});

export default asBaseComponent<SegmentProps>(Segment);
