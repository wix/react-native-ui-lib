import _get from "lodash/get";
import _find from "lodash/find";
import _isArray from "lodash/isArray";
import _isUndefined from "lodash/isUndefined";
import _isFunction from "lodash/isFunction";
import _join from "lodash/join";
import _isPlainObject from "lodash/isPlainObject";
import _map from "lodash/map";
import _flow from "lodash/flow";
import _keyBy from "lodash/keyBy";
import { useCallback, useMemo } from 'react';
const usePickerLabel = props => {
  const {
    value,
    items,
    getLabel,
    getItemLabel,
    placeholder,
    accessibilityLabel,
    accessibilityHint
  } = props;
  const getLabelsFromArray = useCallback(value => {
    const itemsByValue = _keyBy(items, 'value');
    return _flow(arr => _map(arr, item => _isPlainObject(item) ? getItemLabel?.(item) || item?.label : itemsByValue[item]?.label), arr => _join(arr, ', '))(value);
  }, [getItemLabel, items]);
  const _getLabel = useCallback(value => {
    if (_isFunction(getLabel) && !_isUndefined(getLabel(value))) {
      return getLabel(value);
    }
    if (_isArray(value)) {
      return getLabelsFromArray(value);
    }
    const selectedItem = _find(items, {
      value
    });
    return _get(selectedItem, 'label');
  }, [getLabel, getLabelsFromArray, items]);
  const accessibilityInfo = useMemo(() => {
    const label = _getLabel(value);
    return {
      accessibilityLabel: accessibilityLabel ?? (label ? `${placeholder}. selected. ${label}` : `Select ${placeholder}`),
      accessibilityHint: accessibilityHint ?? (label ? 'Double tap to edit' : `Goes to ${placeholder}. Suggestions will be provided`)
    };
  }, [value, placeholder, accessibilityLabel, accessibilityHint, _getLabel]);
  return {
    getLabelsFromArray,
    getLabel: _getLabel,
    accessibilityInfo,
    label: _getLabel(value) ?? ''
  };
};
export default usePickerLabel;