import underlinePreset from './presets/underline';
import {InternalTextFieldProps, Presets} from './types';

export default function usePreset({preset, ...props}: InternalTextFieldProps) {
  if (preset === Presets.DEFAULT || preset === Presets.UNDERLINE) {
    return {...underlinePreset, ...props, fieldStyle: [underlinePreset.fieldStyle, props.fieldStyle]};
  }
  return props;
}
