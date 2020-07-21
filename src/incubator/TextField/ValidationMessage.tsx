import React, {useContext} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import Text, {TextPropTypes} from '../../components/text';
import FieldContext from './FieldContext';

export interface ValidationMessageProps {
  enableErrors?: boolean;
  validationMessage?: string;
}

export default ({validationMessage, enableErrors}: ValidationMessageProps) => {
  const context = useContext(FieldContext);

  if (!enableErrors) {
    return null;
  }

  return <Text red30 style={{minHeight: 20}}>{context.isValid ? '' : validationMessage}</Text>;
};
