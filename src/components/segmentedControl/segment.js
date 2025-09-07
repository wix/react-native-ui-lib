import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { Spacings, Typography } from "../../style";
import { asBaseComponent } from "../../commons/new";
import TouchableOpacity from "../touchableOpacity";
import Icon from "../icon";
const ICON_SPACING = Spacings.s1;
/**
 * Segment sub-component for SegmentedControl component
 */
const Segment = React.memo(props => {
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
    return {
      color
    };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const tintColor = selectedIndex?.value === index ? activeColor : iconTintColor || inactiveColor;
    return {
      tintColor
    };
  });
  const segmentStyle = useMemo(() => {
    return [{
      paddingHorizontal: Spacings.s3,
      paddingVertical: Spacings.s2
    }, style];
  }, [style]);
  const renderIcon = useCallback(() => {
    return iconSource && <AnimatedUIIcon source={iconSource} style={[animatedIconStyle, iconStyle]} />;
  }, [iconSource, iconStyle]);
  const onSegmentPress = useCallback(() => {
    selectedIndex?.value !== index && onPress?.(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, onPress]);
  const segmentOnLayout = useCallback(event => {
    onLayout?.(index, event);
  }, [onLayout, index]);
  const labelMargins = !!iconSource && (iconOnRight ? styles.rightMargin : styles.leftMargin);
  return <TouchableOpacity onLayout={segmentOnLayout} style={segmentStyle} onPress={onSegmentPress} row flexG center testID={`${testID}.${index}`}>
      {!iconOnRight && renderIcon()}
      {label && <Reanimated.Text fsTagName={'unmasked'} numberOfLines={1} style={[Typography.text90, segmentLabelStyle, animatedTextStyle, labelMargins]}>
          {label}
        </Reanimated.Text>}
      {iconOnRight && renderIcon()}
    </TouchableOpacity>;
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
export default asBaseComponent(Segment);