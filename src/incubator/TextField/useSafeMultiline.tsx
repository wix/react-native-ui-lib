import {useCallback, useRef} from 'react';
import {InternalTextFieldProps} from './types';
import {Constants} from '../../commons/new';

type SafeMultilineProps = Pick<InternalTextFieldProps, 'multiline' | 'maxLength' | 'value' | 'onChangeText'>;

export default function useSafeMultiline({multiline, maxLength, value, onChangeText}: SafeMultilineProps) {
  const isSafeMultiline = multiline && maxLength && Constants.isIOS;
  const lockedText = useRef(value);
  const emitChangeText = useCallback((text: string) => {
    const old = lockedText.current;
    const keep = old && text !== old && text.endsWith(old) && old.startsWith(text.slice(0, text.length - old.length));
    onChangeText?.(keep ? old : text);
    lockedText.current = keep ? old : '';
  },
  [onChangeText]);

  return isSafeMultiline ? emitChangeText : onChangeText;
}
