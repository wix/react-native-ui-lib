import React, {useMemo} from 'react';
import View from '../view';
import {colorsPalette} from '../../style/colorsPalette';
import PartialCircle from './PartialCircle';
import {Spacings} from 'style';

type PieChartProps = {
  segments: number[];
  monochrome?: boolean;
};

const SEGMENT_COLORS = (['blue', 'red', 'green', 'purple'] as const).map(color => colorsPalette[`${color}40`]);
const DEFAULT_COLOR = colorsPalette.grey40;
const MONOCHROME_COLORS = ([70, 50, 30, 10] as const).map(colorNumber => colorsPalette[`blue${colorNumber}`]);
const DEFAULT_MONOCHROME_COLOR = colorsPalette.blue1;
const PIE_CHART_RADIUS = 100;

const useCombinedSegments = (segments: number[]) => {
  const total = segments.reduce((acc, segment) => acc + segment, 0);
  if (total !== 100) {
    throw new Error('PieChart segments must sum up to 100');
  }
  const combinedSegments = useMemo(() => {
    const isMoreThan4 = segments.length > 4;
    if (isMoreThan4) {
      const combinedSegments = segments.slice(0, 3);
      const sumOfFirst = combinedSegments.reduce((acc, segment) => acc + segment, 0);
      combinedSegments.push(100 - sumOfFirst);
      return combinedSegments;
    }
    return segments;
  }, [segments]);
  return combinedSegments;
};

const PieChart = (props: PieChartProps) => {
  const {segments: propSegments, monochrome = false} = props;
  const colors = monochrome ? MONOCHROME_COLORS : SEGMENT_COLORS;
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
          radius={PIE_CHART_RADIUS}
        />
      );
    });
  };
  return (
    <View width={2 * PIE_CHART_RADIUS} height={2 * PIE_CHART_RADIUS}>
      {renderPieSegments()}
    </View>
  );
};

export default PieChart;
