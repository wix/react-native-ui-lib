import React, {useCallback, useMemo} from 'react';
import {LayoutChangeEvent, ImageStyle, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import Reanimated, {useAnimatedStyle} from 'react-native-reanimated';
import {Spacings, Typography} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import {SegmentedControlProps} from './index';
import Icon, {IconProps} from '../icon';

const ICON_SPACING = Spacings.s1;

export type SegmentedControlItemProps = Pick<SegmentedControlProps, 'segmentLabelStyle'> & {
  /**
   * The label of the segment.
   */
  label?: string;
  /**
   * An icon for the segment.
   */
  iconSource?: IconProps['source'];
  /**
   * An icon for the segment.
   */
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * Should the icon be on right of the label
   */
  iconOnRight?: boolean;
  /**
   * Icon tint color
   */
  iconTintColor?: string;
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
  /**
   * Additional style for the segment.
   */
  style?: StyleProp<ViewStyle>;
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
    style,
    segmentLabelStyle,
    testID,
    iconTintColor
  } = props;

  const AnimatedUIIcon = Reanimated.createAnimatedComponent(Icon);

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = selectedIndex?.value === index ? activeColor : inactiveColor;
    return {color};
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const tintColor = selectedIndex?.value === index ? activeColor : (iconTintColor || inactiveColor);
    return {tintColor};
  });

  const segmentStyle = useMemo(() => {
    return [{paddingHorizontal: Spacings.s3, paddingVertical: Spacings.s2}, style];
  }, [style]);

  const renderIcon = useCallback(() => {
    return iconSource && <AnimatedUIIcon source={iconSource} style={[animatedIconStyle, iconStyle]}/>;
  }, [iconSource, iconStyle]);

  const onSegmentPress = useCallback(() => {
    selectedIndex?.value !== index && onPress?.(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, onPress]);

  const segmentOnLayout = useCallback((event: LayoutChangeEvent) => {
    onLayout?.(index, event);
  },
  [onLayout, index]);
  const labelMargins = !!iconSource && (iconOnRight ? styles.rightMargin : styles.leftMargin);
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
        <Reanimated.Text
          fsTagName={'unmasked'}
          numberOfLines={1}
          style={[Typography.text90, segmentLabelStyle, animatedTextStyle, labelMargins]}
        >
          {label}
        </Reanimated.Text>
      )}
      {iconOnRight && renderIcon()}
    </TouchableOpacity>
  );
});
Segment.displayName = 'SegmentedControl.Segment';

const styles = StyleSheet.create({
  leftMargin: {
    marginLeft: ICON_SPACING
  },
  rightMargin: {
    marginRight: ICON_SPACING
  }
});

export default asBaseComponent<SegmentProps>(Segment);
