import React, {useMemo} from 'react';
import _ from 'lodash';
import View from '../view';
import PartialCircle, {PartialCircleProps} from './PartialCircle';

export type PieChartSegmentProps = Pick<PartialCircleProps, 'percentage' | 'color'>;

export type PieChartProps = {
  segments: PieChartSegmentProps[];
  size?: number;
};

const DEFAULT_SIZE = 144;

const PieChart = (props: PieChartProps) => {
  const {segments, size = DEFAULT_SIZE} = props;

  const total = useMemo(() => {
    return _.sum(segments.map(s => s.percentage));
  }, [segments]);
  if (total !== 100) {
    throw new Error('PieChart segments must sum up to 100');
  }

  const renderPieSegments = () => {
    let currentStartAngle = 0;

    return segments.map((segment, index) => {
      const startAngle = currentStartAngle;
      currentStartAngle += (segment.percentage / 100) * 360;
      return <PartialCircle key={index} {...segment} startAngle={startAngle} radius={size / 2}/>;
    });
  };
  return (
    <View width={size} height={size}>
      {renderPieSegments()}
    </View>
  );
};

export default PieChart;
