import React, {useCallback, useState, useMemo} from 'react';
import {TextInputProps, ViewStyle, TextStyle} from 'react-native';
import View from '../../components/view';
import Text from '../../components/text';
import {ImageProps} from '../../components/image';
import Input from './Input';
import Icon from './Icon';
import ValidationMessage, {ValidationMessageProps} from './ValidationMessage';
import Label, {LabelProps} from './Label';
import FieldContext from './FieldContext';
import withFieldState, {FieldState} from './withFieldState';
import FloatingPlaceholder from './FloatingPlaceholder';

interface TextFieldProps
  extends TextInputProps,
    LabelProps,
    ValidationMessageProps,
    Omit<FieldState, keyof TextInputProps> {
  leadingIcon?: ImageProps;
  trailingIcon?: ImageProps;
  floatingPlaceholder?: boolean;
  floatingPlaceholderStyle?: TextStyle;
  labelColor?: string;
  fieldStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

const TextField = (
  {
    // General
    fieldStyle,
    containerStyle,
    floatingPlaceholder,
    floatingPlaceholderStyle,
    // Label
    label,
    labelColor,
    labelStyle,
    labelProps,
    // Icons
    leadingIcon,
    trailingIcon,
    // Validation
    enableErrors,
    validationMessage,
    validationMessageStyle,
    // Field State
    fieldState,
    // Input
    placeholder,
    ...props
  }: TextFieldProps,
  ref
) => {
  const context = useMemo(() => {
    return {...fieldState, disabled: props.editable === false};
  }, [fieldState, props.editable]);

  return (
    <FieldContext.Provider value={context}>
      <View style={containerStyle}>
        <Label
          label={label}
          labelColor={labelColor}
          labelStyle={labelStyle}
          labelProps={labelProps}
        />
        <View style={fieldStyle}>
          <View row centerV>
            {leadingIcon && <Icon {...leadingIcon}/>}
            <View flex>
              {floatingPlaceholder && <FloatingPlaceholder placeholder={placeholder} style={floatingPlaceholderStyle}/>}
              <Input {...props} placeholder={floatingPlaceholder ? undefined : placeholder} ref={ref}/>
            </View>
            {trailingIcon && <Icon {...trailingIcon}/>}
          </View>
        </View>
        <ValidationMessage
          enableErrors={enableErrors}
          validationMessage={validationMessage}
          validationMessageStyle={validationMessageStyle}
        />
      </View>
    </FieldContext.Provider>
  );
};

export default withFieldState(React.forwardRef(TextField));
