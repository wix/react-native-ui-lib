import React, {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Text from '../../components/text';
import FieldContext from './FieldContext';
import {getRelevantValidationMessage} from './Presenter';
import type {ValidationMessageProps} from './types';

const ValidationMessage = ({
  validationMessage,
  enableErrors,
  validationMessageStyle,
  retainSpace,
  validate,
  testID
}: ValidationMessageProps) => {
  const context = useContext(FieldContext);

  const style = useMemo(() => [styles.validationMessage, validationMessageStyle], [validationMessageStyle]);

  if (!enableErrors || (!retainSpace && context.isValid)) {
    return null;
  }

  const showValidationMessage = !context.isValid || (!validate && !!validationMessage);

  return (
    <Text testID={testID} $textDangerLight style={style}>
      {showValidationMessage ? getRelevantValidationMessage(validationMessage, context.failingValidatorIndex) : ''}
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
