import React, {useContext} from 'react';
import {TextInput, TextInputProps, TextStyle, StyleSheet} from 'react-native';
import Text, {TextPropTypes} from '../../components/text';
import FieldContext from './FieldContext';

export interface ValidationMessageProps {
  enableErrors?: boolean;
  validationMessage?: string;
  validationMessageStyle?: TextStyle;
}

export default ({
  validationMessage,
  enableErrors,
  validationMessageStyle
}: ValidationMessageProps) => {
  const context = useContext(FieldContext);

  if (!enableErrors) {
    return null;
  }

  return (
    <Text red30 style={[styles.validationMessage, validationMessageStyle]}>
      {context.isValid ? '' : validationMessage}
    </Text>
  );
};

const styles = StyleSheet.create({
  validationMessage: {
    minHeight: 20
  }
});
