
import {PureBaseComponent} from '../commons';
import {ColorValue} from '../style/colors';
import {DialogProps} from './Dialog';

export interface ColorPickerProps extends DialogProps {
  colors?: ColorValue[];
  value?: ColorValue | boolean;
  animatedIndex?: number;
  initialColor?: ColorValue;
  onSubmit?: (selectedColor: ColorValue, textColor: ColorValue) => void;
  onValueChange?: Function;
}

export class ColorPicker extends PureBaseComponent<ColorPickerProps> {}
