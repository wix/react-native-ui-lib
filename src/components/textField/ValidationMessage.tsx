import React, {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../style';
import View from '../view';
import Text from '../text';
import Icon from '../icon';
import FieldContext from './FieldContext';
import {getRelevantValidationMessage} from './Presenter';
import {ValidationMessageProps} from './types';

const ValidationMessage = ({
  validationMessage,
  validationIcon,
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

  const renderMessage = () => {
    return (
      <Text testID={testID} $textDangerLight style={style}>
        {showValidationMessage ? relevantValidationMessage : ''}
      </Text>
    );
  };

  if (validationIcon?.source) {
    return (
      <View row>
        {showValidationMessage && validationMessage &&
          <Icon tintColor={Colors.$textDangerLight} size={14} marginR-s1 {...validationIcon} testID={`${testID}.icon`}/>}
        {renderMessage()}
      </View>
    );
  }

  return renderMessage();
};

const styles = StyleSheet.create({
  validationMessage: {
    flexShrink: 1,
    minHeight: 20
  }
});

ValidationMessage.displayName = 'Incubator.TextField';
export default ValidationMessage;
