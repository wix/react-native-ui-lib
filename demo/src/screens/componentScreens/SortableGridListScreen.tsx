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

const productsWithIds = products.map((product, index) => ({...product, id: index.toString()}));
type Item = typeof productsWithIds[0];

class SortableGridListScreen extends Component {
  state = {
    orientation: Constants.orientation,
    selectedItemId: undefined,
    items: productsWithIds
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
    const {selectedItemId} = this.state;
    if (!_.isUndefined(selectedItemId)) {
      const newItems = [...this.itemsOrdered];
      _.remove(newItems, item => item.id === selectedItemId);
      this.setState({items: newItems, selectedItemId: undefined});
      this.itemsOrdered = newItems;
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
    const {items} = this.state;
    return (
      <View flex>
        <Text h1 margin-s5>
          SortableGridList
        </Text>
        <View row center marginB-s2>
          <Button label="Add Item" size={Button.sizes.xSmall}/>
          <Button label="Remove Item" size={Button.sizes.xSmall} marginL-s3 onPress={this.removeSelectedItem}/>
        </View>
        <SortableGridList
          data={items}
          renderItem={this.renderItem}
          // numColumns={2}
          maxItemWidth={140}
          itemSpacing={Spacings.s3}
          // itemSpacing={0}
          listPadding={Spacings.s5}
          // keepItemSize
          contentContainerStyle={styles.list}
          onOrderChange={this.onOrderChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: Spacings.s5
  },
  itemImage: {
    width: '100%',
    // height: 85,
    height: 108.7,
    borderRadius: BorderRadiuses.br10
  }
});

export default SortableGridListScreen;
