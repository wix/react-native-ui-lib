import React from 'react';
import {ColorValue, StyleSheet} from 'react-native';
import View from '../view';
import {SvgPackage} from '../../optionalDependencies';
import {Colors} from '../../style';
const {Svg, Path} = SvgPackage;

export type PieSegmentProps = {
  percentage: number;
  radius: number;
  color: string;
  startAngle?: number;
  padding?: number;
  dividerWidth?: number;
  dividerColor?: ColorValue;
};

const DEFAULT_DIVIDER_COLOR = Colors.$backgroundDefault;
const DEFAULT_DIVIDER_WIDTH = 4;
const DEFAULT_PADDING = 0;

const PieSegment = (props: PieSegmentProps) => {
  const {
    percentage,
    radius,
    color,
    startAngle = 0,
    padding = DEFAULT_PADDING,
    dividerWidth = DEFAULT_DIVIDER_WIDTH,
    dividerColor = DEFAULT_DIVIDER_COLOR
  } = props;
  if (!Svg || !Path) {
    console.error(`RNUILib PieChart requires installing "@react-native-svg" dependency`);
  }
  const actualRadius = radius - padding;
  const centerXAndY = radius;
  const amountToCover = (percentage / 100) * 360;
  const angleFromTop = startAngle - 90;

  const startRad = (angleFromTop * Math.PI) / 180;
  const endRad = startRad + (amountToCover * Math.PI) / 180;

  const startX = centerXAndY + Math.cos(startRad) * actualRadius;
  const startY = centerXAndY + Math.sin(startRad) * actualRadius;
  const endX = centerXAndY + Math.cos(endRad) * actualRadius;
  const endY = centerXAndY + Math.sin(endRad) * actualRadius;

  const largeArcFlag = amountToCover > 180 ? 1 : 0;
  const sweepFlag = 1;

  const arcPath = `
    M ${centerXAndY} ${centerXAndY}
    L ${startX} ${startY}
    A ${actualRadius} ${actualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}
    Z
  `;
  const startBorderLine = `M ${centerXAndY} ${centerXAndY} L ${startX} ${startY}`;
  const endBorderLine = `M ${centerXAndY} ${centerXAndY} L ${endX} ${endY}`;

  const arc = <Path d={arcPath} fill={color}/>;
  const borders = (
    <Path
      d={`${startBorderLine} ${endBorderLine}`}
      fill="none"
      stroke={dividerColor}
      strokeWidth={dividerWidth / 2}
      strokeLinejoin="round"
    />
  );
  const totalSize = radius * 2 + padding;

  return (
    <View style={styles.container}>
      <Svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} style={styles.svg}>
        {arc}
        {borders}
      </Svg>
    </View>
  );
};

export default PieSegment;

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  svg: {
    position: 'absolute'
  }
});
