import React, {useCallback, useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {SortableList, View, Text, Colors, Button, Card, BorderRadiuses} from 'react-native-ui-lib';
import {renderHeader} from '../ExampleScreenPresenter';
import products from '../../data/products';

const data = products.map((product, index) => ({...product, locked: index === 3}));
type Item = (typeof data)[0];

const HorizontalSortableListScreen = () => {
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
    const selected = selectedItems.includes(item);
    const {locked} = item;
    const Container = locked ? View : Card;
    return (
      <Container
        style={styles.itemContainer}
        onPress={() => toggleItemSelection(item)}
        customValue={item.id}
        selected={selected}
        margin-s1
      >
        <Card.Section
          imageSource={{uri: item.mediaUrl}}
          imageStyle={styles.itemImage}
          imageProps={{
            customOverlayContent: (
              <Text margin-s1={!locked} h1={!locked} h4={locked} center={locked} orange30>
                {locked ? 'Locked' : item.id}
              </Text>
            )
          }}
        />
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
          horizontal
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onOrderChange={onOrderChange}
          scale={1.02}
        />
      </View>
    </View>
  );
};

export default HorizontalSortableListScreen;
const styles = StyleSheet.create({
  itemContainer: {
    overflow: 'hidden',
    borderColor: Colors.$outlineDefault,
    borderBottomWidth: 1
  },
  selectedItemContainer: {
    borderLeftColor: Colors.$outlinePrimary,
    borderLeftWidth: 5
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadiuses.br10
  }
});
