import React, {useContext} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import _ from 'lodash';
import Text from '../../components/text';
import FieldContext from './FieldContext';

export interface CharCounterProps {
  showCharCounter?: boolean;
  maxLength: number;
  charCounterStyle?: TextStyle;
}

export default ({maxLength, charCounterStyle}: CharCounterProps) => {
  const {value} = useContext(FieldContext);
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
