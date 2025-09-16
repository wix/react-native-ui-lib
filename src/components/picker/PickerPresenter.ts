import _ from 'lodash';
import React from 'react';
import {PickerProps, PickerSingleValue, PickerValue} from './types';

export function extractPickerItems(props: PickerProps) {
  const {children} = props;
  const items = React.Children.map(children, child => ({
    // @ts-expect-error handle use PickerItemProps once exist
    value: child?.props.value,
    // @ts-expect-error handle use PickerItemProps once exist
    label: child?.props.label,
    // @ts-expect-error handle use PickerItemProps once exist
    testID: child?.props.testID
  }));
  return items ?? [];
}

export function isItemSelected(childValue: PickerSingleValue, selectedValue?: PickerValue) {
  let isSelected = false;

  if (Array.isArray(selectedValue)) {
    isSelected =
      _.find(selectedValue, v => {
        // @ts-expect-error TODO: fix after removing migrate prop completely
        return v === childValue || (typeof v === 'object' && v?.value === childValue);
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

export function getItemLabel(label: string, value: PickerValue, getItemLabel?: PickerProps['getItemLabel']) {
  if (_.isObject(value)) {
    if (getItemLabel) {
      return getItemLabel(value);
    }
    return _.get(value, 'label');
  }
  return label;
}

export function shouldFilterOut(searchValue: string, itemLabel?: string) {
  return !_.includes(_.lowerCase(itemLabel), _.lowerCase(searchValue));
}
