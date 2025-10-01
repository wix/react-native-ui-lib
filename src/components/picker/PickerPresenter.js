import _lowerCase from "lodash/lowerCase";
import _includes from "lodash/includes";
import _get from "lodash/get";
import _isObject from "lodash/isObject";
import _find from "lodash/find";
import React from 'react';
export function extractPickerItems(props) {
  const {
    children
  } = props;
  const items = React.Children.map(children, child => ({
    // @ts-expect-error handle use PickerItemProps once exist
    value: child?.props.value,
    // @ts-expect-error handle use PickerItemProps once exist
    label: child?.props.label
  }));
  return items ?? [];
}
export function isItemSelected(childValue, selectedValue) {
  let isSelected = false;
  if (Array.isArray(selectedValue)) {
    isSelected = _find(selectedValue, v => {
      // @ts-expect-error TODO: fix after removing migrate prop completely
      return v === childValue || typeof v === 'object' && v?.value === childValue;
    }) !== undefined;
  } else {
    isSelected = childValue === selectedValue;
  }
  return isSelected;
}

// export function getItemValue(props) {
//   if (_.isArray(props.value)) {
//     return props.getItemValue ? _.map(props.value, item => props.getItemValue(item)) : _.map(props.value, 'value');
//   } else if (!_.isObject(props.value)) {
//     return props.value;
//   }
//   return _.invoke(props, 'getItemValue', props.value) || _.get(props.value, 'value');
// }

export function getItemLabel(label, value, getItemLabel) {
  if (_isObject(value)) {
    if (getItemLabel) {
      return getItemLabel(value);
    }
    return _get(value, 'label');
  }
  return label;
}
export function shouldFilterOut(searchValue, itemLabel) {
  return !_includes(_lowerCase(itemLabel), _lowerCase(searchValue));
}