import React, {useMemo} from 'react';
import {ViewStyle, TextStyle} from 'react-native';
import _ from 'lodash';
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
    Omit<CharCounterProps, 'maxLength'> {
  /**
   * Pass to render a leading button/icon
   */
  leadingButton?: ButtonPropTypes;
  /**
   * Pass to render a trailing button/icon
   */
  trailingButton?: ButtonPropTypes;
  /**
   * Pass to add floating placeholder support
   */
  floatingPlaceholder?: boolean;
  /**
   * Custom style for the floating placeholder
   */
  floatingPlaceholderStyle?: TextStyle;
  /**
   * The position of the validation message (top/bottom) 
   */
  validationMessagePosition?: ValidationMessagePosition;
  /**
   * Internal style for the field container
   */
  fieldStyle?: ViewStyle;
  /**
   * Container style of the whole component
   */
  containerStyle?: ViewStyle;
}

interface InternalTextFieldProps
  extends TextFieldProps,
    Omit<FieldStateInjectedProps, keyof InputProps>,
    ForwardRefInjectedProps {}

interface StaticMembers {
  validationMessagePositions: typeof ValidationMessagePosition;
}

/**
 * @description: TextField component with validation and customization API
 * @extends: TextInput
 * @extendslink: https://reactnative.dev/docs/textinput
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/IncubatorTextFieldScreen.tsx
 */
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
          {showCharCounter && 
            <CharCounter
              maxLength={props.maxLength}
              charCounterStyle={charCounterStyle}
            />
          }
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
