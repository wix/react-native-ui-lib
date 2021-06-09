import _pt from "prop-types";
import React, { useCallback, useMemo } from 'react';
import { Colors, Spacings } from "../../style";
import { asBaseComponent } from "../../commons/new";
import TouchableOpacity from "../touchableOpacity";
import Text from "../text";
import Image from "../image";

/**
 * Segment sub-component for SegmentedControl component
 */
const Segment = React.memo(props => {
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
  const segmentedColor = useMemo(() => isSelected ? activeColor : inactiveColor, [isSelected, activeColor, inactiveColor]);
  const segmentStyle = useMemo(() => ({
    paddingHorizontal: Spacings.s3,
    borderColor: segmentedColor
  }), [segmentedColor]);
  const renderIcon = useCallback(() => {
    return iconSource && <Image source={iconSource} style={[{
      tintColor: segmentedColor
    }, iconStyle]} />;
  }, [iconSource, segmentedColor, iconStyle]);
  const onSegmentPress = useCallback(() => {
    onPress(index);
  }, [index, onPress]);
  const segmentOnLayout = useCallback(event => {
    onLayout?.(index, event);
  }, [onLayout, index]);
  return <TouchableOpacity onLayout={segmentOnLayout} style={segmentStyle} onPress={onSegmentPress} row>
      {!iconOnRight && renderIcon()}
      {label && <Text text90 numberOfLines={1} color={segmentedColor}>
          {label}
        </Text>}
      {iconOnRight && renderIcon()}
    </TouchableOpacity>;
});
Segment.propTypes = {
  /**
     * The label of the segment.
     */
  label: _pt.string,

  /**
     * Should the icon be on right of the label
     */
  iconOnRight: _pt.bool,

  /**
     * Is the item selected.
     */
  isSelected: _pt.bool,

  /**
     * The color of the active segment (label and outline).
     */
  activeColor: _pt.string,

  /**
     * The color of the inactive segment (label).
     */
  inactiveColor: _pt.string,

  /**
     * Callback for when segment has pressed.
     */
  onPress: _pt.func.isRequired,

  /**
     * The index of the segment.
     */
  index: _pt.number.isRequired,

  /**
     * onLayout function.
     */
  onLayout: _pt.func
};
export default asBaseComponent(Segment);