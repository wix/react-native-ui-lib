import _ from 'lodash';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import Text from '../text';
import FieldContext from './FieldContext';
import {CharCounterProps} from './types';

const CharCounter = ({maxLength, charCounterStyle, testID}: CharCounterProps) => {
  const {value} = useContext(FieldContext);
  const length = value?.length ?? 0;
  const ch = length === 1 ? 'character' : 'characters';
  const accessibilityLabel = `${length} ${ch} out of ${maxLength}`;
  if (_.isUndefined(maxLength)) {
    return null;
  }

  return (
    <Text $textNeutral style={[styles.container, charCounterStyle]} recorderTag={'unmask'} testID={testID} accessible accessibilityLabel={accessibilityLabel}>
      {`${length}/${maxLength}`}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    textAlign: 'right'
  }
});

CharCounter.displayName = 'Incubator.TextField';
export default CharCounter;
