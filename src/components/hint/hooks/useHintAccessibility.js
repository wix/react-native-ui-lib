import _isString from "lodash/isString";
import { useCallback, useMemo } from 'react';
import { AccessibilityInfo, findNodeHandle } from 'react-native';
export default function useHintAccessibility(message) {
  const focusAccessibilityOnHint = useCallback((targetRef, hintRef) => {
    const targetRefTag = findNodeHandle(targetRef);
    const hintRefTag = findNodeHandle(hintRef);
    if (targetRefTag && _isString(message)) {
      AccessibilityInfo.setAccessibilityFocus(targetRefTag);
    } else if (hintRefTag) {
      AccessibilityInfo.setAccessibilityFocus(hintRefTag);
    }
  }, [message]);
  const accessibilityInfo = useMemo(() => {
    if (_isString(message)) {
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