import _ from 'lodash';
import React, {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Constants from '../../commons/Constants';
import {BorderRadiuses, Colors, Spacings} from '../../style';
import GridView from '../../components/gridView';
import FadedScrollView from '../../components/fadedScrollView';
import Image from '../../components/image';
import View from '../../components/view';
import {ActionSheetProps} from './types';

const GRID_COLUMN_NUMBER = 3;
const GRID_ITEM_CIRCLE_SIZE = Constants.isTablet ? 64 : 52;

const defaultProps = {
  gridNumColumns: GRID_COLUMN_NUMBER
};

const GridOptions = React.memo((props: ActionSheetProps) => {
  const {gridOptions, gridNumColumns, onItemPress} = props;

  const gridItems = useMemo(() => {
    return _.map(gridOptions, (option, index) => {
      const {title, imageSource, imageStyle, testID, ...gridOptions} = option;
      const customValue = {selectedIndex: index, selectedOption: option};
      return {
        renderCustomItem: () => (
          <View center marginB-s1>
            <View center style={styles.gridItemCircle}>
              <Image
                source={imageSource}
                style={imageStyle}
                /* tintColor={gridIconColor} */ testID={`${testID}.icon`}
              />
            </View>
          </View>
        ),
        testID,
        title,
        titleLines: 2,
        titleColor: Colors.grey10,
        titleTypography: 'subtextBold',
        containerStyle: styles.gridItemContainerStyle,
        ...gridOptions,
        customValue,
        onPress: onItemPress
      };
    });
  }, [gridOptions, onItemPress]);

  const gridView = useMemo(() => {
    return <GridView items={gridItems} numColumns={gridNumColumns}/>;
  }, [gridItems, gridNumColumns]);

  if (gridOptions) {
    return <FadedScrollView {...props} children={gridView} style={styles.gridContainer}/>;
  }

  return null;
});

const styles = StyleSheet.create({
  gridContainer: {
    alignSelf: 'center'
  },
  gridItemCircle: {
    width: GRID_ITEM_CIRCLE_SIZE,
    height: GRID_ITEM_CIRCLE_SIZE,
    borderWidth: 1,
    borderRadius: BorderRadiuses.br100,
    borderColor: Colors.$outlineDisabled
  },
  gridItemContainerStyle: {
    marginBottom: Spacings.s7
  }
});

// @ts-ignore
GridOptions.defaultProps = defaultProps;
export default GridOptions;
