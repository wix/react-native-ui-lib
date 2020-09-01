/// <reference types="react" />
import { TextStyle } from 'react-native';
import { TextPropTypes } from '../../components/text';
import { ColorType, ValidationMessagePosition } from './types';
export interface LabelProps {
    /**
     * Field label
     */
    label?: string;
    /**
     * Field label color. Either a string or color by state map ({default, focus, error, disabled})
     */
    labelColor?: ColorType;
    /**
     * Custom style for the field label
     */
    labelStyle?: TextStyle;
    /**
     * Pass extra props to the label Text element
     */
    labelProps?: TextPropTypes;
    validationMessagePosition?: ValidationMessagePosition;
}
declare const Label: {
    ({ label, labelColor, labelStyle, labelProps, validationMessagePosition }: LabelProps): JSX.Element | null;
    displayName: string;
};
export default Label;
