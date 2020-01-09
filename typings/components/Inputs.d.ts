import {ReactElement} from 'react';
import {
  GestureResponderEvent,
  ImageSourcePropType,
  StyleProp,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle
} from 'react-native';
import {BaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {TopBarProps} from '../screensComponents/Modal';

export type BaseInputDefaultValidator = 'required' | 'email' | 'url' | 'number' | 'price';
export type BaseInputCustomValidator = (value?: string) => boolean;
export type BaseInputValidator = BaseInputDefaultValidator | BaseInputCustomValidator;
export type BaseInputValidateProp = BaseInputValidator | BaseInputValidator[];

export interface BaseInputProps extends RNTextInputProps {
  color?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
  validate?: BaseInputValidateProp;
  markRequired?: boolean;
  errorMessage?: string | string[];
  validateOnStart?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  onChangeValidity?: (isValid: boolean) => void;
}

export class BaseInput<Props extends BaseInputProps = BaseInputProps, State = {}> extends BaseComponent<Props, State> {}

export interface TextAreaProps extends BaseInputProps {}

export class TextArea extends BaseInput<TextAreaProps> {}

export type InputColorValue = ColorValue | { [key: string]: ColorValue };

export interface TextBaseInputProps {
  floatingPlaceholder?: boolean;
  floatingPlaceholderColor?: InputColorValue;
  helperText?: string;
  hideUnderline?: boolean;
  underlineColor?: InputColorValue;
  disabledColor?: ColorValue;
  centered?: boolean;
  error?: string;
  enableErrors?: boolean;
  expandable?: boolean;
  transformer?: (text?: string) => string | undefined;
  title?: string;
  titleColor?: InputColorValue;
  titleStyle?: StyleProp<TextStyle>;
  showCharacterCounter?: boolean;
  floatOnFocus?: boolean;
  useTopErrors?: boolean;
  rightIconSource?: ImageSourcePropType;
}

export interface TextFieldRightButtonProps {
  iconSource?: ImageSourcePropType;
  iconColor?: ColorValue;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

export interface TextFieldProps extends BaseInputProps, TextBaseInputProps {
  renderExpandableInput?: (props: TextFieldProps) => ReactElement;
  renderExpandable?: (props: TextFieldProps, state: TextFieldState) => ReactElement;
  onToggleExpandableModal?: (value?: string) => void;
  topBarProps?: TopBarProps;
  rightButtonProps?: TextFieldRightButtonProps;
}

export type TextFieldState = any;

export class TextField extends BaseInput<TextFieldProps, TextFieldState> {}

export interface TextInputProps extends BaseInputProps, TextBaseInputProps {
  renderExpandableInput?: (props: TextInputProps) => ReactElement | ReactElement[];
  renderExpandable?: (props: TextInputProps, state: TextInputState) => ReactElement | ReactElement[];
}

export type TextInputState = any;

export class TextInput extends BaseInput<TextInputProps, TextInputState> {}

export interface MaskedInputProps extends TextFieldProps {
  renderMaskedText?: (value?: string) => ReactElement | ReactElement[];
  containerStyle?: StyleProp<ViewStyle>;
}

export class MaskedInput extends BaseInput<MaskedInputProps> {}
