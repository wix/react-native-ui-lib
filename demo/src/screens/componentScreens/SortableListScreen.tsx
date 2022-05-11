import _ from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {SortableList, View, TouchableOpacity, Text, Icon, Assets, Colors} from 'react-native-ui-lib';
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
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => console.log('Original index is', item.originalIndex)}
        // overriding the BG color to anything other than white will cause Android's elevation to fail
        // backgroundColor={Colors.red30}
        centerV
      >
        <View flex row spread centerV>
          <Icon source={Assets.icons.demo.drag} tintColor={Colors.$iconDisabled}/>
          <Text center $textDefault>
            {item.originalIndex}
          </Text>
          <Icon source={Assets.icons.demo.chevronRight} tintColor={Colors.$iconDefault}/>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View flex bg-$backgroundDefault>
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
    borderColor: Colors.$outlineDefault,
    borderBottomWidth: 1
  }
});
