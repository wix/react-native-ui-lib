import {StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import formValidators from './validators';
import {
  MarginModifiers,
  PaddingModifiers,
  TypographyModifiers,
  ColorsModifiers,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps
} from '../../commons/new';
import {TextProps} from '../text';
import {RecorderProps} from '../../typings/recorderTypes';
import {PropsWithChildren, ReactElement} from 'react';
import {ViewProps} from '../view';
import type {IconProps} from '../icon';

export type ColorType =
  | string
  | {
      default?: string;
      focus?: string;
      error?: string;
      disabled?: string;
      readonly?: string;
    };

export enum ValidationMessagePosition {
  TOP = 'top',
  BOTTOM = 'bottom'
}

export enum Presets {
  DEFAULT = 'default', // TODO: remove
  UNDERLINE = 'underline',
  OUTLINE = 'outline'
}

export type ValidationMessagePositionType = `${ValidationMessagePosition}` | ValidationMessagePosition;

export type Validator = ((value?: string) => boolean) | keyof typeof formValidators;

export interface FieldStateProps extends InputProps {
  validateOnStart?: boolean;
  validateOnChange?: boolean;
  validationDebounceTime?: number;
  validateOnBlur?: boolean;
  /**
   * Callback for when field validated and failed
   */
  onValidationFailed?: (failedValidatorIndex: number) => void;
  /**
   * A single or multiple validator. Can be a string (required, email) or custom function.
   */
  validate?: Validator | Validator[];
  /**
   * The validation message to display when field is invalid (depends on validate)
   */
  validationMessage?: string | string[];
  /**
   * Callback for when field validity has changed
   */
  onChangeValidity?: (isValid: boolean) => void;
}

export interface MandatoryIndication {
  /**
   * Whether to show a mandatory field indication.
   */
  showMandatoryIndication?: boolean;
}

export interface ClearButtonProps extends Pick<TextInputProps, 'testID' | 'onChangeText'> {
  /**
   * On clear button callback
   */
  onClear?: () => void;
  /**
   * The style of the clear button
   */
  clearButtonStyle?: StyleProp<ViewStyle>;
}

export interface LabelProps extends MandatoryIndication, Pick<ValidationMessageProps, 'enableErrors'> {
  /**
   * Field label
   */
  label?: string;
  /**
   * Field label color. Either a string or color by state map ({default, focus, error, disabled, readonly})
   */
  labelColor?: ColorType;
  /**
   * Custom style for the field label
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Pass extra props to the label Text element
   */
  labelProps?: TextProps;
  validationMessagePosition?: ValidationMessagePositionType;
  floatingPlaceholder?: boolean;
  testID?: string;
}

export interface FloatingPlaceholderProps extends MandatoryIndication {
  /**
   * The placeholder for the field
   */
  placeholder?: string;
  /**
   * The floating placeholder color
   */
  floatingPlaceholderColor?: ColorType;
  /**
   * Custom style to pass to the floating placeholder
   */
  floatingPlaceholderStyle?: StyleProp<TextStyle>;
  /**
   * Should placeholder float on focus or when start typing
   */
  floatOnFocus?: boolean;
  validationMessagePosition?: ValidationMessagePositionType;
  extraOffset?: number;
  defaultValue?: TextInputProps['defaultValue'];
  testID: string;
}

export interface ValidationMessageProps {
  /**
   * Should support showing validation error message
   */
  enableErrors?: boolean;
  /**
   * The validation message to display when field is invalid (depends on validate)
   */
  validationMessage?: string | string[];
  /**
   * Custom style for the validation message
   */
  validationMessageStyle?: StyleProp<TextStyle>;
  /** 
   * Icon left to the validation message
   */
  validationIcon?: IconProps;
  /**
   * Keep the validation space even if there is no validation message
   */
  retainValidationSpace?: boolean;
  validate?: FieldStateProps['validate'];
  testID?: string;
}

export interface CharCounterProps {
  /**
   * Should show a character counter (works only with maxLength)
   */
  showCharCounter?: boolean;
  maxLength?: number;
  /**
   * Pass custom style to character counter text
   */
  charCounterStyle?: TextStyle;
  testID: string;
}

export interface InputProps
  extends Omit<TextInputProps, 'placeholderTextColor'>,
    MandatoryIndication,
    RecorderProps {
  /**
   * A hint text to display when focusing the field
   */
  hint?: string;
  /**
   * Input color
   */
  color?: ColorType;
  /**
   * placeholder text color
   */
  placeholderTextColor?: ColorType;
  /**
   * Custom formatter for the input value (used only when input is not focused)
   */
  formatter?: (value?: string) => string | undefined;
  /**
   * Use react-native-gesture-handler instead of react-native for the base TextInput
   */
  useGestureHandlerInput?: boolean;
  /**
   * A UI preset for read only state
   */
  readonly?: boolean;
}

export type TextFieldProps = MarginModifiers &
  PaddingModifiers &
  TypographyModifiers &
  ColorsModifiers &
  InputProps &
  LabelProps &
  Omit<FloatingPlaceholderProps, 'testID'> &
  MandatoryIndication &
  Omit<ClearButtonProps, 'testID' | 'onChangeText'> &
  // We're declaring these props explicitly here for react-docgen (which can't read hooks)
  // FieldStateProps &
  ValidationMessageProps &
  Omit<CharCounterProps, 'maxLength' | 'testID'> & {
    /**
     * Pass to render a leading element
     */
    leadingAccessory?: ReactElement;
    /**
     * Pass to render a trailing element
     */
    trailingAccessory?: ReactElement;
    /**
     * Pass to render a top trailing element
     */
    topTrailingAccessory?: ReactElement;
    /**
     * Pass to render a bottom element below the input
     */
    bottomAccessory?: ReactElement;
    /**
     * Should show a clear button when there is a value
     */
    showClearButton?: boolean;
    /**
     * Text to display under the input
     */
    helperText?: string;
    /**
     * Pass to add floating placeholder support
     */
    floatingPlaceholder?: boolean;
    /**
     * Custom style for the floating placeholder
     */
    floatingPlaceholderStyle?: TextStyle;
    /**
     * A single or multiple validator. Can be a string (required, email) or custom function.
     */
    validate?: Validator | Validator[];
    /**
     * Should validate when the TextField mounts
     */
    validateOnStart?: boolean;
    /**
     * Should validate when the TextField value changes
     */
    validateOnChange?: boolean;
    /**
     * Add a debounce timeout when sending validateOnChange
     */
    validationDebounceTime?: number;
    /**
     * Should validate when losing focus of TextField
     */
    validateOnBlur?: boolean;
    /**
     * Callback for when field validated and failed
     */
    onValidationFailed?: (failedValidatorIndex: number) => void;
    /**
     * Callback for when field validity has changed
     */
    onChangeValidity?: (isValid: boolean) => void;
    /**
     * The position of the validation message (top/bottom)
     */
    validationMessagePosition?: ValidationMessagePositionType;
    /**
     * Internal style for the field container
     */
    fieldStyle?: StyleProp<ViewStyle>;
    /**
     * Internal dynamic style callback for the field container
     */
    dynamicFieldStyle?: (context: FieldContextType, props: {preset: TextFieldProps['preset']}) => StyleProp<ViewStyle>;
    /**
     * Pass props to the container
     */
    containerProps?: Omit<ViewProps, 'style'>;
    /**
     * Container style of the whole component
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Predefined preset to use for styling the field
     */
    preset?: Presets | `${Presets}` | null | string;
    /**
     * Whether to center the TextField - container and label
     */
    centered?: boolean;
    /**
     * Set the inner container to use flex behavior to resolve text overflow issues when using leading or trailing accessories
     * This may cause flex issues when the field is inside a row container */
    innerFlexBehavior?: boolean;
  };

export type InternalTextFieldProps = PropsWithChildren<
  TextFieldProps & BaseComponentInjectedProps & ForwardRefInjectedProps
>;

export type FieldContextType = {
  value?: string;
  isFocused: boolean;
  hasValue: boolean;
  isValid: boolean;
  failingValidatorIndex?: number;
  disabled: boolean;
  readonly: boolean;
  validateField: () => void;
  checkValidity: () => boolean;
  isMandatory: boolean;
};

export interface TextFieldMethods {
  isFocused: () => void;
  focus: () => void;
  blur: () => void;
  clear: () => void;
  validate: () => boolean;
  isValid: () => boolean;
}

export type TextFieldRef = TextInput & TextFieldMethods;
