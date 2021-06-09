import _pt from "prop-types";
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Text from "../../components/text";
import FieldContext from "./FieldContext";
import { getRelevantValidationMessage } from "./Presenter";

const ValidationMessage = ({
  validationMessage,
  enableErrors,
  validationMessageStyle,
  retainSpace
}) => {
  const context = useContext(FieldContext);

  if (!enableErrors || !retainSpace && context.isValid) {
    return null;
  }

  const relevantValidationMessage = getRelevantValidationMessage(validationMessage, context.failingValidatorIndex);
  return <Text red30 style={[styles.validationMessage, validationMessageStyle]}>
      {context.isValid ? '' : relevantValidationMessage}
    </Text>;
};

ValidationMessage.propTypes = {
  /**
     * Should support showing validation error message
     */
  enableErrors: _pt.bool,

  /**
     * The validation message to display when field is invalid (depends on validate)
     */
  validationMessage: _pt.oneOfType([_pt.string, _pt.arrayOf(_pt.string)]),
  retainSpace: _pt.bool
};
const styles = StyleSheet.create({
  validationMessage: {
    minHeight: 20
  }
});
ValidationMessage.displayName = 'Incubator.TextField';
export default ValidationMessage;