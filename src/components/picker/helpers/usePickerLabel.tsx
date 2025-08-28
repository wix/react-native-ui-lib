import _ from 'lodash';
import {useCallback, useMemo} from 'react';
import {PickerProps, PickerValue} from '../types';

interface UsePickerLabelProps
  extends Pick<
    PickerProps,
    'value' | 'getLabel' | 'placeholder' | 'accessibilityLabel' | 'accessibilityHint'
  > {
  items: {value: string | number; label: string}[] | null | undefined;
}

const usePickerLabel = (props: UsePickerLabelProps) => {
  const {value, items, getLabel, placeholder, accessibilityLabel, accessibilityHint} = props;

  const getLabelsFromArray = useCallback((value: PickerValue) => {
    const itemsByValue = _.keyBy(items, 'value');
    return _.flow(arr =>
      _.map(arr, item => (_.isPlainObject(item) ? item?.label : itemsByValue[item]?.label)),
    arr => _.join(arr, ', '))(value);
  }, [items]);

  const _getLabel = useCallback((value: PickerValue) => {
    if (_.isFunction(getLabel) && !_.isUndefined(getLabel(value))) {
      return getLabel(value);
    }

    if (_.isArray(value)) {
      return getLabelsFromArray(value);
    }

    const selectedItem = _.find(items, {value});
    return _.get(selectedItem, 'label');
  }, [getLabel, getLabelsFromArray, items]);

  const accessibilityInfo = useMemo(() => {
    const label = _getLabel(value);
    return {
      accessibilityLabel:
        accessibilityLabel ?? (label ? `${placeholder}. selected. ${label}` : `Select ${placeholder}`),
      accessibilityHint:
        accessibilityHint ?? (label ? 'Double tap to edit' : `Goes to ${placeholder}. Suggestions will be provided`)
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
