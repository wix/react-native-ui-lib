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
    orientation: Constants.orientation
  };

  onOrderChange: SortableGridListProps['onOrderChange'] = (_newOrderedData, newOrder) => {
    console.log('newOrder:', newOrder);
  };

  renderItem: GridListProps<typeof products[0]>['renderItem'] = ({item}) => {
    return (
      <Card flex onPress={() => console.log('item press')}>
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
          data={products}
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
