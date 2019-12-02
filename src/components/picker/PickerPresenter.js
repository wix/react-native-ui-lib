import _ from 'lodash';

export function isItemSelected(childValue, selectedValue) {
  let isSelected = false;

  if (Array.isArray(selectedValue)) {
    isSelected = _.includes(selectedValue, childValue);
  } else {
    isSelected = childValue === selectedValue;
  }
  return isSelected;
}

export function getItemValue(props) {
  if (_.isArray(props.value)) {
    return props.getItemValue ?
      _.map(props.value, item => props.getItemValue(item)) :
      _.map(props.value, 'value');
  } else if (!_.isObject(props.value)) {
    return props.value;
  }
  return _.invoke(props, 'getItemValue', props.value) || _.get(props.value, 'value');
}

export function getItemLabel(props) {
  return _.invoke(props, 'getLabel', props.value) || _.get(props.value, 'label') || _.get(props, 'label');
}
