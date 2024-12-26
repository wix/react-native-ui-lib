import {useMemo} from 'react';
import sum from 'lodash/sum';

export const useCombinedSegments = (segments: number[]) => {
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
  return combinedSegments;
};
