import React, {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Text from '../text';
import FieldContext from './FieldContext';
import {getRelevantValidationMessage} from './Presenter';
import {ValidationMessageProps} from './types';

const ValidationMessage = ({
  validationMessage,
  enableErrors,
  validationMessageStyle,
  retainValidationSpace,
  validate,
  testID
}: ValidationMessageProps) => {
  const context = useContext(FieldContext);

  const style = useMemo(() => [styles.validationMessage, validationMessageStyle], [validationMessageStyle]);

  if (!enableErrors || (!retainValidationSpace && context.isValid)) {
    return null;
  }

  const relevantValidationMessage = getRelevantValidationMessage(validationMessage, context.failingValidatorIndex);
  const showValidationMessage = !context.isValid || (!validate && !!validationMessage);

  return (
    <Text testID={testID} $textDangerLight style={style}>
      {showValidationMessage ? relevantValidationMessage : ''}
    </Text>
  );
};

const styles = StyleSheet.create({
  validationMessage: {
    flexShrink: 1,
    minHeight: 20
  }
});

ValidationMessage.displayName = 'Incubator.TextField';
export default ValidationMessage;
