

import React from 'react';
import {FlatList, StyleSheet} from 'react-native-web';
import {Card, Text} from 'react-native-ui-lib';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'JavaScript'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Java'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Kotlin'
  }
];
  
const Item = ({title}: { title: string }) => (
  <Card style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </Card>
);


const renderItem = ({item}: { item: { title: string } }) => (
  <Item title={item.title}/>
);

const ListWrapper = () => {
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id}
    />
  );
};
const styles = StyleSheet.create({

  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginVertical: '1em',
    textAlign: 'center'
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center'
  },
    
  item: {
    backgroundColor: '#ffff2f',
    padding: 10,
    marginBottom: 8,
    marginHorizontal: 16
  }

});

export default ListWrapper;
