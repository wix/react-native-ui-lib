import _ from 'lodash';
import React from 'react';
import {PickerProps, PickerSingleValue, PickerValue, PickerItemProps} from './types';

export function extractPickerItems(props: PickerProps) {
  const {children} = props;
  const items = React.Children.map(children, child => ({
    // @ts-expect-error handle use PickerItemProps once exist
    value: child?.props.value,
    // @ts-expect-error handle use PickerItemProps once exist
    label: child?.props.label
  }));
  return items ?? [];
}

export function isItemSelected(childValue: PickerSingleValue, selectedValue?: PickerValue) {
  let isSelected = false;

  if (Array.isArray(selectedValue)) {
    isSelected =
      _.find(selectedValue, v => {
        return v === childValue;
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

export function getItemLabel(label: string, value: PickerValue, getItemLabel?: PickerItemProps['getItemLabel']) {
  if (getItemLabel) {
    const customLabel = getItemLabel(value);
    return customLabel !== undefined ? customLabel : label;
  }
  return label;
}

export function shouldFilterOut(searchValue: string, itemLabel?: string) {
  return !_.includes(_.lowerCase(itemLabel), _.lowerCase(searchValue));
}
