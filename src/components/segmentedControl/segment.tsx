import React from 'react';
import {StyleSheet, LayoutChangeEvent, ImageSourcePropType, ImageStyle, StyleProp} from 'react-native';
import {Colors, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import Image from '../image';

export type SegmentItemProps = {
  /**
   * The title of the segment.
   */
  title?: string;
  /**
   * An icon for the segment.
   */
  iconSource?: ImageSourcePropType;
  /**
   * An icon for the segment.
   */
  iconStyle?: StyleProp<ImageStyle>;
};

export type SegmentProps = SegmentItemProps & {
  /**
   * Is the item selected.
   */
  isSelected?: boolean;
  /**
   * The color of the active segment.
   */
  activeColor?: string;
  unActiveColor?: string;
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
  const {
    activeColor = Colors.primary,
    title,
    iconSource,
    iconStyle,
    isSelected,
    segmentOnLayout,
    onPress,
    unActiveColor,
    index
  } = props;

  const segmentedColor = isSelected ? activeColor : unActiveColor;
  const segmentStyle = [styles.segment, {borderColor: segmentedColor}];

  return (
    <TouchableOpacity
      onLayout={event => segmentOnLayout?.(index, event)}
      style={segmentStyle}
      onPress={() => onPress(index)}
      row
    >
      {title && (
        <Text text90 numberOfLines={1} color={segmentedColor}>
          {title}
        </Text>
      )}
      {iconSource && <Image source={iconSource} style={[{tintColor: segmentedColor}, iconStyle]}/>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  segment: {
    paddingHorizontal: Spacings.s3
  }
});

export default asBaseComponent<SegmentProps>(Segment);
