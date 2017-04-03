import _ from 'lodash';

export function isItemSelected(childValue, selectedValue) {
  let isSelected = false;
  if (Array.isArray(selectedValue)) {
    isSelected = _.chain(selectedValue).map('value').includes(childValue).value();
  } else {
    isSelected = childValue === _.get(selectedValue, 'value');
  }
  return isSelected;
}
