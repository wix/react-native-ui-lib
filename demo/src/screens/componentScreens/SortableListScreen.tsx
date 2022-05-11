import _ from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {SortableList, View, BorderRadiuses, Button, Colors} from 'react-native-ui-lib';
import {renderHeader} from '../ExampleScreenPresenter';

interface Item {
  originalIndex: number;
}

const data = _.times(30, index => {
  return {
    originalIndex: index
  };
});

const SortableListScreen = () => {
  const keyExtractor = useCallback((item: Item) => {
    return `${item.originalIndex}`;
  }, []);

  const onOrderChange = useCallback((newData: Item[]) => {
    console.log('New order:', newData);
  }, []);

  const renderItem = useCallback(({item, index: _index}: {item: Item; index: number}) => {
    return (
      <Button
        style={styles.itemContainer}
        label={`${item.originalIndex}`}
        borderRadius={BorderRadiuses.br30}
        onPress={() => console.log('Original index is', item.originalIndex)}
        backgroundColor={Colors.green10}
      />
    );
  }, []);

  return (
    <View flex>
      {renderHeader('Sortable List', {'margin-10': true})}
      <View flex useSafeArea margin-page>
        <SortableList data={data} renderItem={renderItem} keyExtractor={keyExtractor} onOrderChange={onOrderChange}/>
      </View>
    </View>
  );
};

export default SortableListScreen;
const styles = StyleSheet.create({
  itemContainer: {
    height: 52,
    borderColor: Colors.black,
    borderWidth: 1
  }
});
