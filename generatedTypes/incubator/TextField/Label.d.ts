/// <reference types="react" />
import { TextStyle } from 'react-native';
import { TextPropTypes } from '../../components/text';
import { ColorType, ValidationMessagePosition } from './types';
export interface LabelProps {
    label?: string;
    labelColor?: ColorType;
    labelStyle?: TextStyle;
    labelProps?: TextPropTypes;
    validationMessagePosition?: ValidationMessagePosition;
}
declare const _default: ({ label, labelColor, labelStyle, labelProps, validationMessagePosition }: LabelProps) => JSX.Element | null;
export default _default;
