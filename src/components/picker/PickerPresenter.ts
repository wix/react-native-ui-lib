import _ from 'lodash';

export function isItemSelected(childValue, selectedValue) {
  let isSelected = false;

  if (Array.isArray(selectedValue)) {
    isSelected = !!_.find(selectedValue, v => {
      return v === childValue || v?.value === childValue;
    });
  } else {
    isSelected = childValue === selectedValue;
  }
  return isSelected;
}

export function getItemValue(props) {
  if (_.isArray(props.value)) {
    return props.getItemValue ? _.map(props.value, item => props.getItemValue(item)) : _.map(props.value, 'value');
  } else if (!_.isObject(props.value)) {
    return props.value;
  }
  return _.invoke(props, 'getItemValue', props.value) || _.get(props.value, 'value');
}

export function getItemLabel(label, value, getItemLabel) {
  if (_.isObject(value)) {
    if (getItemLabel) {
      return getItemLabel(value);
    }
    return _.get(value, 'label');
  }
  return label;
}

export function shouldFilterOut(searchValue, itemLabel) {
  return !_.includes(_.lowerCase(itemLabel), _.lowerCase(searchValue));
}
