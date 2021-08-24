/// <reference types="react" />
import { TextStyle } from 'react-native';
import { TextProps } from '../../components/text';
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
    labelProps?: TextProps;
    validationMessagePosition?: ValidationMessagePosition;
    floatingPlaceholder?: boolean;
}
declare const Label: {
    ({ label, labelColor, labelStyle, labelProps, validationMessagePosition, floatingPlaceholder }: LabelProps): JSX.Element | null;
    displayName: string;
};
export default Label;
