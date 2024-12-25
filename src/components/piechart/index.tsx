import React from 'react';
import View from '../view';
import {colorsPalette} from '../../style/colorsPalette';
import PartialCircle from './PartialCircle';

type PieChartProps = {
  segments: number[];
  monochrome?: boolean;
};

const SEGMENT_COLORS = (['blue', 'red', 'green'] as const).map(color => colorsPalette[`${color}40`]);
const DEFAULT_COLOR = colorsPalette.grey40;
const MONOCHROME_COLORS = ([70, 50, 30, 10] as const).map(colorNumber => colorsPalette[`blue${colorNumber}`]);
const DEFAULT_MONOCHROME_COLOR = colorsPalette.blue1;
const PIE_CHART_RADIUS = 50;

const PieChart = (props: PieChartProps) => {
  const {segments, monochrome = false} = props;
  const renderPieSegments = () => {
    let currentStartAngle = 0;
    const colors = monochrome ? MONOCHROME_COLORS : SEGMENT_COLORS;
    const defaultColor = monochrome ? DEFAULT_MONOCHROME_COLOR : DEFAULT_COLOR;

    return segments.map((segment, index) => {
      const startAngle = currentStartAngle;
      currentStartAngle += (segment / 100) * 360;
      return (
        <PartialCircle
          key={index}
          color={colors[index] || defaultColor}
          startAngle={startAngle}
          percentage={segment}
          radius={PIE_CHART_RADIUS}
        />
      );
    });
  };
  return (
    <View>
      {renderPieSegments()}
    </View>
  );
};

export default PieChart;
