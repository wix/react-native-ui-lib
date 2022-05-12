
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
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
const ICON_SIZE = 12;


const Point = (props: PointProps) => {
  const {icon, label, type, color, onLayout} = props;

  const pointStyle = useMemo(() => {
    const hasOutline = type === PointTypes.OUTLINE;
    const isCircle = type === PointTypes.CIRCLE;
    const hasContent = label || icon;

    const size = hasContent ? CONTENT_POINT_SIZE : POINT_SIZE;
    const pointSize = hasOutline ? size + OUTLINE_WIDTH * 2 : size;
    const pointSizeStyle = {width: pointSize, height: pointSize, borderRadius: pointSize / 2};

    const pointColorStyle = {backgroundColor: color};

    const outlineStyle = hasOutline && 
      {borderWidth: OUTLINE_WIDTH, borderColor: Colors.getColorTint(color, OUTLINE_TINT)};
    const circleStyle = !hasContent && isCircle && 
      {backgroundColor: Colors.white, borderWidth: CIRCLE_WIDTH, borderColor: color};
    
    return [styles.point, pointSizeStyle, pointColorStyle, outlineStyle, circleStyle];
  }, [type, color, label, icon]);

  const renderPointContent = () => {
    if (icon) {
      return <Icon source={icon} size={ICON_SIZE} tintColor={Colors.white}/>;
    } else if (label) {
      return <Text white subtext>{label}</Text>;
    }
  };

  return (
    <View center style={pointStyle} onLayout={onLayout}>
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
