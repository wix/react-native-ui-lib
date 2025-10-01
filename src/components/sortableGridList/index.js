import _mapKeys from "lodash/mapKeys";
import _map from "lodash/map";
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { useDidUpdate } from "../../hooks";
import { LogService } from "../../services";
import SortableItem from "./SortableItem";
import usePresenter from "./usePresenter";
import { SortableGridListProps } from "./types";
import useGridLayout from "../gridList/useGridLayout";
function generateItemsOrder(data) {
  return _map(data, item => item.id);
}
function SortableGridList(props) {
  const {
    renderItem,
    onOrderChange,
    flexMigration,
    orderByIndex = false,
    ...others
  } = props;
  const {
    itemContainerStyle,
    numberOfColumns,
    itemWidth,
    itemSpacing,
    listStyle,
    listContentStyle,
    listColumnWrapperStyle
  } = useGridLayout(props);
  const {
    data
  } = others;
  const itemsOrder = useSharedValue(generateItemsOrder(data));

  // TODO: Remove once flexMigration migration is completed
  useEffect(() => {
    if (flexMigration === undefined) {
      LogService.error(`SortableGridList "flexMigration" prop is a temporary migration flag to transition to a flex behavior for SortableList. 
      Please make sure to pass it and check your UI before it becomes true by default`);
    }
  }, []);
  useDidUpdate(() => {
    itemsOrder.value = generateItemsOrder(data);
  }, [data]);
  const presenter = usePresenter(numberOfColumns, itemWidth, itemSpacing);
  const onChange = useCallback(() => {
    const newData = [];
    const dataByIds = _mapKeys(data, 'id');
    if (data?.length) {
      itemsOrder.value.forEach(itemId => {
        newData.push(dataByIds[itemId]);
      });
    }
    onOrderChange?.(newData, itemsOrder.value);
  }, [onOrderChange, data]);
  const _renderItem = useCallback(({
    item,
    index
  }) => {
    return <SortableItem key={item.id} data={data} {...presenter} style={itemContainerStyle} itemsOrder={itemsOrder} id={item.id} onChange={onChange} orderByIndex={orderByIndex}>
        {/* @ts-expect-error */}
        {renderItem({
        item,
        index
      })}
      </SortableItem>;
  }, [data, itemContainerStyle, onChange, renderItem, orderByIndex]);
  return <GestureHandlerRootView style={flexMigration ? styles.container : undefined}>
      <ScrollView style={listStyle} contentContainerStyle={[styles.listContent, listContentStyle, listColumnWrapperStyle]}>
        {_map(data, (item, index) => _renderItem({
        item,
        index
      }))}
      </ScrollView>
    </GestureHandlerRootView>;
}
export { SortableGridListProps };
export default SortableGridList;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  listContent: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});