import React, {useContext} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import _ from 'lodash';
import Text from '../../components/text';
import FieldContext from './FieldContext';

export interface CharCounterProps {
  showCharCounter?: boolean;
  maxLength?: number;
  charCounterStyle?: TextStyle;
}

export default ({showCharCounter, maxLength, charCounterStyle}: CharCounterProps) => {
  const {value} = useContext(FieldContext);

  if (showCharCounter && !_.isUndefined(maxLength)) {
    return (
      <Text grey30 style={[styles.container, charCounterStyle]}>
        {`${_.size(value)}/${maxLength}`}
      </Text>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'right'
  }
});
