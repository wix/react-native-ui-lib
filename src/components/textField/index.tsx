/**
 * Known issues with React Native TextInput component
 * 1. iOS - input inner padding is off in multiline mode
 * 2. Android - input has minHeight that can't be overridden with zero padding (unlike iOS)
 * 3. Passing typography preset that includes lineHeight usually cause alignment issues with
 * other elements (leading/trailing accessories). It usually best to set lineHeight with undefined
 */
import {isEmpty, trim, omit} from 'lodash';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {asBaseComponent, Constants, forwardRef} from '../../commons/new';
import View from '../view';
import Text from '../text';
import {useMeasure} from '../../hooks';
import {
  TextFieldProps,
  InternalTextFieldProps,
  ValidationMessagePosition,
  FieldContextType,
  TextFieldMethods,
  TextFieldRef,
  Validator,
  ValidationMessagePositionType,
  MandatoryIndication,
  Presets
} from './types';
import TextFieldValidators from './validators';
import {shouldHidePlaceholder} from './Presenter';
import Input from './Input';
import ValidationMessage from './ValidationMessage';
import Label from './Label';
import FieldContext from './FieldContext';
import useFieldState from './useFieldState';
import usePreset from './usePreset';
import FloatingPlaceholder from './FloatingPlaceholder';
import CharCounter from './CharCounter';
import ClearButton from './ClearButton';

interface StaticMembers {
  validationMessagePositions: typeof ValidationMessagePosition;
  presets: typeof Presets;
}

/**
 * @description: A controlled, customizable TextField with validation support
 * @extends: TextInput
 * @extendsLink: https://reactnative.dev/docs/textinput
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/IncubatorTextFieldScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/FloatingPlaceholder.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/Validation.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/ColorByState.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/CharCounter.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/Hint.gif?raw=true
 */
