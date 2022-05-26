import {isEmpty} from 'lodash';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {AlignmentModifiers, extractAlignmentsValues} from '../../../commons/modifiers';

const useAlignmentStyle = (props: AlignmentModifiers) => {
  const getAlignments = () => {
    const alignments = extractAlignmentsValues(props);
    if (isEmpty(alignments)) {
      return styles.defaultAlignment;
    } else {
      return alignments;
    }
  };

  const alignments = getAlignments();

  const alignmentStyle = useMemo(() => {
    return [styles.container, alignments];
  }, [alignments]);

  return {alignmentStyle};
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
