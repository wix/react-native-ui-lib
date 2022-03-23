import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
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

class GridListScreen extends Component {
  state = {
    orientation: Constants.orientation
  };

  onOrderChange: SortableGridListProps['onOrderChange'] = (_newOrderedData, newOrder) => {
    console.log('newOrder:', newOrder);
  };

  renderItem: GridListProps<typeof products[0]>['renderItem'] = ({item}) => {
    return (
      <Card flex onPress={() => console.log('ethan - item press')}>
        <Card.Section imageSource={{uri: item.mediaUrl}} imageStyle={styles.itemImage}/>
        {/* <View padding-s2>
          <Text>{item.name}</Text>
          <Text>{item.formattedPrice}</Text>
          {item.inventory.status === 'Out of Stock' && (
            <Text text90M red30>
              {item.inventory.status}
            </Text>
          )}
        </View> */}
      </Card>
    );
  };

  render() {
    return (
      <SortableGridList<typeof products[0]>
        ListHeaderComponent={
          <Text h1 marginB-s5>
            SortableGridList
          </Text>
        }
        data={products}
        renderItem={this.renderItem}
        // numColumns={2}
        maxItemWidth={140}
        itemSpacing={Spacings.s3}
        listPadding={Spacings.s5}
        // keepItemSize
        contentContainerStyle={styles.list}
        onOrderChange={this.onOrderChange}
      />
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

export default GridListScreen;
