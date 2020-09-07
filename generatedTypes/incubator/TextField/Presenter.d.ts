import { ContextType } from './FieldContext';
import { ColorType, Validator } from './types';
export declare function getColorByState(color: ColorType, context?: ContextType): string | undefined;
export declare function validate(value: string | undefined, validator?: Validator | Validator[]): [boolean, number | undefined];
export declare function getRelevantValidationMessage(validationMessage: string | string[] | undefined, failingValidatorIndex: undefined | number): string | undefined;
