import {isEmpty} from 'lodash';
import {useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {AlignmentModifiers, extractAlignmentsValues} from '../../../commons/modifiers';

export enum AlignmentType {
  DEFAULT = 'default',
  BOTTOM = 'bottom',
  TOP = 'top'
}

const useAlignmentStyle = (props: AlignmentModifiers) => {
  const alignmentType = useRef<AlignmentType>(AlignmentType.DEFAULT);
  const getAlignments = () => {
    const alignments = extractAlignmentsValues(props);
    if (isEmpty(alignments)) {
      return styles.defaultAlignment;
    } else {
      alignmentType.current = props?.bottom ? AlignmentType.BOTTOM : AlignmentType.TOP;
      return alignments;
    }
  };

  const alignments = getAlignments();

  const alignmentStyle = useMemo(() => {
    return [styles.container, alignments];
  }, [alignments]);

  return {alignmentType: alignmentType.current, alignmentStyle};
};

export default useAlignmentStyle;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  defaultAlignment: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
