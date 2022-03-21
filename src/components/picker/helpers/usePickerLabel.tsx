import {useCallback, useMemo} from 'react';
import _ from 'lodash';
import {PickerProps, PickerValue} from '../types';

interface UsePickerLabelProps extends Pick<PickerProps, 'value' | 'getLabel' | 'getItemLabel' | 'placeholder'> {
  items: {value: string | number; label: string}[] | null | undefined;
}

const usePickerLabel = (props: UsePickerLabelProps) => {
  const {value, items, getLabel, getItemLabel, placeholder} = props;

  const getLabelsFromArray = useCallback((value: PickerValue) => {
    const itemsByValue = _.keyBy(items, 'value');

    return _.flow(arr =>
      _.map(arr, item => (_.isPlainObject(item) ? getItemLabel?.(item) || item?.label : itemsByValue[item]?.label)),
    arr => _.join(arr, ', '))(value);
  },
  [getItemLabel]);

  const _getLabel = useCallback((value: PickerValue) => {
    if (_.isFunction(getLabel) && !_.isUndefined(getLabel(value))) {
      return getLabel(value);
    }

    if (_.isArray(value)) {
      return getLabelsFromArray(value);
    }

    if (typeof value === 'object') {
      return value?.label;
    }

    // otherwise, extract from picker items
    const selectedItem = _.find(items, {value});

    return _.get(selectedItem, 'label');
  },
  [getLabelsFromArray]);

  const accessibilityInfo = useMemo(() => {
    const label = _getLabel(value);
    return {
      accessibilityLabel: label ? `${placeholder}. selected. ${label}` : `Select ${placeholder}`,
      accessibilityHint: label ? 'Double tap to edit' : `Goes to ${placeholder}. Suggestions will be provided`
    };
  }, [value]);

  return {
    getLabelsFromArray,
    getLabel: _getLabel,
    accessibilityInfo,
    label: _getLabel(value)
  };
};

export default usePickerLabel;
