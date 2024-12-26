import {useMemo} from 'react';
import sum from 'lodash/sum';
import {colorsPalette} from '../../style/colorsPalette';
import type {PieChartProps} from '.';

const SEGMENT_COLORS = [colorsPalette.blue40, colorsPalette.red40, colorsPalette.green40, colorsPalette.purple40];
const DEFAULT_COLOR = colorsPalette.grey40;
const MONOCHROME_COLORS = [colorsPalette.blue70, colorsPalette.blue50, colorsPalette.blue30, colorsPalette.blue10];
const DEFAULT_MONOCHROME_COLOR = colorsPalette.blue1;

type UseCombinedSegmentsProps = Pick<PieChartProps, 'segments' | 'monochrome' | 'colors'>;

export const useCombinedSegments = (props: UseCombinedSegmentsProps) => {
  const {segments, monochrome, colors: propsColors} = props;

  const colors = propsColors || (monochrome ? MONOCHROME_COLORS : SEGMENT_COLORS);
  const defaultColor = propsColors
    ? propsColors[propsColors.length - 1]
    : monochrome
      ? DEFAULT_MONOCHROME_COLOR
      : DEFAULT_COLOR;

  const total = sum(segments);
  if (total !== 100) {
    throw new Error('PieChart segments must sum up to 100');
  }
  const combinedSegments = useMemo(() => {
    const sortedSegments = [...segments].sort((a, b) => b - a);
    const isMoreThan4 = sortedSegments.length > 4;
    if (isMoreThan4) {
      const newSegments = sortedSegments.slice(0, 3);
      const restShare = 100 - sum(newSegments);
      newSegments.push(restShare);
      return newSegments;
    }
    return sortedSegments;
  }, [segments]);

  return {segments: combinedSegments, colors, defaultColor};
};
