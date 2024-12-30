import _ from 'lodash';
import React, {useMemo} from 'react';
import {Colors} from '../../style';
import GridView from '../../components/gridView';
import {ActionSheetGridProps} from './types';

const GRID_COLUMN_NUMBER = 3;

const defaultProps = {
  gridNumColumns: GRID_COLUMN_NUMBER
};

const GridOptions = React.memo((props: ActionSheetGridProps) => {
  const {gridOptions, gridNumColumns, onItemPress} = props;

  const gridItems = useMemo(() => {
    return _.map(gridOptions, (option, index) => {
      const {testID, ...gridOptions} = option;
      const customValue = {selectedIndex: index, selectedOption: option};
      return {
        testID,
        titleLines: 2,
        titleColor: Colors.grey10,
        titleTypography: 'subtextBold',
        ...gridOptions,
        customValue,
        onPress: onItemPress
      };
    });
  }, [gridOptions, onItemPress]);

  const gridView = useMemo(() => {
    return <GridView items={gridItems} numColumns={gridNumColumns}/>;
  }, [gridItems, gridNumColumns]);

  return gridView;
});

// @ts-ignore
GridOptions.defaultProps = defaultProps;
export default GridOptions;
