import React, {useContext} from 'react';
import {TextStyle, StyleSheet} from 'react-native';
import Text from '../../components/text';
import FieldContext from './FieldContext';
import {getRelevantValidationMessage} from './Presenter';

export interface ValidationMessageProps {
  /**
   * Should support showing validation error message
   */
  enableErrors?: boolean;
  /**
   * The validation message to display when field is invalid (depends on validate)
   */
  validationMessage?: string | string[];
  /**
   * Custom style for the validation message
   */
  validationMessageStyle?: TextStyle;
  retainSpace?: boolean;
}

const ValidationMessage = ({
  validationMessage,
  enableErrors,
  validationMessageStyle,
  retainSpace
}: ValidationMessageProps) => {
  const context = useContext(FieldContext);

  if (!enableErrors || (!retainSpace && context.isValid)) {
    return null;
  }

  const relevantValidationMessage = getRelevantValidationMessage(
    validationMessage,
    context.failingValidatorIndex
  );

  return (
    <Text red30 style={[styles.validationMessage, validationMessageStyle]}>
      {context.isValid ? '' : relevantValidationMessage}
    </Text>
  );
};

const styles = StyleSheet.create({
  validationMessage: {
    minHeight: 20
  }
});

ValidationMessage.displayName = 'Incubator.TextField';
export default ValidationMessage;
