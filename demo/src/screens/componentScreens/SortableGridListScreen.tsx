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
  SortableGridListProps
} from 'react-native-ui-lib';

import products from '../../data/products';

class SortableGridListScreen extends Component {
  state = {
    orientation: Constants.orientation,
    items: []
  };

  constructor(props) {
    super(props);
    this.state = {
      items: products.slice(0, 5)
    };
  }

  onOrderChange: SortableGridListProps['onOrderChange'] = (_newOrderedData, newOrder) => {
    console.log('newOrder:', newOrder);
  };

  addItem = () => {
    this.setState({
      items: [...this.state.items, products[0]]
    });
  }

  removeItem = () => {
    this.setState({
      items: [...this.state.items.slice(0, this.state.items.length - 1)]
    });
  }

  renderItem: GridListProps<typeof products[0]>['renderItem'] = ({item, index}) => {
    const onPressHandler = index % 2 === 0 ? this.removeItem : this.addItem;
    return (
      <Card flex onPress={onPressHandler}>
        <Card.Section imageSource={{uri: item.mediaUrl}} imageStyle={styles.itemImage}/>
      </Card>
    );
  };

  render() {
    return (
      <View flex>
        <Text h1 margin-s5>
          SortableGridList
        </Text>
        <SortableGridList
          data={this.state.items}
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
