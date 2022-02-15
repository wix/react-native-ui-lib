import _ from 'lodash';
import React, {useCallback} from 'react';
import {Alert} from 'react-native';
import {View, SortableGridView, Card, Text} from 'react-native-ui-lib';
import products from '../../data/products';

const sortableProducts = _.chain(products)
  .take(8)
  .map((product) => ({
    imageProps: {
      source: {uri: product.mediaUrl},
      borderRadius: 4
      // style: {backgroundColor: Colors.grey60, borderWidth: 1, borderColor: Colors.grey50}
    },
    title: product.name,
    titleTypography: 'subtextBold',
    onPress: () => Alert.alert('My price is ' + product.formattedPrice),
    id: product.name,
    ...product
  }))
  .value();

const SortableGridViewScreen = () => {

  const renderDemoTile = useCallback((item: any) => {
    return (
      <Card
        flex
        onPress={item.onPress} 
      >
        <Card.Section imageSource={{...item.imageProps.source}} imageStyle={{height: '100%'}}/>
      </Card>);
  }, []);
    
  return (
    <View flex>
      <SortableGridView
        items={[...sortableProducts, ...sortableProducts]} 
        renderItem={renderDemoTile} 
        numOfColumns={3}
        // itemSpacing={20}
        // viewWidth={300}
      />
      <Text center h1 marginB-20>Footer</Text>
    </View>
  );
};

export default SortableGridViewScreen;
