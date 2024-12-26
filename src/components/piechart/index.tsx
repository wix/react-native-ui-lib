import React from 'react';
import View from '../view';
import {useCombinedSegments} from './useCombinedSegments';
import PartialCircle from './PartialCircle';

export type PieChartProps = {
  segments: number[];
  monochrome?: boolean;
  size?: number;
  colors?: string[];
  padding?: number;
};

const DEFAULT_SIZE = 144;

const PieChart = (props: PieChartProps) => {
  const {segments: propSegments, monochrome = false, size = DEFAULT_SIZE, colors: propsColor, padding} = props;

  const {segments, colors, defaultColor} = useCombinedSegments({
    segments: propSegments,
    monochrome,
    colors: propsColor
  });

  const renderPieSegments = () => {
    let currentStartAngle = 0;

    return segments.map((segment, index) => {
      const startAngle = currentStartAngle;
      currentStartAngle += (segment / 100) * 360;
      return (
        <PartialCircle
          key={index}
          color={colors[index] || defaultColor}
          startAngle={startAngle}
          percentage={segment}
          radius={size / 2}
          padding={padding}
        />
      );
    });
  };
  return (
    <View width={size} height={size}>
      {renderPieSegments()}
    </View>
  );
};

export default PieChart;
