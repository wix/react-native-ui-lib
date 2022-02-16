import _ from 'lodash';
import React, {useCallback} from 'react';
import {Alert} from 'react-native';
import {View, SortableGridView, Card, Text} from 'react-native-ui-lib';
import products from '../../data/products';

const sortableProducts = _.chain(products)
  .take(8)
  .map((product) => ({
    onPress: () => Alert.alert('My price is ' + product.formattedPrice),
    id: product.name,
    source: {uri: product.mediaUrl},
    ...product
  }))
  .value();

const SortableGridViewScreen = () => {

  const renderDemoTile = useCallback((item: {onPress: () => void; source: {uri: string}}) => {
    return (
      <Card
        flex
        onPress={item.onPress} 
      >
        <Card.Section imageSource={{...item.source}} imageStyle={{height: '100%'}}/>
      </Card>);
  }, []);
    
  return (
    <View flex>
      <View flex>
        <SortableGridView
          items={[...sortableProducts, ...sortableProducts]} 
          renderItem={renderDemoTile} 
          // numOfColumns={2}
          // itemSpacing={20}
          // viewWidth={300}
        />
      </View>
      <Text center h1 marginB-20>Footer</Text>
    </View>
  );
};

export default SortableGridViewScreen;
