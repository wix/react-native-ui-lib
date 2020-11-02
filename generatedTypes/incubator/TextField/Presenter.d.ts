import { ContextType } from './FieldContext';
import { ColorType, Validator } from './types';
export declare function getColorByState(color: ColorType, context?: ContextType): string;
export declare function validate(value?: string, validator?: Validator | Validator[]): [boolean, number?];
export declare function getRelevantValidationMessage(validationMessage: string | string[] | undefined, failingValidatorIndex: undefined | number): string | undefined;
