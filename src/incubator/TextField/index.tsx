import React from 'react';
import {TextInputProps, ViewStyle} from 'react-native';
import View from '../../components/view';
import {ImageProps} from '../../components/image';
import Input from './Input';
import Icon from './Icon';
import ValidationMessage from './ValidationMessage';
import Label from './Label';

interface TextFieldProps extends TextInputProps {
  leadingIcon?: ImageProps;
  trailingIcon?: ImageProps;
  validationMessage?: string;
  label?: string;
  fieldStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

export default ({
  leadingIcon,
  trailingIcon,
  validationMessage,
  label,
  fieldStyle,
  containerStyle,
  ...others
}: TextFieldProps) => {
  return (
    <View style={containerStyle}>
      <Label>{label}</Label>
      <View style={fieldStyle}>
        <View row>
          {leadingIcon && <Icon {...leadingIcon} />}
          <Input {...others} />
          {trailingIcon && <Icon {...trailingIcon} />}
        </View>
      </View>
      <ValidationMessage>{validationMessage}</ValidationMessage>
    </View>
  );
};
