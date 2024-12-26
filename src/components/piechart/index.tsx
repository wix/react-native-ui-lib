import React from 'react';
import View from '../view';
import {colorsPalette} from '../../style/colorsPalette';
import {useCombinedSegments} from './useCombinedSegments';
import PartialCircle from './PartialCircle';

type PieChartProps = {
  segments: number[];
  monochrome?: boolean;
  size?: number;
  colors?: string[];
  padding?: number;
};

const SEGMENT_COLORS = [colorsPalette.blue40, colorsPalette.red40, colorsPalette.green40, colorsPalette.purple40];
const DEFAULT_COLOR = colorsPalette.grey40;
const MONOCHROME_COLORS = [colorsPalette.blue70, colorsPalette.blue50, colorsPalette.blue30, colorsPalette.blue10];
const DEFAULT_MONOCHROME_COLOR = colorsPalette.blue1;
const DEFAULT_SIZE = 144;

const PieChart = (props: PieChartProps) => {
  const {segments: propSegments, monochrome = false, size = DEFAULT_SIZE, colors: propsColor, padding} = props;
  const colors = propsColor || (monochrome ? MONOCHROME_COLORS : SEGMENT_COLORS);
  const defaultColor = monochrome ? DEFAULT_MONOCHROME_COLOR : DEFAULT_COLOR;
  const segments = useCombinedSegments(propSegments);

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
    <View
      width={size}
      height={size}
    >
      {renderPieSegments()}
    </View>
  );
};

export default PieChart;
