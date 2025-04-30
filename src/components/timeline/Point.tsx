import React, {useMemo} from 'react';
import {StyleSheet, LayoutChangeEvent} from 'react-native';
import {Colors, Spacings} from '../../style';
import View from '../view';
import Icon from '../icon';
import Text from '../text';
import {PointProps, PointTypes} from './types';

const POINT_SIZE = 12;
const CONTENT_POINT_SIZE = 20;
const POINT_MARGINS = Spacings.s1;
const CIRCLE_WIDTH = 2;
const OUTLINE_WIDTH = 4;
const OUTLINE_TINT = 70;
const ICON_SIZE = 16;

type PointPropsInternal = PointProps & {
  onLayout?: (event: LayoutChangeEvent) => void;
};

const Point = (props: PointPropsInternal) => {
  const {icon, iconProps, removeIconBackground, label, type, color, onLayout, testID} = props;

  const pointStyle = useMemo(() => {
    const hasOutline = type === PointTypes.OUTLINE;
    const isCircle = type === PointTypes.CIRCLE;
    const hasContent = label || icon;

    const size = hasContent ? CONTENT_POINT_SIZE : POINT_SIZE;
    const pointSize = hasOutline ? size + OUTLINE_WIDTH * 2 : size;
    const pointSizeStyle = {width: pointSize, height: pointSize, borderRadius: pointSize / 2};

    const pointColorStyle = {backgroundColor: color};

    const outlineStyle = hasOutline && 
      {borderWidth: OUTLINE_WIDTH, borderColor: color && Colors.getColorTint(color, OUTLINE_TINT)};
    const circleStyle = !hasContent && isCircle && 
      {backgroundColor: 'transparent', borderWidth: CIRCLE_WIDTH, borderColor: color};

    return [styles.point, pointSizeStyle, !removeIconBackground && pointColorStyle, outlineStyle, circleStyle];
  }, [type, color, label, removeIconBackground, icon]);

  const renderPointContent = () => {
    const {removeIconBackground, labelColor} = props;
    const tintColor = removeIconBackground ? Colors.$iconDefault : Colors.$iconDefaultLight;
    const iconSize = removeIconBackground ? undefined : ICON_SIZE;
    if (icon) {
      return (
        <Icon testID={`${testID}.icon`} tintColor={tintColor} {...iconProps} size={iconSize} source={icon}/>
      );
    } else if (label) {
      return (
        <Text testID={`${testID}.label`} recorderTag={'unmask'} $textDefaultLight subtextBold color={labelColor}>
          {label}
        </Text>
      );
    }
  };

  return (
    <View center style={pointStyle} onLayout={onLayout} testID={`${testID}.container`}>
      {renderPointContent()}
    </View>
  );
};

export default Point;

const styles = StyleSheet.create({
  point: {
    marginVertical: POINT_MARGINS
  }
});
