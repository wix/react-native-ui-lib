import React from 'react';
import View from '../view';
import PartialCircle, {PieSegmentProps} from './PieSegment';

export type PieChartSegmentProps = Pick<PieSegmentProps, 'percentage' | 'color'>;

export type PieChartProps = {
  segments: PieChartSegmentProps[];
  size?: number;
} & Pick<PieSegmentProps, 'dividerWidth' | 'dividerColor'>;

const DEFAULT_SIZE = 144;

const PieChart = (props: PieChartProps) => {
  const {segments, size = DEFAULT_SIZE, ...others} = props;

  const renderPieSegments = () => {
    let currentStartAngle = 0;

    return segments.map((segment, index) => {
      const startAngle = currentStartAngle;
      currentStartAngle += (segment.percentage / 100) * 360;
      return (
        <PartialCircle key={index} {...segment} {...others} startAngle={startAngle} radius={size / 2}/>
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
