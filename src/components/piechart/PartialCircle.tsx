import React from 'react';
import {StyleSheet} from 'react-native';
import View from '../view';
import {SvgPackage} from '../../optionalDependencies';
const {Svg, Path} = SvgPackage;

type PartialCircleProps = {
  percentage: number;
  radius: number;
  color: string;
  startAngle?: number;
  padding?: number
};

const DEFAULT_DIVIDER_COLOR = '#FFFFFF';
const DEFAULT_DIVIDER_WIDTH = 2;
const DEFAULT_PADDING = 0;

const PartialCircle = ({percentage, radius, color, startAngle = 0, padding = DEFAULT_PADDING}: PartialCircleProps) => {
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
      stroke={DEFAULT_DIVIDER_COLOR}
      strokeWidth={DEFAULT_DIVIDER_WIDTH / 2}
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

export default PartialCircle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  svg: {
    position: 'absolute'
  }
});
