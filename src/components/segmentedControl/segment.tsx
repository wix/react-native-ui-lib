import React, {useCallback, useMemo} from 'react';
import {LayoutChangeEvent, ImageSourcePropType, ImageStyle, StyleProp} from 'react-native';
import {Colors, Spacings} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import Image from '../image';

export type SegmentedControlItemProps = {
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

export type SegmentProps = SegmentedControlItemProps & {
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
  inactiveColor?: string;
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
  onLayout?: (index: number, event: LayoutChangeEvent) => void;
};

/**
 * Segment sub-component for SegmentedControl component
 */
const Segment = React.memo((props: SegmentProps) => {
  const {
    activeColor = Colors.primary,
    label,
    iconSource,
    iconStyle,
    isSelected,
    onLayout,
    onPress,
    inactiveColor,
    index,
    iconOnRight
  } = props;

  const segmentedColor = useMemo(() => (isSelected ? activeColor : inactiveColor),
    [isSelected, activeColor, inactiveColor]);

  const segmentStyle = useMemo(() => ({paddingHorizontal: Spacings.s3, borderColor: segmentedColor}), [segmentedColor]);

  const renderIcon = useCallback(() => {
    return iconSource && <Image source={iconSource} style={[{tintColor: segmentedColor}, iconStyle]}/>;
  }, [iconSource, segmentedColor, iconStyle]);

  const onSegmentPress = useCallback(() => {
    onPress(index);
  }, [index, onPress]);

  const segmentOnLayout = useCallback((event: LayoutChangeEvent) => {
    onLayout?.(index, event);
  },
  [onLayout, index]);

  return (
    <TouchableOpacity onLayout={segmentOnLayout} style={segmentStyle} onPress={onSegmentPress} row>
      {!iconOnRight && renderIcon()}
      {label && (
        <Text text90 numberOfLines={1} color={segmentedColor}>
          {label}
        </Text>
      )}
      {iconOnRight && renderIcon()}
    </TouchableOpacity>
  );
});

export default asBaseComponent<SegmentProps>(Segment);
