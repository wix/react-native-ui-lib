import React from 'react';
import {StyleSheet, LayoutChangeEvent, ImageSourcePropType, ImageStyle, StyleProp} from 'react-native';
import {Colors, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import Image from '../image';

export type SegmentItemProps = {
  /**
   * The label of the segment.
   */
  label?: string;
  /**
   * An icon for the segment.
   */
  iconSource?: ImageSourcePropType;
  /**
   * An icon for the segment.
   */
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * Should the icon be on right of the label
   */
  iconOnRight?: boolean;
};

export type SegmentProps = SegmentItemProps & {
  /**
   * Is the item selected.
   */
  isSelected?: boolean;
  /**
   * The color of the active segment (label and outline).
   */
  activeColor?: string;
  /**
   * The color of the inactive segment (label).
   */
  inActiveColor?: string;
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
    label,
    iconSource,
    iconStyle,
    isSelected,
    segmentOnLayout,
    onPress,
    inActiveColor,
    index,
    iconOnRight
  } = props;

  const segmentedColor = isSelected ? activeColor : inActiveColor;
  const segmentStyle = [styles.segment, {borderColor: segmentedColor}];

  const renderIcon = () => {
    return iconSource && <Image source={iconSource} style={[{tintColor: segmentedColor}, iconStyle]}/>;
  };

  return (
    <TouchableOpacity
      onLayout={event => segmentOnLayout?.(index, event)}
      style={segmentStyle}
      onPress={() => onPress(index)}
      row
    >
      {!iconOnRight && renderIcon()}
      {label && (
        <Text text90 numberOfLines={1} color={segmentedColor}>
          {label}
        </Text>
      )}
      {iconOnRight && renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  segment: {
    paddingHorizontal: Spacings.s3
  }
});

export default asBaseComponent<SegmentProps>(Segment);
