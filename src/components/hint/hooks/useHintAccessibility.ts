import {ElementRef, useCallback, useMemo} from 'react';
import {AccessibilityInfo, findNodeHandle, View as RNView} from 'react-native';
import _ from 'lodash';
import {HintProps} from '../types';

export default function useHintAccessibility(message?: HintProps['message']) {
  const focusAccessibilityOnHint = useCallback((targetRef: ElementRef<typeof RNView>, hintRef: ElementRef<typeof RNView>) => {
    const targetRefTag = findNodeHandle(targetRef);
    const hintRefTag = findNodeHandle(hintRef);

    if (targetRefTag && _.isString(message)) {
      AccessibilityInfo.setAccessibilityFocus(targetRefTag);
    } else if (hintRefTag) {
      AccessibilityInfo.setAccessibilityFocus(hintRefTag);
    }
  },
  [message]);

  const accessibilityInfo = useMemo(() => {
    if (_.isString(message)) {
      return {
        accessible: true,
        accessibilityLabel: `hint: ${message}`
      };
    }
  }, [message]);

  return {
    focusAccessibilityOnHint,
    accessibilityInfo
  };
}
