import _ from 'lodash';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, SortableList} from 'react-native-ui-lib'; //eslint-disable-line
import { Colors } from '../../../../src/style';

const ITEM_HEIGHT = 50;
const MARGIN_BOTTOM = 4;
export default class SortableListScreen extends Component {
  state = {
    items: _.times(30, i => i)
  };

  renderItem = ({item}: {item: number}) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    );
  };

  onOrderChange = (items: number[]) => {
    alert(`new order is:
    ${items.map((item, index) => `\n[${index}] ==> ${item}`)}
    `);
  };

  render() {
    const {items} = this.state;
    return (
      <View style={{flex: 1}} >
        <Text h1>Sortable List</Text>
        <SortableList items={items} renderItem={this.renderItem} itemHeight={ITEM_HEIGHT} onOrderChange={this.onOrderChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    height: ITEM_HEIGHT - MARGIN_BOTTOM,
    width: '100%',
    marginBottom: MARGIN_BOTTOM,
    backgroundColor: Colors.grey50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
