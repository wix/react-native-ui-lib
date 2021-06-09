import _pt from "prop-types";
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import Text from "../../components/text";
import FieldContext from "./FieldContext";

const CharCounter = ({
  maxLength,
  charCounterStyle
}) => {
  const {
    value
  } = useContext(FieldContext);

  if (_.isUndefined(maxLength)) {
    return null;
  }

  return <Text grey30 style={[styles.container, charCounterStyle]}>
      {`${_.size(value)}/${maxLength}`}
    </Text>;
};

CharCounter.propTypes = {
  /**
     * Should show a character counter (works only with maxLength)
     */
  showCharCounter: _pt.bool,
  maxLength: _pt.number
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'right'
  }
});
CharCounter.displayName = 'Incubator.TextField';
export default CharCounter;