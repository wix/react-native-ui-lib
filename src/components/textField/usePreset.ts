import defaultPreset from './presets/default';
import {InternalTextFieldProps} from './types';

export default function usePreset({preset /*  = 'default' */, ...props}: InternalTextFieldProps) {
  if (preset === 'default') {
    return {...defaultPreset, ...props, fieldStyle: [defaultPreset.fieldStyle, props.fieldStyle]};
  }
  return props;
}
