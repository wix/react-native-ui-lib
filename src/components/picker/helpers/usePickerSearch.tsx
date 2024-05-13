import {useCallback, useState, useMemo} from 'react';
import _ from 'lodash';
import {PickerProps} from '../types';
import {getItemLabel as getItemLabelPresenter, shouldFilterOut} from '../PickerPresenter';

type UsePickerSearchProps = Pick<PickerProps, 'showSearch' | 'onSearchChange' | 'children' | 'getItemLabel' | 'items'>;

const usePickerSearch = (props: UsePickerSearchProps) => {
  const {showSearch, onSearchChange, children, getItemLabel, items} = props;
  const [searchValue, setSearchValue] = useState('');

  const filteredChildren = useMemo(() => {
    if (showSearch && !_.isEmpty(searchValue)) {
      // @ts-expect-error need to fix children type
      return _.filter(children, child => {
        // @ts-expect-error need to fix children type to be based on PickerItemProps
        const {label, value, getItemLabel: childGetItemLabel} = child.props;
        const itemLabel = getItemLabelPresenter(label, value, childGetItemLabel || getItemLabel);
        return !shouldFilterOut(searchValue, itemLabel);
      });
    }

    return children;
  }, [showSearch, searchValue, children]);

  const filteredItems = useMemo(() => {
    if (showSearch && !_.isEmpty(searchValue)) {
      return _.filter(items, item => {
        const {label, value} = item;
        const itemLabel = getItemLabelPresenter(label, value);
        return !shouldFilterOut(searchValue, itemLabel);
      });
    }

    return items;
  }, [showSearch, searchValue, items]);

  const _onSearchChange = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
    onSearchChange?.(searchValue, filteredChildren, filteredItems);
  },
  [onSearchChange, filteredChildren, filteredItems]);

  return {setSearchValue, onSearchChange: _onSearchChange, filteredChildren, filteredItems};
};

export default usePickerSearch;
