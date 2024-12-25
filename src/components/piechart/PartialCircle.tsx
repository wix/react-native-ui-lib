import React from 'react';
import {StyleSheet} from 'react-native';
import View from '../view';
import {SvgPackage} from '../../optionalDependencies';
const {Svg, Path} = SvgPackage;

type PartialCircleProps = {
  percentage: number;
  radius: number;
  color: string;
  // borderColor?: string;
  // borderWidth?: number;
  startAngle?: number;
};

const DEFAULT_BORDER_COLOR = '#FFFFFF';
const DEFAULT_BORDER_WIDTH = 2;

const PartialCircle = ({percentage, radius, color, startAngle = 0}: PartialCircleProps) => {
  // Add padding to prevent stroke from being cut
  const padding = DEFAULT_BORDER_WIDTH * 2;
  const actualRadius = radius - padding / 2;
  const centerXAndY = radius;
  const amountToCover = (percentage / 100) * 360;
  const angleFromTop = startAngle - 90;

  // Calculate angles
  const startRad = (angleFromTop * Math.PI) / 180;
  const endRad = startRad + (amountToCover * Math.PI) / 180;

  // Calculate points
  const startX = centerXAndY + Math.cos(startRad) * actualRadius;
  const startY = centerXAndY + Math.sin(startRad) * actualRadius;
  const endX = centerXAndY + Math.cos(endRad) * actualRadius;
  const endY = centerXAndY + Math.sin(endRad) * actualRadius;

  const largeArcFlag = amountToCover > 180 ? 1 : 0;
  const sweepFlag = 1;

  // Create a path that draws a full circle with a missing triangle section
  const path = `
    M ${centerXAndY} ${centerXAndY}
    L ${startX} ${startY}
    A ${actualRadius} ${actualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}
    Z
  `;

  const totalSize = radius * 2 + padding;

  return (
    <View style={styles.container}>
      <Svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} style={styles.svg}>
        <Path
          d={path}
          fill={color}
          stroke={DEFAULT_BORDER_COLOR}
          strokeWidth={DEFAULT_BORDER_WIDTH}
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
