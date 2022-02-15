import _ from 'lodash';
import React, {useCallback} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {View, SortableGridView, Card} from 'react-native-ui-lib';
import products from '../../data/products';


const demoTiles = [
  {id: 'red', color: 'red'},
  {id: 'green', color: 'green'},
  {id: 'blue', color: 'blue'},
  {id: 'yellow', color: 'yellow'},
  {id: 'pink', color: 'pink'},
  {id: 'purple', color: 'purple'},
  {id: 'black', color: 'black'},
  {id: 'cyan', color: 'cyan'}
];

// const sortableProducts = _.chain(products)
//   .take(8)
//   .map((product) => ({
//     imageProps: {
//       source: {uri: product.mediaUrl},
//       borderRadius: 4,
//       style: {backgroundColor: Colors.grey60, borderWidth: 1, borderColor: Colors.grey50}
//     },
//     title: product.name,
//     titleTypography: 'subtextBold',
//     onPress: () => Alert.alert('My price is ' + product.formattedPrice),
//     id: product.name
//   }))
//   .value();



const SortableGridViewScreen = () => {

  const renderDemoTile = useCallback((demoTile: {id: string; color: string;}) => {
    return (
      <Card 
        style={[tileStyles.tile, {backgroundColor: demoTile.color ?? 'red'}]}
        onPress={() => Alert.alert(`${demoTile.color}`)} 
      />);
  }, []);
    
  return (
    <View flex>
      <SortableGridView items={[...demoTiles, ...demoTiles]} renderItem={renderDemoTile} numOfColumns={2}/>
    </View>
  );
};

export default SortableGridViewScreen;

const tileStyles = StyleSheet.create({
  tile: {
    // flex: 1
    height: '100%', width: '100%'
  }
});
