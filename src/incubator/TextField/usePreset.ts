import {InternalTextFieldProps} from './index';
import defaultPreset from './presets/default';

export default function usePreset({preset/*  = 'default' */, ...props}: InternalTextFieldProps) {
  if (preset === 'default') {
    return {...defaultPreset, ...props};
  }
  return props;
}
