import {useCallback, useMemo} from 'react';
import _ from 'lodash';
import {PickerProps, PickerValue} from '../types';
import {Constants} from 'react-native-ui-lib';

interface UsePickerLabelProps
  extends Pick<
    PickerProps,
    'value' | 'getLabel' | 'getItemLabel' | 'placeholder' | 'accessibilityLabel' | 'accessibilityHint'
  > {
  items: {value: string | number; label: string}[] | null | undefined;
}

const usePickerLabel = (props: UsePickerLabelProps) => {
  const {value, items, getLabel, getItemLabel, placeholder, accessibilityLabel, accessibilityHint} = props;

  const getLabelsFromArray = useCallback((value: PickerValue) => {
    const itemsByValue = _.keyBy(items, 'value');
    const selectedItems = _.flow(arr =>
      _.map(arr, item => (_.isPlainObject(item) ? getItemLabel?.(item) || item?.label : itemsByValue[item]?.label)),
    arr => _.join(arr, ', '))(value);
    if (Constants.isWeb) {
      return selectedItems ? selectedItems : undefined;
    }
    return selectedItems;
  },
  [getItemLabel]);

  const _getLabel = useCallback((value: PickerValue) => {
    if (_.isFunction(getLabel) && !_.isUndefined(getLabel(value))) {
      return getLabel(value);
    }

    if (_.isArray(value)) {
      return getLabelsFromArray(value);
    }

    // TODO: Remove
    // if (typeof value === 'object') {
    //   return value?.label;
    // }

    // otherwise, extract from picker items
    const selectedItem = _.find(items, {value});

    if (Constants.isWeb) {
      return _.get(selectedItem?.value || selectedItem, 'label');
    }
    return _.get(selectedItem, 'label');
  },
  [getLabelsFromArray]);

  const accessibilityInfo = useMemo(() => {
    const label = _getLabel(value);
    return {
      accessibilityLabel:
        accessibilityLabel ?? (label ? `${placeholder}. selected. ${label}` : `Select ${placeholder}`),
      accessibilityHint:
        accessibilityHint ?? (label ? 'Double tap to edit' : `Goes to ${placeholder}. Suggestions will be provided`)
    };
  }, [value, accessibilityLabel, accessibilityHint]);

  return {
    getLabelsFromArray,
    getLabel: _getLabel,
    accessibilityInfo,
    label: _getLabel(value)
  };
};

export default usePickerLabel;
