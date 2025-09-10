import _ from 'lodash';
import React, {useCallback, useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  SortableList,
  SortableListItemProps,
  View,
  TouchableOpacity,
  Text,
  Icon,
  Assets,
  Colors,
  Button
} from 'react-native-ui-lib';
import {renderHeader} from '../ExampleScreenPresenter';

interface Item extends SortableListItemProps {
  text: string;
}

const data: Item[] = _.times(30, index => {
  let text = `${index}`;
  if (index === 3) {
    text = 'Locked item';
  }

  return {
    text,
    id: `${index}`,
    locked: index === 3
  };
});

const SortableListScreen = () => {
  const [items, setItems] = useState<Item[]>(data);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [removedItems, setRemovedItems] = useState<Item[]>([]);
  const orderedItems = useRef<Item[]>(data);

  const toggleItemSelection = useCallback((item: Item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => ![item.id].includes(selectedItem.id)));
    } else {
      setSelectedItems(selectedItems.concat(item));
    }
  },
  [selectedItems, setSelectedItems]);

  const addItem = useCallback(() => {
    if (removedItems.length > 0) {
      orderedItems.current = orderedItems.current.concat(removedItems[0]);
      setItems(orderedItems.current);
      setRemovedItems(removedItems.slice(1));
    }
  }, [removedItems, setItems, setRemovedItems]);

  const removeSelectedItems = useCallback(() => {
    setRemovedItems(removedItems.concat(selectedItems));
    setSelectedItems([]);
    orderedItems.current = orderedItems.current.filter(item => !selectedItems.includes(item));
    setItems(orderedItems.current);
  }, [setRemovedItems, removedItems, selectedItems, setItems, setSelectedItems]);

  const keyExtractor = useCallback((item: Item) => {
    return `${item.id}`;
  }, []);

  const onOrderChange = useCallback((newData: Item[]) => {
    console.log('New order:', newData);
    orderedItems.current = newData;
  }, []);

  const renderItem = useCallback(({item, index: _index}: {item: Item; index: number}) => {
    const isSelected = selectedItems.includes(item);
    const {locked} = item;
    const Container = locked ? View : TouchableOpacity;
    return (
      <Container
        // TODO: fix Android selection color
        style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
        onPress={() => toggleItemSelection(item)}
        // overriding the BG color to anything other than white will cause Android's elevation to fail
        // backgroundColor={Colors.red30}
        centerV
        centerH={locked}
        paddingH-page
      >
        <View flex row spread centerV>
          {!locked && <Icon source={Assets.icons.demo.drag} tintColor={Colors.$iconDisabled}/>}
          <Text center $textDefault={!locked} $textNeutralLight={locked}>
            {item.text}
          </Text>
          {!locked && <Icon source={Assets.icons.demo.chevronRight} tintColor={Colors.$iconDefault}/>}
        </View>
      </Container>
    );
  },
  [selectedItems, toggleItemSelection]);

  return (
    <View flex bg-$backgroundDefault>
      {renderHeader('Sortable List', {'margin-10': true})}
      <View row center marginB-s2>
        <Button label="Add Item" size={Button.sizes.xSmall} disabled={removedItems.length === 0} onPress={addItem}/>
        <Button
          label="Remove Items"
          size={Button.sizes.xSmall}
          disabled={selectedItems.length === 0}
          marginL-s3
          onPress={removeSelectedItems}
        />
      </View>
      <View flex useSafeArea>
        <SortableList
          flexMigration
          data={items}
          // itemProps={{backgroundColor: 'transparent'}}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onOrderChange={onOrderChange}
          scale={1.02}
        />
      </View>
    </View>
  );
};

export default SortableListScreen;
const styles = StyleSheet.create({
  itemContainer: {
    height: 52,
    borderBottomColor: Colors.$outlineDefault,
    borderBottomWidth: 1
  },
  selectedItemContainer: {
    borderLeftColor: Colors.$outlinePrimary,
    borderLeftWidth: 5
  }
});
