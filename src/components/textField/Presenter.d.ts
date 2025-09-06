import { ColorType, Validator, FieldContextType, FloatingPlaceholderProps } from './types';
import { TextFieldProps } from './index';
export declare function getColorByState(color?: ColorType, context?: FieldContextType): string | undefined;
export declare function validate(value?: string, validator?: Validator | Validator[]): [boolean, number?];
export declare function getRelevantValidationMessage(validationMessage: string | string[] | undefined, failingValidatorIndex: undefined | number): string | string[] | undefined;
export declare function shouldHidePlaceholder({ floatingPlaceholder, hint, floatOnFocus }: TextFieldProps, isFocused: boolean): boolean;
export declare function shouldPlaceholderFloat({ defaultValue, floatOnFocus }: FloatingPlaceholderProps, isFocused: boolean, hasValue: boolean, value?: string): boolean;
