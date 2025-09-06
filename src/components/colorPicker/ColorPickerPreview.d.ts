import React from 'react';
import { ColorPickerDialogProps } from './ColorPickerDialog';
import { HSLColor, getColorValue } from './ColorPickerPresenter';
type PreviewProps = Pick<ColorPickerDialogProps, 'accessibilityLabels' | 'previewInputStyle' | 'testID'> & {
    color: HSLColor;
    text: ReturnType<typeof getColorValue>;
    valid: boolean;
    onChangeText: (value: string) => void;
    onFocus: () => void;
};
declare const ColorPickerPreview: (props: PreviewProps) => React.JSX.Element;
export default ColorPickerPreview;
