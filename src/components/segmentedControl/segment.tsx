import React, {useCallback, useMemo} from 'react';
import {LayoutChangeEvent, ImageSourcePropType, ImageStyle, StyleProp} from 'react-native';
import Reanimated, {useAnimatedStyle} from 'react-native-reanimated';
import {Spacings, Typography} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';

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
   * Shared value of the current selected index.
   */
  selectedIndex?: Reanimated.SharedValue<number>;
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
  onPress?: (index: number) => void;
  /**
   * The index of the segment.
   */
  index: number;
  /**
   * onLayout function.
   */
  onLayout?: (index: number, event: LayoutChangeEvent) => void;
  testID?: string;
};

/**
 * Segment sub-component for SegmentedControl component
 */
const Segment = React.memo((props: SegmentProps) => {
  const {
    activeColor,
    label,
    iconSource,
    iconStyle,
    selectedIndex,
    onLayout,
    onPress,
    inactiveColor,
    index,
    iconOnRight,
    testID
  } = props;

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = selectedIndex?.value === index ? activeColor : inactiveColor;
    return {color};
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const tintColor = selectedIndex?.value === index ? activeColor : inactiveColor;
    return {tintColor};
  });

  const segmentStyle = useMemo(() => ({paddingHorizontal: Spacings.s3, paddingVertical: Spacings.s2}), []);

  const renderIcon = useCallback(() => {
    return iconSource && <Reanimated.Image source={iconSource} style={[animatedIconStyle, iconStyle]}/>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconSource, iconStyle]);

  const onSegmentPress = useCallback(() => {
    selectedIndex?.value !== index && onPress?.(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, onPress]);

  const segmentOnLayout = useCallback((event: LayoutChangeEvent) => {
    onLayout?.(index, event);
  },
  [onLayout, index]);

  return (
    <TouchableOpacity
      onLayout={segmentOnLayout}
      style={segmentStyle}
      onPress={onSegmentPress}
      row
      flexG
      center
      testID={`${testID}.${index}`}
    >
      {!iconOnRight && renderIcon()}
      {label && (
        <Reanimated.Text numberOfLines={1} style={[animatedTextStyle, Typography.text90]}>
          {label}
        </Reanimated.Text>
      )}
      {iconOnRight && renderIcon()}
    </TouchableOpacity>
  );
});

export default asBaseComponent<SegmentProps>(Segment);
