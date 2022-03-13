import _ from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {SortableList, SortableListProps, View, BorderRadiuses, Icon, Button, Colors} from 'react-native-ui-lib'; //eslint-disable-line
import {SharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
    // TODO:
    console.log('New order:', newData);
  }, []);

  const getAnimatedStyle = (isDragged: SharedValue<boolean>) => {
    'worklet';
    // Can't make dragged item bigger because changing ScrollView's overflow to hidden the scrolled items will be shown.
    return {transform: [{scale: isDragged.value ? 1 : 0.95}]};
  };

  const renderItem = useCallback(({item, _index}) => {
    return (
      <Button
        style={styles.itemContainer}
        label={`${item.originalIndex}`}
        borderRadius={BorderRadiuses.br30}
        onPress={() => console.log('Original index is', item.originalIndex)}
      />
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <View flex useSafeArea margin-page>
        <SortableList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onOrderChange={onOrderChange}
          //   renderContent={renderContent}
          //   keyExtractor={keyExtractor}
          //   getAnimatedStyle={getAnimatedStyle}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default SortableListScreen;
const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1
  },
  itemContainer: {
    borderColor: Colors.black,
    borderWidth: 1
  },
  iconStyle: {
    position: 'absolute',
    padding: 8,
    right: 8
  }
});
