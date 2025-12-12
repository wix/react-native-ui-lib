import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Constants,
  SortableGridList,
  Card,
  Spacings,
  BorderRadiuses,
  GridListProps,
  SortableGridListProps,
  Button
} from 'react-native-ui-lib';
import _ from 'lodash';
import products from '../../data/products';
import {renderBooleanOption} from '../ExampleScreenPresenter';

const productsWithIds = products.map(product => ({...product}));
type Item = (typeof productsWithIds)[0];

class SortableGridListScreen extends Component {
  state = {
    orientation: Constants.orientation,
    selectedItemId: undefined,
    items: productsWithIds,
    removedItems: [] as Item[],
    shouldOrderByIndex: false
  };
  itemsOrdered = this.state.items;

  onOrderChange: SortableGridListProps['onOrderChange'] = (newOrderedData, newOrder) => {
    this.itemsOrdered = newOrderedData;
    console.log('newOrder:', newOrder);
  };

  selectItem = ({customValue: id}: {customValue: number}) => {
    const {selectedItemId} = this.state;
    if (id === selectedItemId) {
      this.setState({selectedItemId: undefined});
    } else {
      this.setState({selectedItemId: id});
    }
  };

  removeSelectedItem = () => {
    const {selectedItemId, removedItems} = this.state;
    if (!_.isUndefined(selectedItemId)) {
      const newItems = [...this.itemsOrdered];
      const removed = _.remove(newItems, item => item.id === selectedItemId);
      removedItems.push(removed[0]);
      this.setState({items: newItems, selectedItemId: undefined, removedItems});
      this.itemsOrdered = newItems;
    }
  };

  addItem = () => {
    const {removedItems} = this.state;
    const itemToAdd = removedItems.pop();
    if (itemToAdd) {
      this.itemsOrdered.push(itemToAdd);
      const newItems = [...this.itemsOrdered];

      this.setState({items: newItems, selectedItemId: undefined, removedItems});
    }
  };

  renderItem: GridListProps<Item>['renderItem'] = ({item}) => {
    const {selectedItemId} = this.state;
    return (
      <Card flex onPress={this.selectItem} customValue={item.id} selected={item.id === selectedItemId}>
        <Card.Section
          imageSource={{uri: item.mediaUrl}}
          imageStyle={styles.itemImage}
          imageProps={{
            customOverlayContent: (
              <Text margin-s1 h1 orange30>
                {item.id}
              </Text>
            )
          }}
        />
      </Card>
    );
  };

  render() {
    const {items, removedItems, selectedItemId, shouldOrderByIndex} = this.state;
    return (
      <View flex>
        <Text h1 margin-s5>
          SortableGridList
        </Text>
        <View row center marginB-s2>
          <Button
            label="Add Item"
            size={Button.sizes.xSmall}
            disabled={removedItems.length === 0}
            onPress={this.addItem}
          />
          <Button label="Remove Item" size={Button.sizes.xSmall} marginL-s3 onPress={this.removeSelectedItem}/>
        </View>
        <View paddingH-s5>
          {renderBooleanOption.call(this, 'Order by index', 'shouldOrderByIndex')}
        </View>
        <View flex>
          <SortableGridList
            flexMigration
            data={items}
            renderItem={this.renderItem}
            // numColumns={2}
            maxItemWidth={140}
            itemSpacing={Spacings.s3}
            // itemSpacing={0}
            listPadding={Spacings.s5}
            // keepItemSize
            contentContainerStyle={styles.list}
            orderByIndex={shouldOrderByIndex}
            onOrderChange={this.onOrderChange}
            extraData={selectedItemId}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: Spacings.s5
  },
  itemImage: {
    width: '100%',
    // height: 85,
    height: 108.7,
    borderRadius: BorderRadiuses.br10
  }
});

export default SortableGridListScreen;
