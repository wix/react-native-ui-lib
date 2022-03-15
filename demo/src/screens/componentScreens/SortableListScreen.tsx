import _ from 'lodash';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SortableList, View, BorderRadiuses, Button, Colors} from 'react-native-ui-lib'; //eslint-disable-line
import {renderHeader, renderBooleanOption} from '../ExampleScreenPresenter';

interface Item {
  originalIndex: number;
}

const data = _.times(30, index => {
  return {
    originalIndex: index
  };
});

const SortableListScreen = () => {
  const scrollWhileDraggingState = useState<boolean>(false);
  const scrollWhileDragging = scrollWhileDraggingState[0];

  const keyExtractor = useCallback((item: Item) => {
    return `${item.originalIndex}`;
  }, []);

  const onOrderChange = useCallback((newData: Item[]) => {
    console.log('New order:', newData);
  }, []);

  const atRestAnimatedBackgroundStyle = useMemo(() => {
    return {backgroundColor: Colors.green10, borderRadius: BorderRadiuses.br30};
  }, []);

  const draggedAnimatedBackgroundStyle = useMemo(() => {
    return {backgroundColor: Colors.red10, borderRadius: BorderRadiuses.br30};
  }, []);

  const atRestAnimatedScaleStyle = useMemo(() => {
    return {transform: [{scaleY: 1}]};
  }, []);

  const draggedAnimatedScaleStyle = useMemo(() => {
    return {transform: [{scaleY: 1.2}]};
  }, []);

  // @ts-ignore
  const renderItem = useCallback(({item, _index}) => {
    return (
      <SortableList.SortableListItemDecorator
        atRestAnimatedStyle={atRestAnimatedScaleStyle}
        draggedAnimatedStyle={draggedAnimatedScaleStyle}
      >
        <SortableList.SortableListItemDecorator
          atRestAnimatedStyle={atRestAnimatedBackgroundStyle}
          draggedAnimatedStyle={draggedAnimatedBackgroundStyle}
        >
          <Button
            style={styles.itemContainer}
            label={`${item.originalIndex}`}
            borderRadius={BorderRadiuses.br30}
            onPress={() => console.log('Original index is', item.originalIndex)}
            backgroundColor={Colors.transparent}
          />
        </SortableList.SortableListItemDecorator>
      </SortableList.SortableListItemDecorator>
    );
  },
  [atRestAnimatedBackgroundStyle, draggedAnimatedBackgroundStyle, atRestAnimatedScaleStyle, draggedAnimatedScaleStyle]);

  const scrollText = useMemo(() => {
    return scrollWhileDragging ? 'Scroll while dragging (experimental)' : 'Scroll is locked when dragging';
  }, [scrollWhileDragging]);

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      {renderHeader('Sortable List', {'margin-10': true})}
      {/* @ts-expect-error TODO: margin should be allowed here */}
      {renderBooleanOption(scrollText, scrollWhileDraggingState, {'margin-10': true})}
      <View flex useSafeArea margin-page>
        <SortableList
          key={`${scrollWhileDragging}`}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onOrderChange={onOrderChange}
          scrollWhileDragging={scrollWhileDragging}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default SortableListScreen;
const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1
  },
  itemContainer: {
    borderColor: Colors.black,
    borderWidth: 1
  }
});
