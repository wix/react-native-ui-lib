import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Constants, GridList, Card, Spacings, BorderRadiuses, GridListProps} from 'react-native-ui-lib';
import products from '../../data/products';

class GridListScreen extends Component {
  state = {
    orientation: Constants.orientation
  };

  renderItem: GridListProps<typeof products[0]>['renderItem'] = ({item}) => {
    return (
      <Card flex>
        <Card.Section imageSource={{uri: item.mediaUrl}} imageStyle={styles.itemImage}/>
        <View padding-s2>
          <Text $textDefault>{item.name}</Text>
          <Text $textDefault>{item.formattedPrice}</Text>
          {item.inventory.status === 'Out of Stock' && (
            <Text text90M $textDangerLight>
              {item.inventory.status}
            </Text>
          )}
        </View>
      </Card>
    );
  };

  render() {
    return (
      <GridList<typeof products[0]>
        ListHeaderComponent={
          <Text h1 marginB-s5>
            GridList
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
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: Spacings.s5
  },
  itemImage: {
    width: '100%',
    height: 85,
    borderRadius: BorderRadiuses.br10
  }
});

export default GridListScreen;
