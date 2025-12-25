import underlinePreset from './presets/underline';
import outlinePreset from './presets/outline';
import {InternalTextFieldProps, Presets} from './types';

export default function usePreset({preset, ...props}: InternalTextFieldProps) {
  let presetConfig;
  if (preset === Presets.DEFAULT || preset === Presets.UNDERLINE) {
    presetConfig = underlinePreset;
  } else if (preset === Presets.OUTLINE) {
    presetConfig = outlinePreset;
  }

  if (presetConfig) {
    return {...presetConfig, ...props, fieldStyle: [presetConfig.fieldStyle, props.fieldStyle]};
  }
  return props;
}
