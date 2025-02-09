import _ from 'lodash';
import React, {useMemo} from 'react';
import GridView from '../../components/gridView';
import {ActionSheetGridList, ActionSheetGridItemProps} from './types';

const GRID_COLUMN_NUMBER = 3;

const defaultProps = {
  gridNumColumns: GRID_COLUMN_NUMBER
};

const GridOptions = React.memo((props: ActionSheetGridList) => {
  const {options, onItemPress} = props;

  const gridItems = useMemo(() => {
    return _.map(options as ActionSheetGridItemProps[], (option, index) => {
      const customValue = {selectedIndex: index, selectedOption: option};
      return {
        ...option,
        onPress: () => {
          option.onPress?.(option, index);
          onItemPress?.(customValue);
        }
      };
    });
  }, [options, onItemPress]);

  const gridView = useMemo(() => {
    return <GridView items={gridItems} {...props}/>;
  }, [gridItems]);

  return gridView;
});

// @ts-ignore
GridOptions.defaultProps = defaultProps;
export default GridOptions;
