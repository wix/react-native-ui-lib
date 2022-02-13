import React from 'react';
import {View, Text, SortableGridView} from 'react-native-ui-lib';

const demoTiles = [
  {id: 'red', color: 'red'},
  {id: 'green', color: 'green'},
  {id: 'blue', color: 'blue'},
  {id: 'yellow', color: 'yellow'},
  {id: 'pink', color: 'pink'},
  {id: 'purple', color: 'purple'}
];



const SortableGridViewScreen = () => {
    
  return (
    <View flex>
      <Text center h1>
        SortableGridView
      </Text>
      <SortableGridView items={demoTiles} numOfColumns={2}/>
    </View>
  );
};

export default SortableGridViewScreen;
