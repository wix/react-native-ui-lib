import React, {useMemo} from 'react';
import {ViewStyle, TextStyle} from 'react-native';
import {
  asBaseComponent,
  forwardRef,
  ForwardRefInjectedProps
} from '../../commons/new';
import View from '../../components/view';
import {ButtonPropTypes} from '../../components/button';
import {ValidationMessagePosition} from './types';
import Input, {InputProps} from './Input';
import AccessoryButton from './AccessoryButton';
import ValidationMessage, {ValidationMessageProps} from './ValidationMessage';
import Label, {LabelProps} from './Label';
import FieldContext from './FieldContext';
import withFieldState, {
  FieldStateInjectedProps,
  FieldStateProps
} from './withFieldState';
import FloatingPlaceholder, {
  FloatingPlaceholderProps
} from './FloatingPlaceholder';
import CharCounter, {CharCounterProps} from './CharCounter';

interface TextFieldProps
  extends InputProps,
    LabelProps,
    FloatingPlaceholderProps,
    FieldStateProps,
    ValidationMessageProps,
    CharCounterProps {
  leadingButton?: ButtonPropTypes;
  trailingButton?: ButtonPropTypes;
  floatingPlaceholder?: boolean;
  floatingPlaceholderStyle?: TextStyle;
  validationMessagePosition?: ValidationMessagePosition;
  fieldStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

interface InternalTextFieldProps
  extends TextFieldProps,
    Omit<FieldStateInjectedProps, keyof InputProps>,
    ForwardRefInjectedProps {}

interface StaticMembers {
  validationMessagePositions: typeof ValidationMessagePosition;
}

const TextField = (
  {
    // General
    fieldStyle,
    containerStyle,
    floatingPlaceholder,
    floatingPlaceholderColor,
    floatingPlaceholderStyle,
    hint,
    // Label
    label,
    labelColor,
    labelStyle,
    labelProps,
    // Accessory Buttons
    leadingButton,
    trailingButton,
    // Validation
    enableErrors, // TODO: rename to enableValidation
    validationMessage,
    validationMessageStyle,
    validationMessagePosition = ValidationMessagePosition.BOTTOM,
    // Char Counter
    showCharCounter,
    charCounterStyle,
    // Field State
    fieldState,
    // Input
    placeholder,
    ...props
  }: InternalTextFieldProps
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
          validationMessagePosition={validationMessagePosition}
        />
        {validationMessagePosition === ValidationMessagePosition.TOP && (
          <ValidationMessage
            enableErrors={enableErrors}
            validationMessage={validationMessage}
            validationMessageStyle={validationMessageStyle}
          />
        )}
        <View style={fieldStyle}>
          <View row centerV>
            {leadingButton && <AccessoryButton {...leadingButton}/>}
            <View flex>
              {floatingPlaceholder && (
                <FloatingPlaceholder
                  placeholder={placeholder}
                  floatingPlaceholderStyle={floatingPlaceholderStyle}
                  floatingPlaceholderColor={floatingPlaceholderColor}
                />
              )}
              <Input
                {...props}
                placeholder={floatingPlaceholder ? undefined : placeholder}
                hint={hint}
              />
            </View>
            {trailingButton && <AccessoryButton {...trailingButton}/>}
          </View>
        </View>
        <View row spread>
          {validationMessagePosition === ValidationMessagePosition.BOTTOM && (
            <ValidationMessage
              enableErrors={enableErrors}
              validationMessage={validationMessage}
              validationMessageStyle={validationMessageStyle}
              retainSpace
            />
          )}
          <CharCounter
            showCharCounter={showCharCounter}
            maxLength={props.maxLength}
            charCounterStyle={charCounterStyle}
          />
        </View>
      </View>
    </FieldContext.Provider>
  );
};

TextField.displayName = 'Incubator.TextField';
TextField.validationMessagePositions = ValidationMessagePosition;

export default asBaseComponent<TextFieldProps, StaticMembers>(
  forwardRef(withFieldState(TextField as any))
);
