import React from 'react';
import {StyleSheet} from 'react-native';
import View from '../view';
import {SvgPackage} from '../../optionalDependencies';
const {Svg, Path} = SvgPackage;

type PartialCircleProps = {
  percentage: number;
  radius: number;
  color: string;
  borderColor?: string;
  borderWidth?: number;
  startAngle?: number;
};

const PartialCircle = ({percentage, radius, color, startAngle = 0}: PartialCircleProps) => {
  const strokeWidth = 1;
  const borderColor = '#FFFFFF';
  const borderWidth = 1;
  // Add padding to prevent stroke from being cut
  const padding = strokeWidth + borderWidth + 2;
  const actualRadius = radius - strokeWidth / 2;
  const center = radius + padding / 2;

  // Convert percentage to degrees
  const degrees = (percentage / 100) * 360;

  // Adjust startAngle by subtracting 90 degrees to make 0 start at the top
  const adjustedStartAngle = startAngle - 90;

  // Calculate angles
  const startRad = (adjustedStartAngle * Math.PI) / 180;
  const endRad = startRad + (degrees * Math.PI) / 180;

  // Calculate points
  const startX = center + Math.cos(startRad) * actualRadius;
  const startY = center + Math.sin(startRad) * actualRadius;
  const endX = center + Math.cos(endRad) * actualRadius;
  const endY = center + Math.sin(endRad) * actualRadius;

  const largeArcFlag = degrees > 180 ? 1 : 0;
  const sweepFlag = 1;

  // Create a path that draws a full circle with a missing triangle section
  const path = `
    M ${center} ${center}
    L ${startX} ${startY}
    A ${actualRadius} ${actualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}
    Z
  `;

  const totalSize = radius * 2 + padding;

  return (
    <View style={[styles.container, {width: totalSize, height: totalSize}]}>
      <Svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} style={[styles.svg]}>
        <Path
          d={path}
          fill={color}
          stroke={borderColor}
          strokeWidth={borderWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
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
