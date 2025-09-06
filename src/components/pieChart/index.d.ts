import React from 'react';
import { PieSegmentProps } from './PieSegment';
export type PieChartSegmentProps = Pick<PieSegmentProps, 'percentage' | 'color'>;
export type PieChartProps = {
    /**
     * Pie chart segments array
     */
    segments: PieChartSegmentProps[];
    /**
     * Pie chart diameter
     */
    diameter?: number;
} & Pick<PieSegmentProps, 'dividerWidth' | 'dividerColor'>;
declare const PieChart: (props: PieChartProps) => React.JSX.Element | null;
export default PieChart;
