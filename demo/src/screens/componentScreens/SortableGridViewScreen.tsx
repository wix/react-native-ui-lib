import React from 'react';
import {View, SortableGridView} from 'react-native-ui-lib';

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



const SortableGridViewScreen = () => {
    
  return (
    <View>
      <SortableGridView items={demoTiles} numOfColumns={2}/>
    </View>
  );
};

export default SortableGridViewScreen;
