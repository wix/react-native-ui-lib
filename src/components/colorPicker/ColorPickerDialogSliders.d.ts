import React from 'react';
import { HSLColor } from './ColorPickerPresenter';
import { ColorPickerDialogProps } from './ColorPickerDialog';
type SlidersProps = Pick<ColorPickerDialogProps, 'migrate'> & {
    keyboardHeight: number;
    color: HSLColor;
    onSliderValueChange: (value: HSLColor) => void;
};
declare const ColorPickerDialogSliders: (props: SlidersProps) => React.JSX.Element;
export default ColorPickerDialogSliders;
