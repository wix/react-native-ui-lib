import React, {useContext} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import _ from 'lodash';
import Text from '../../components/text';
import FieldContext from './FieldContext';

export interface CharCounterProps {
  /**
   * Should show a character counter (works only with maxLength)
   */
  showCharCounter?: boolean;
  maxLength?: number;
  /**
   * Pass custom style to character counter text
   */
  charCounterStyle?: TextStyle;
}

const CharCounter = ({maxLength, charCounterStyle}: CharCounterProps) => {
  const {value} = useContext(FieldContext);

  if (_.isUndefined(maxLength)) {
    return null;
  }

  return (
    <Text grey30 style={[styles.container, charCounterStyle]}>
      {`${_.size(value)}/${maxLength}`}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'right'
  }
});

CharCounter.displayName = 'Incubator.TextField';
export default CharCounter;