const TextField = (props: InternalTextFieldProps) => {
  const {
    modifiers,
    // General
    containerProps,
    fieldStyle: fieldStyleProp,
    dynamicFieldStyle,
    containerStyle,
    floatingPlaceholder,
    floatingPlaceholderColor,
    floatingPlaceholderStyle,
    floatOnFocus,
    placeholderTextColor,
    hint,
    helperText,
    validationIcon,
    // Label
    label,
    labelColor,
    labelStyle,
    labelProps,
    // Accessory Buttons
    leadingAccessory,
    trailingAccessory,
    topTrailingAccessory,
    bottomAccessory,
    showClearButton,
    onClear,
    // Validation
    enableErrors, // TODO: rename to enableValidation
    validationMessageStyle,
    validationMessagePosition = ValidationMessagePosition.BOTTOM,
    retainValidationSpace = !helperText,
    // Char Counter
    showCharCounter,
    charCounterStyle,
    // Input
    placeholder,
    children,
    centered,
    readonly = false,
    showMandatoryIndication,
    ...others
  } = usePreset(props);

  const {ref: leadingAccessoryRef, measurements: leadingAccessoryMeasurements} = useMeasure();
  const {onFocus, onBlur, onChangeText, fieldState, validateField, checkValidity} = useFieldState(others);

  const context = useMemo(() => {
    return {
      ...fieldState,
      disabled: others.editable === false,
      readonly,
      validateField,
      checkValidity
    };
  }, [fieldState, others.editable, readonly, validateField, checkValidity]);

  const leadingAccessoryClone = useMemo(() => {
    if (leadingAccessory) {
      return React.cloneElement(leadingAccessory, {
        ref: leadingAccessoryRef
      });
    }
  }, [leadingAccessory]);

  const {margins, paddings, typography, positionStyle, color} = modifiers;
  const typographyStyle = useMemo(() => omit(typography, 'lineHeight'), [typography]);
  const colorStyle = useMemo(() => color && {color}, [color]);
  const _floatingPlaceholderStyle = useMemo(() => [typographyStyle, floatingPlaceholderStyle],
    [typographyStyle, floatingPlaceholderStyle]);
  const fieldStyle = [fieldStyleProp, dynamicFieldStyle?.(context, {preset: props.preset})];
  const hidePlaceholder = shouldHidePlaceholder(props, fieldState.isFocused);
  const retainTopMessageSpace = !floatingPlaceholder && isEmpty(trim(label));
  const centeredContainerStyle = centered && styles.centeredContainer;
  const centeredTextStyle = centered && styles.centeredText;
  const _labelStyle = useMemo(() => [labelStyle, centeredTextStyle], [labelStyle, centeredTextStyle]);
  const _validationMessageStyle = useMemo(() => [validationMessageStyle, centeredTextStyle],
    [validationMessageStyle, centeredTextStyle]);
  // const hasValue = fieldState.value !== undefined;
  const inputStyle = useMemo(() => [typographyStyle, colorStyle, others.style, /* hasValue &&  */centeredTextStyle],
    [typographyStyle, colorStyle, others.style, centeredTextStyle/* , hasValue */]);
  const dummyPlaceholderStyle = useMemo(() => [inputStyle, styles.dummyPlaceholder], [inputStyle]);

  return (
    <FieldContext.Provider value={context}>
      <View {...containerProps} style={[margins, positionStyle, containerStyle, centeredContainerStyle]}>
        <View row spread centerV={Constants.isAndroid} style={centeredContainerStyle}>
          <Label
            label={label}
            labelColor={labelColor}
            labelStyle={_labelStyle}
            labelProps={labelProps}
            floatingPlaceholder={floatingPlaceholder}
            validationMessagePosition={validationMessagePosition}
            testID={`${props.testID}.label`}
            showMandatoryIndication={showMandatoryIndication}
            enableErrors={enableErrors}
          />
          {validationMessagePosition === ValidationMessagePosition.TOP && (
            <ValidationMessage
              enableErrors={enableErrors}
              validate={others.validate}
              validationMessage={others.validationMessage}
              validationMessageStyle={_validationMessageStyle}
              retainValidationSpace={retainValidationSpace && retainTopMessageSpace}
              testID={`${props.testID}.validationMessage`}
            />
          )}
          {topTrailingAccessory && <View marginL-s2>{topTrailingAccessory}</View>}
        </View>
        <View style={[paddings, fieldStyle]} row centerV centerH={centered}>
          {/* <View row centerV> */}
          {leadingAccessoryClone}

          {/* Note: We're passing flexG to the View to support properly inline behavior - so the input will be rendered correctly in a row container.
            Known Issue: This slightly push the trailing accessory and clear button when entering a long text
          */}
          {children || (
            <View {...(Constants.isWeb ? {flex: true} : {flexG: true})}>
              {/* Note: Render dummy placeholder for Android center issues */}
              {Constants.isAndroid && centered && (
                <Text marginR-s1 style={dummyPlaceholderStyle}>
                  {placeholder}
                </Text>
              )}
              {floatingPlaceholder && (
                <FloatingPlaceholder
                  defaultValue={others.defaultValue}
                  placeholder={placeholder}
                  floatingPlaceholderStyle={_floatingPlaceholderStyle}
                  floatingPlaceholderColor={floatingPlaceholderColor}
                  floatOnFocus={floatOnFocus}
                  validationMessagePosition={validationMessagePosition}
                  extraOffset={leadingAccessoryMeasurements?.width}
                  testID={`${props.testID}.floatingPlaceholder`}
                  showMandatoryIndication={showMandatoryIndication}
                />
              )}
              <Input
                placeholderTextColor={hidePlaceholder ? 'transparent' : placeholderTextColor}
                value={fieldState.value}
                {...others}
                readonly={readonly}
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChangeText}
                placeholder={placeholder}
                hint={hint}
                showMandatoryIndication={showMandatoryIndication && !label}
              />
            </View>
          )}
          {showClearButton && (
            <ClearButton onClear={onClear} testID={`${props.testID}.clearButton`} onChangeText={onChangeText}/>
          )}
          {trailingAccessory}
          {/* </View> */}
        </View>
        <View row spread>
          {validationMessagePosition === ValidationMessagePosition.BOTTOM && (
            <ValidationMessage
              enableErrors={enableErrors}
              validate={others.validate}
              validationMessage={others.validationMessage}
              validationIcon={validationIcon}
              validationMessageStyle={_validationMessageStyle}
              retainValidationSpace={retainValidationSpace}
              testID={`${props.testID}.validationMessage`}
            />
          )}
          {bottomAccessory}
          {showCharCounter && (
            <CharCounter
              maxLength={others.maxLength}
              charCounterStyle={charCounterStyle}
              testID={`${props.testID}.charCounter`}
            />
          )}
        </View>
        {helperText && (
          <Text $textNeutralHeavy subtext marginT-s1 testID={`${props.testID}.helperText`}>
            {helperText}
          </Text>
        )}
      </View>
    </FieldContext.Provider>
  );
};

TextField.displayName = 'TextField';
TextField.presets = Presets;
TextField.validationMessagePositions = ValidationMessagePosition;

export {
  TextFieldProps,
  FieldContextType,
  StaticMembers as TextFieldStaticMembers,
  TextFieldMethods,
  TextFieldRef,
  ValidationMessagePosition as TextFieldValidationMessagePosition,
  Validator as TextFieldValidator,
  ValidationMessagePositionType as TextFieldValidationMessagePositionType,
  MandatoryIndication as TextFieldMandatoryIndication,
  TextFieldValidators
};

export default asBaseComponent<TextFieldProps, StaticMembers, TextFieldRef>(forwardRef(TextField as any), {
  modifiersOptions: {
    margins: true,
    paddings: true,
    typography: true,
    position: true,
    color: true
  }
});

const styles = StyleSheet.create({
  centeredContainer: {
    alignSelf: 'center'
  },
  centeredText: {
    textAlign: 'center'
  },
  dummyPlaceholder: {
    height: 0
  }
});
