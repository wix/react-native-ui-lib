import React from 'react';
import { ColorValue } from 'react-native';
export type PieSegmentProps = {
    /**
     * The percentage of pie the segment should cover
     */
    percentage: number;
    /**
     * The radius of the containing pie
     */
    radius: number;
    /**
     * The color of the segment
     */
    color: string;
    /**
     * The start angle of the segment
     */
    startAngle?: number;
    /**
     * The padding between the segments and the container of the pie.
     */
    padding?: number;
    /**
     * The width of the divider between the segments
     */
    dividerWidth?: number;
    /**
     * The color of the divider between the segments
     */
    dividerColor?: ColorValue;
};
declare const PieSegment: (props: PieSegmentProps) => React.JSX.Element;
export default PieSegment;
